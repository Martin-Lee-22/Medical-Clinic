import { Outlet } from "react-router-dom"
import {useState, useEffect} from 'react'
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"
import './PersistLogin.css'
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try{
                await refresh()
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    }, [])

    return (
        <>
            {isLoading 
                ? <h1 className="loading_heading">Loading...</h1>
            : <Outlet/>}
        </>
    )
}

export default PersistLogin