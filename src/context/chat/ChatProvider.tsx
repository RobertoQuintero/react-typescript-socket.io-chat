import React, { useReducer } from 'react'
import { ChatContext, ChatContextProps } from './ChatContext';
import { Usuario, ChatState } from '../../interfaces/dataInterface';
import { chatReducer } from './chatReducer';

interface props{
  children: JSX.Element | JSX.Element[]
}


export const initialState:ChatState={
  chatActivo: null,
  usuarios: [],
  mensajes: []
}

export const ChatProvider = ({children}:props) => {
    const [state, dispatch] = useReducer(chatReducer, initialState)
  return (
    <ChatContext.Provider value={{
      chatState:state,
      dispatch
    }}>
      {children}
    </ChatContext.Provider>
  )
}
