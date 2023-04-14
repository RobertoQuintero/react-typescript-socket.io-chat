import { useContext, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/AuthContext';
import { useForm } from '../hooks/useForm';
import { FormTypes } from './LoginPage';

const initialState:FormTypes={
	email:'',
	password:'',
  nombre:'',
	rememberme:true
}

export const RegisterPage = () => {
  const {register} = useContext(AuthContext)
	const {email,onInputChange,password,nombre}= useForm(initialState)

	const onSubmit=async(ev:SyntheticEvent)=>{
		ev.preventDefault()

		//llamar el backend
		const resp = await register(nombre!,email,password)
		if(!resp.ok){
			Swal.fire('Error',resp.msg,'error')
		}

	}

	const allOk=():boolean=>{
		return (email.length>0 && password.length>0)
	}

  return (
    <form 
    onSubmit={onSubmit}
    className="login100-form validate-form flex-sb flex-w">
    <span className="login100-form-title mb-3">
      Chat - Registro
    </span>

    <div className="wrap-input100 validate-input mb-3">
      <input 
      className="input100" 
      type="text" 
      name="nombre" 
      placeholder="Nombre"
      value={nombre}
      onChange={onInputChange}
      />
      <span className="focus-input100"></span>
    </div>

    
    <div className="wrap-input100 validate-input mb-3">
      <input 
      className="input100" 
      type="email" 
      name="email" 
      placeholder="Email"
      value={email}
      onChange={onInputChange}
      />
      <span className="focus-input100"></span>
    </div>
    
    
    <div className="wrap-input100 validate-input mb-3">
      <input 
      className="input100" 
      type="password" 
      name="password" 
      placeholder="Password"
      value={password}
      onChange={onInputChange}
      />
      <span className="focus-input100"></span>
    </div>
    
    <div className="row mb-3">
      <div className="col text-right">
        <Link to='/auth/login' className="txt1">
          Ya tienes cuenta?
        </Link>
      </div>
    </div>

    <div className="container-login100-form-btn m-t-17">
      <button 
      type='submit'
      disabled={!allOk()}
      className="login100-form-btn">
        Crear cuenta
      </button>
    </div>

  </form>
  )
}
