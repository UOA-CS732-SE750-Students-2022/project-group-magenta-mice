package util

import (
	"errors"
	"net"
	"os"
)

func FindOpenPortInRange(ports []string) (string, error) {
	host := os.Getenv("HOST_ADDRESS")
	protocol := os.Getenv("PROTOCOL")
	for _, port := range ports {
		address := net.JoinHostPort(host, port)
		_, err := net.Dial(protocol, address)
		if err != nil {
			return port, nil
		}
	}
	return "", errors.New("no open port in range available")
}
