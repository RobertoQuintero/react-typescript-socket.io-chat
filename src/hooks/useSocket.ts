import { useEffect, useMemo, useState, useCallback } from 'react';
import io from "socket.io-client"
import { Socket } from 'socket.io-client';

export const useSocket=(serverPath:string)=>{
  const [online, setOnline] = useState<boolean>(false)
  const [socket, setSocket] = useState<Socket>()
  // const socket= useMemo(() => io(serverPath,{
  //   transports:['websocket']
  // }), [serverPath])

  const conectarSocket=useCallback(() => {
      const token = localStorage.getItem('token')

      const socketTemp= io(serverPath,{
          transports:['websocket'],
          autoConnect:true,
          forceNew:true,
          query:{
            'x-token':token
          }
        })
        setSocket(socketTemp)
    },[serverPath])

  const desconectarSocket=useCallback(() => {
      socket?.disconnect()
    },[socket])

  useEffect(() => {
    setOnline(socket?.connected as boolean)

    // return ()=> {socket?.disconnect()}
  }, [socket])

  useEffect(() => {
    socket?.on('connect',()=>{
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect',()=>{
      setOnline(false)
    })
  }, [socket])

  return {
    socket,online,conectarSocket,desconectarSocket
  }
}