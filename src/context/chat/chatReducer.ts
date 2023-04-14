
import { Usuario, ChatState, Mensaje } from '../../interfaces/dataInterface';
import { initialState } from './ChatProvider';

export type ChatAction =
        {type:'[Chat] Usuarios Cargados',payload:Usuario[]}
       |{type:'[Chat] Activar Chat' ,payload:string}
       |{type:'[Chat] Nuevo Mensaje' ,payload:Mensaje}
       |{type:'[Chat] Cargar Mensajes' ,payload:Mensaje[]}
       |{type:'[Chat] Purgar Mensajes' }
      


export const chatReducer=(state:ChatState,action:ChatAction):ChatState=>{
  switch (action.type) {
    case '[Chat] Usuarios Cargados':
      return {
        ...state,
        usuarios:[...action.payload ] 
        // usuarios:[...action.payload]
      }
    case '[Chat] Activar Chat':
      if(state.chatActivo===action.payload)return state
      return {
        ...state,
        chatActivo: action.payload,
        mensajes:[]
      }
    case '[Chat] Nuevo Mensaje':
      if(
        state.chatActivo===action.payload.de ||
        state.chatActivo===action.payload.para
        ){
        return {
          ...state,
          mensajes:[...state.mensajes, action.payload]
        }
      }else{
        return state
      }
    case '[Chat] Cargar Mensajes':
      return{
        ...state,
        mensajes:[...action.payload]
      }
    
      case '[Chat] Purgar Mensajes':
        return{
          ...initialState
        }

      
  
    default:
      return state
  }
}