import { SocketContext } from "./SocketContext"
import { useSocket } from '../hooks/useSocket';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Usuario, Mensaje } from '../interfaces/dataInterface';
import { ChatContext } from './chat/ChatContext';
import { scrollToBottom, scrollToBottomAnimated } from '../helpers/scrollToBottom';


interface props{
  children: JSX.Element | JSX.Element[]
}

export const SocketProvider=({children}:props)=>{
  const {socket,online,conectarSocket,desconectarSocket}=useSocket('http://localhost:8080')
  const {auth}= useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {
    if(auth.logged){
      conectarSocket()
    }
  }, [auth])

  useEffect(() => {
    if(!auth.logged){
      desconectarSocket()
    }
  }, [auth])

  useEffect(() => {
    socket?.on('lista-usuarios',(usuarios:Usuario[])=>{
      dispatch({
        type:'[Chat] Usuarios Cargados',
        payload:usuarios
      })
    })
  }, [socket])

  useEffect(() => {
    socket?.on('mensaje-personal',(mensaje:Mensaje)=>{
      console.log(mensaje)

      //dispatch de una accion
      dispatch({
        type:'[Chat] Nuevo Mensaje',
        payload:mensaje
      })

      scrollToBottomAnimated('mensajes')
    })
  }, [socket])

  return(
    <SocketContext.Provider value={{socket,online}}>
      {children}
    </SocketContext.Provider>
  )
}