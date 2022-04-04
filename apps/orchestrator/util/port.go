package util

import (
	"errors"
	"net"
)

func FindOpenPortInRange(ports []string) (string, error) {
	for _, port := range ports {
		address := net.JoinHostPort("127.0.0.1", port)
		_, err := net.Dial("tcp", address)
		if err != nil {
			return port, nil
		}
	}
	return "", errors.New("no open port in range available")
}
