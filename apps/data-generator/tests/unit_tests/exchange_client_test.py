import pytest
from unittest import mock
from libs.ExchangeClient import ExchangeClient


### Constants ###
hostname = '127.0.0.1'
port = 15001



### End ###


def test_socket_connection():
    with mock.patch('socket.socket'):
        c = ExchangeClient(hostname, port)
        c.socket.connect.assert_called_with((hostname, port))

# This test suite requires mocking socket server
# def test_login():
#     pass
        
# def test_invalid_login_in_loggedin_state():
#     pass

# def test_invalid_login_in_running_state():
#     pass

# def test_invalid_run_in_not_loggedin_state():
#     pass

# def test_handler_with_event():
#     pass

