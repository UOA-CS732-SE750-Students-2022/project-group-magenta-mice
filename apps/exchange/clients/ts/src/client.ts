import { EventEmitter } from 'events'
import { Socket } from 'net'
import { pack } from 'python-struct'

const messages: Messages = require('./exchange_pb')

interface Messages {
    MessageType: {
        [key: string]: number
    }
    LoginRequest: any
    LoginResponse: any
}

interface ClientOptions {
    host: string
    port: number
}

export class Client extends EventEmitter {
    private socket: Socket

    constructor(private readonly connection: ClientOptions) {
        super()

        this.socket = new Socket().connect(connection.port, connection.host)
        this.prepareHandlers()
    }

    public login({ key }: { key: string }) {
        const loginRequest = new messages.LoginRequest()
        loginRequest.setKey(key)
        const bytes = loginRequest.serializeBinary()

        const buffer = this.prepareMessage(messages.MessageType.LOGIN, bytes)
        this.socket.write(buffer)
    }

    private prepareMessage(messageType: number, bytes: Uint8Array) {
        const size = bytes.byteLength
        return Buffer.concat([pack('<i', messageType), pack('<i', size), bytes])
    }

    private prepareHandlers() {
        let type = 0
        let size = 0
        let expectHeader = true

        this.socket.on('data', (buffer) => {
            if (expectHeader) {
                type = buffer.readInt32LE(0)
                size = buffer.readInt32LE(4)
                expectHeader = false
            } else {
                expectHeader = true

                switch (type) {
                    case messages.MessageType.LOGIN_RESPONSE:
                        const loginResponse =
                            messages.LoginResponse.deserializeBinary(buffer)
                        console.log(loginResponse.toObject())
                        this.emit('login', loginResponse)
                }
            }
            console.log(buffer.length)

            console.log({ type, size })
        })
    }
}
