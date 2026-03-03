import {login, register, getMe, logout} from '../services/auth.api'
import {useContext, useEffect} from 'react'
import { AuthContext } from '../auth.context'

export const useAuth = () => {
  
    const context = useContext(AuthContext)
    const {user, setuser, loading, setloading} = context 

    async function handleRegister({username, email, password}){
       setloading(true)
       const data = await register({username, email, password})
       setuser(data.user)
       setloading(false)
    }
    async function handleLogin({username, email, password}){
       setloading(true)
       const data = await login({username, email, password})
       setuser(data.user)
       setloading(false)
    }
    async function handleGetMe(){
     setloading(true)
     const data = await getMe()
     setuser(data.user)
     setloading(false)
    }
    async function handleLogout(){
     setloading(true)
     const data = await logout()
     setuser(null)
     setloading(false)
    }

    useEffect(() => {
     handleGetMe()
    }, [])

    return({
        user, loading, handleRegister, handleLogin, handleGetMe, handleLogout
    })
}

