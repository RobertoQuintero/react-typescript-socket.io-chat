import { SyntheticEvent, useState, ChangeEvent, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { Mensaje } from '../interfaces/dataInterface';

export const SendMessage = () => {
  const [mensaje, setMensaje] = useState('')
  const {socket} = useContext(SocketContext)
  const {auth} = useContext(AuthContext)
  const {chatState} = useContext(ChatContext)

  const onChange=({target}:ChangeEvent<HTMLInputElement>)=>{
    setMensaje(target.value)
    

   
  }

  const onSubmit=(ev:SyntheticEvent)=>{
    ev.preventDefault()
    if(mensaje.trim().length===0)return
    setMensaje('')
    //emitir un evento de socket para  enviar el mensaje
    const msj:Mensaje={
      de: auth.uid!,
      para: chatState.chatActivo!,
      mensaje
    }
    socket?.emit('mensaje-personal',msj)
   
     //hacer el dispatch del mensaje
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
            <input 
            type="text" 
            className="write_msg" 
            placeholder="Mensaje..."
            name='mensaje'
            value={mensaje}
            onChange={onChange}
            />
        </div>
        <div className="col-sm-3 text-center">
            <button className="msg_send_btn mt-3" type="submit">
                enviar
            </button>
        </div>
    </div>
    </form>
  )
}
