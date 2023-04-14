import { Usuario } from '../interfaces/dataInterface';
import { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { chatTypes } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
type Props={
  usuario:Usuario
}
export const SideBarChatItem = ({usuario}:Props) => {
  const {dispatch,chatState} = useContext(ChatContext)
  const {chatActivo}= chatState

  const onClick=async()=>{
    dispatch({
      type:'[Chat] Activar Chat',
      payload: usuario.uid
    })

    const resp = await fetchConToken(`mensajes/${usuario.uid}`)
    dispatch({
      type:'[Chat] Cargar Mensajes',
      payload:resp.mensajes!
    })

    //mover el scroll
    scrollToBottom('mensajes')
  }

  return (
    <div 
    onClick={onClick}
    className={` chat_list ${usuario.uid ===chatActivo&& 'active_chat'}`}
    >
        <div className="chat_people">
            <div className="chat_img"> 
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div className="chat_ib">
                <h5>{usuario.nombre}</h5>
                {
                  usuario.online
                    ? <span className="text-success">Online</span>
                    : <span className="text-danger">Offline</span>
                }
                
                
            </div>
        </div>
    </div>
  )
}
