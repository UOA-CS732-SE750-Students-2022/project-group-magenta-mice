package docker

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"os"
	"strconv"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/go-connections/nat"
	"github.com/joho/godotenv"
	"simulate.exchange-orchestrator/exchange"
	"simulate.exchange-orchestrator/util"
)

var portRange []string
var dataGenImage string
var internalExchangePort string
var exchangeImage string
var exchangeRestartPolicy string
var exchangeProtocol string
var database string
var targetDir string
var internalIp = "0.0.0.0"

func init() {
	godotenv.Load(".env.local")
	dataGenImage = os.Getenv("DATA_GEN_IMAGE")
	internalExchangePort = os.Getenv("EXCHANGE_PORT_INTERNAL")
	exchangeImage = os.Getenv("EXCHANGE_IMAGE")
	exchangeProtocol = os.Getenv("PROTOCOL")
	exchangeRestartPolicy = os.Getenv("EXCHANGE_RESTART_POLICY")
	database = os.Getenv("DATABASE")
	targetDir = os.Getenv("TARGET_DIR")
	min := os.Getenv("EXCHANGE_PORT_MIN")
	max := os.Getenv("EXCHANGE_PORT_MAX")

	minInt, err := strconv.Atoi(min)
	if err != nil {
		panic("Expected an int for EXCHANGE_PORT_MIN")
	}
	maxInt, err := strconv.Atoi(max)
	if err != nil {
		panic("Expected an int for EXCHANGE_PORT_MAX")
	}
	if maxInt < minInt {
		panic("Expected EXCHANGE_PORT_MAX to be higher than EXCHANGE_PORT_MIN")
	}
	portRange = make([]string, maxInt-minInt)
	for i := minInt; i < maxInt; i++ {
		portRange[i-minInt] = strconv.Itoa(i)
	}
	println("Pulling data generator image: " + dataGenImage)
	pullImage(dataGenImage)
	println("Pulling exchange image: " + exchangeImage)
	pullImage(exchangeImage)
}

func CreateExchangeBundle(settings exchange.ExchangeSettingsRequest) (string, error) {
	port, err := util.FindOpenPortInRange(portRange)
	if err != nil {
		return "", err
	}
	dataGenBody, err := createDataGeneratorContainer()
	if err != nil {
		return "", err
	}

	exchangeBody, err := createExchangeContainer(port, settings)
	if err != nil {
		return "", err
	}
	err = cli.ContainerStart(context.Background(), dataGenBody.ID, types.ContainerStartOptions{})
	if err != nil {
		return "", err
	}
	err = cli.ContainerStart(context.Background(), exchangeBody.ID, types.ContainerStartOptions{})
	if err != nil {
		// creation has failed so kill the orphaned data gen container
		cli.ContainerRemove(context.Background(), dataGenBody.ID, types.ContainerRemoveOptions{})
		return "", err
	}
	return port, err
}

func createDataGeneratorContainer() (container.ContainerCreateCreatedBody, error) {
	containerConfig := &container.Config{
		Image: dataGenImage,
	}
	return cli.ContainerCreate(context.Background(), containerConfig, nil, nil, nil, "")
}

func createExchangeContainer(port string, settings exchange.ExchangeSettingsRequest) (container.ContainerCreateCreatedBody, error) {
	err := os.MkdirAll(targetDir+"/"+settings.ExchangeId, os.ModePerm)
	if err != nil {
		panic(err)
		return container.ContainerCreateCreatedBody{}, err
	}

	newPort, _ := nat.NewPort(exchangeProtocol, internalExchangePort)
	hostConfig := &container.HostConfig{
		PortBindings: nat.PortMap{
			newPort: []nat.PortBinding{
				{
					HostPort: port,
					HostIP:   internalIp,
				},
			},
		},
		RestartPolicy: container.RestartPolicy{
			Name: exchangeRestartPolicy,
		},
		Mounts: []mount.Mount{
			{
				Source:   targetDir + "/" + settings.ExchangeId,
				Target:   "/config",
				Type:     mount.TypeBind,
				ReadOnly: true,
			},
		},
	}

	portNum, err := strconv.Atoi(internalExchangePort)
	if err != nil {
		panic(nil)
		return container.ContainerCreateCreatedBody{}, err
	}

	newSettings := exchange.ExchangeSettingsResponse{
		Port:        portNum,
		Instruments: settings.Instruments,
		ExchangeId:  settings.ExchangeId,
		Database:    database,
	}

	newSettingsJson, _ := json.Marshal(newSettings)
	ioutil.WriteFile(targetDir+"/"+settings.ExchangeId+"/config.json", newSettingsJson, 0644)

	containerConfig := &container.Config{
		Cmd:          []string{"/config/config.json"},
		Image:        exchangeImage,
		ExposedPorts: nat.PortSet{newPort: struct{}{}},
	}
	return cli.ContainerCreate(context.Background(), containerConfig, hostConfig, nil, nil, "")
}
