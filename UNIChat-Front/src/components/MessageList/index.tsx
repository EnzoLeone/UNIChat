import { useContext, useEffect, useState } from "react"
import io from "socket.io-client"

import { api } from "../../services/api"

import styles from "./styles.module.scss"
import { AuthContext } from "../../contexts/auth"
// import logoSvg from "../../assets/logo.svg"

type Messages = {
    id: string;
    text: string;
    user: {
        id: string;
        name: string;
        avatar_url: string;
    }
}

const messageQueue: Messages[] = []

const socket = io("http://localhost:3333")


socket.on("new_message", (newMessage: Messages) => {
    messageQueue.push(newMessage)
})


export function MessageList() {
    const { user } = useContext(AuthContext)
    const [messages, setMessages] = useState<Messages[]>([])

    useEffect(() => {
        setInterval(() => {
            if(messageQueue.length > 0) {
                setMessages(prevState => [
                    messageQueue[0],
                    prevState[1],
                    prevState[2],
                    prevState[3],
                    prevState[4],
                ].filter(Boolean))

                messageQueue.shift()
            }
        }, 3000)

    }, [])

    useEffect(() => {
        api.get<Messages[]>("messages/last3")
            .then(response => {
                if(messages.length == 0 || response.data[0].id != messages[0].id) {
                    setMessages(response.data)
                }
            })
    }, [messages])

    return(
        <div className={styles.messageListWrapper}>
            {/*<img src={logoSvg} alt="DoWhile 2021" />*/}

            <ul className={styles.messageList}>
                {messages.map(message => {
                    return(
                        message.user.id == user?.id ? 
                        <li key={message.id} className={styles.me}>
                            <div className={styles.messageUser}>
                                <div className={styles.UserImage}>
                                    <img src={message.user.avatar_url} alt={message.user.name} />
                                </div>
                                {
                                    message.user.name.length > 15 ?
                                    <span style={{ paddingRight: '10rem' }}>{message.user.name}</span> :
                                    <span style={{ paddingRight: '20rem' }}>{message.user.name}</span>
                                }
                            </div>
                            <p className={styles.messageContent}>{message.text}</p>
                        </li> :
                        <li key={message.id} className={styles.message}>
                            <div className={styles.messageUser}>
                                <div className={styles.UserImage}>
                                    <img src={message.user.avatar_url} alt={message.user.name} />
                                </div>
                                <span>{message.user.name}</span>
                            </div>
                            <p className={styles.messageContent}>{message.text}</p>
                        </li>
                    )
                })}     
            </ul>
        </div>
    )
}