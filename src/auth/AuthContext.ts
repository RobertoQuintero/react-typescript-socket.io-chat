import { createContext } from "react";
import { AuthState } from './AuthProvider';
import { DataInterface } from '../interfaces/dataInterface';

interface AuthInterface{
  auth:AuthState
  login: (email: string, password: string) => Promise<DataInterface>
  register: (nombre: string, email: string, password: string) => Promise<DataInterface>
  verificaToken: () => void
  logout: () => void
}


export const AuthContext= createContext<AuthInterface>({}as AuthInterface)