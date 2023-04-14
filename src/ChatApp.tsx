import { AuthProvider } from './auth/AuthProvider'
import { ChatProvider } from './context/chat/ChatProvider'
import { SocketProvider } from './context/SocketProvider'
import { AppRouter } from './router/AppRouter'

export const ChatApp = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter/>
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  )
}
