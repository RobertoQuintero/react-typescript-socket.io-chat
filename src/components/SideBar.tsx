import { SideBarChatItem } from "./SideBarChatItem"
import { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';

export const SideBar = () => {
  const {chatState} = useContext(ChatContext)
  const {auth} = useContext(AuthContext)
  const {usuarios}= chatState
  
  return (
    <div className="inbox_chat">
      {
        usuarios
        .filter(usuario=>usuario.uid !==auth.uid)
        .map(usuario=>(
          <SideBarChatItem key={usuario.uid} usuario={usuario}/>
        ))
      }
      
    {/* <!-- Espacio extra para scroll --> */}
    <div className="extra_space"></div>


</div>
  )
}
