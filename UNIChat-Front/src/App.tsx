

import { MessageList } from "./components/MessageList"
import { LoginBox } from "./components/LoginBox"
import { useContext } from "react"
import { AuthContext } from "./contexts/auth"

import styles from "./App.module.scss"
import { SendMessageForm } from "./components/SendMessageForm"
import { Logo } from "./components/Logo/index"

export function App() {
  const { user } = useContext(AuthContext)

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <Logo />
      { !!user ? <MessageList /> : <p style={{ color: 'rgba(255, 99, 71, 0)' }}> </p> }
      { !!user ? <SendMessageForm /> : <LoginBox /> }
    </main>
  )
}

