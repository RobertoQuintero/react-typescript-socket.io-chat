import { DataInterface } from '../interfaces/dataInterface';
const baseUrl=import.meta.env.VITE_API_URL

export const fetchSinToken=async(endpoint:string,data:any,method:string='GET'):Promise<DataInterface>=>{
  const url=`${baseUrl}/${endpoint}`

  if(method ==='GET'){
    return  await(await fetch(url)).json()
  }else{
    return await(await fetch(url,{
      method,
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(data)
    })).json()
  }

}

export const fetchConToken=async(endpoint:string,data?:any,method:string='GET'):Promise<DataInterface>=>{
  const url=`${baseUrl}/${endpoint}`
  const token= localStorage.getItem('token') ||''
  
  if(method ==='GET'){
    return  await(await fetch(url,{
      headers:{
        'x-token':token
      }
    })).json()
  }else{
    return await(await fetch(url,{
      method,
      headers:{
        'Content-type':'application/json',
        'x-token':token
      },
      body:JSON.stringify(data)
    })).json()
  }

}