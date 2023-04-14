import { IncomingMessage, OutGoingMessage, SendMessage } from "./"
import { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';

export const Messages = () => {
  const {chatState}=useContext(ChatContext)
  const {auth}= useContext(AuthContext)
  console.log(chatState.mensajes)
  return (
    <div className="mesgs">
      <div className="msg_history" id="mensajes">
        {
          chatState.mensajes.map(msg=>(
            msg.para === auth.uid
              ? <IncomingMessage key={msg._id} msg={msg}/>
              :<OutGoingMessage key={msg._id} msg={msg}/>
          ))
        }
          
          
      </div>
      <SendMessage/>
    </div>
  )
}
