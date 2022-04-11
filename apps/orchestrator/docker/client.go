package docker

import (
	"context"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

var cli *client.Client

func init() {
	var err error
	cli, err = client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		panic(err)
	}
}

func pullImage(name string) {
	io, err := cli.ImagePull(context.Background(), name, types.ImagePullOptions{})
	if err != nil {
		panic(err)
	}
	io.Close()
}
