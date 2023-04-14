import { createContext } from "react";
import { ChatAction } from './chatReducer';
import { ChatState } from '../../interfaces/dataInterface';

export interface ChatContextProps {
  chatState:ChatState
  dispatch: React.Dispatch<ChatAction>
}

export const ChatContext= createContext<ChatContextProps>({} as ChatContextProps)

