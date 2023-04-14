import { ChatSelect, InboxPeople, Messages } from '../components'
import '../css/chat.css'
import { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';

export const ChatPage = () => {
  const {chatState} = useContext(ChatContext)

  return (
    <div className="messaging">
        <div className="inbox_msg">
            <InboxPeople/>
            {
              chatState.chatActivo
               ?<Messages/>
               :<ChatSelect/>
            }
            
        </div>
    </div>
  )
}
