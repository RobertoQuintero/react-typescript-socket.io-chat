// import { useSocket } from "../hooks/useSocket"
// import { SocketContext } from "./SocketContext"
import { useCallback, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { DataInterface } from '../interfaces/dataInterface';
import { ChatContext } from '../context/chat/ChatContext';

export interface AuthState{
  uid:string|null,
  checking:boolean,
  logged:boolean,
  name:string|null,
  email:string|null,
}


const initialState:AuthState={
  uid: null,
  checking: false,
  logged: false,
  name: null,
  email: null
}

interface props{
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider=({children}:props)=>{
  const [auth, setAuth] = useState(initialState)
const {dispatch} = useContext(ChatContext)
  const login=async(email:string,password:string):Promise<DataInterface>=>{
    const resp=await fetchSinToken('login',{email,password},'POST')
    setAuth((prev)=>({
      ...prev,
      checking:true
    }))
    if(resp.ok){
      localStorage.setItem('token',resp.token)

      const {usuario}=resp
      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email
      })
    }

    return resp
  }
  const register=async(nombre:string,email:string,password:string):Promise<DataInterface>=>{
    const resp=await fetchSinToken('login/new',{email,password,nombre},'POST')

    if(resp.ok){
      localStorage.setItem('token',resp.token)

      const {usuario}=resp
      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email
      })
    }

    return resp
    
  }
  const verificaToken=useCallback(async()=>{
    setAuth((prev)=>({
      ...prev,
      checking:true
    }))
    const token = localStorage.getItem('token')

    if(!token){
    return setAuth(initialState)
    }

    const resp = await fetchConToken('login/renew') 
    
    const {usuario}=resp
    if(resp.ok){
      localStorage.setItem('token',resp.token)

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email
      })
    }else{
      setAuth(initialState)
    }

    return resp

  },[])

  const logout=()=>{
    dispatch({
      type:'[Chat] Purgar Mensajes'
    })
    localStorage.removeItem('token')
    setAuth(initialState)
  }

  return(
    <AuthContext.Provider value={{
      auth,
      login,
      register,
      verificaToken,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}