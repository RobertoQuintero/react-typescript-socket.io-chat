import { SyntheticEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2'

export type FormTypes={
	email:string,
	password:string,
	rememberme:boolean,
	nombre?:string
}
const initialState:FormTypes={
	email:'test1@gmail.com',
	password:'quintero',
	rememberme:true
}

export const LoginPage = () => {
	const {login} = useContext(AuthContext)
	const {email,onInputChange,password,rememberme,toggleCheck}= useForm(initialState)

	const onSubmit=async(ev:SyntheticEvent)=>{
		ev.preventDefault()
		rememberme
				? localStorage.setItem('email',email)
				: localStorage.removeItem('email')

		//llamar el backend
		const resp = await login(email,password)
		if(!resp.ok){
			Swal.fire('Error',resp.msg,'error')
		}

	}

	const allOk=():boolean=>{
		return (email.length>0 && password.length>0)
	}

	return (
    <form className="login100-form validate-form flex-sb flex-w"
					onSubmit={onSubmit}
		>
					<span className="login100-form-title mb-3">
						Chat - Ingreso
					</span>
					
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
						<div className="col"
									onClick={()=>toggleCheck('rememberme',rememberme)}
						>
							<input 
							className="input-checkbox100" 
							id="ckb1" 
							type="checkbox" 
							name="rememberme"
							checked={rememberme}
							readOnly
							/>
							<label className="label-checkbox100">
								Recordarme
							</label>
						</div>

						<div className="col text-right">
              <Link to='/auth/register' className="txt1">
								Nueva cuenta?
							</Link>
						</div>
					</div>

					<div className="container-login100-form-btn m-t-17">
						<button 
						type='submit'
						disabled={!allOk()}
						className="login100-form-btn">
							Ingresar
						</button>
					</div>

				</form>
  )
}
