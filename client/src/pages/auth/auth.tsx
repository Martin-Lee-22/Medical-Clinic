import React from 'react';
import {useState, useEffect} from 'react'
import Login from './login';
import Register from './register';
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateName, validateEmail, validatePassword } from '../../utils/ValidateInputs';
import './auth.css'
import Loading from '../../components/Loading/Loading';

const Auth = () => {
    const {setAuth} = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/appointments'

    const [name, setName] = useState<string>("")
    const [validName, setValidName] = useState<boolean>(false)

    const [email, setEmail] = useState<string>("")
    const [validEmail, setValidEmail] = useState<boolean>(false)

    const [password, setPassword] = useState<string>("")
    const [validPassword, setValidPassword] = useState<boolean>(false)

    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [validConfirmPassword, setValidConfirmPassword] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const [register, setRegister] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<string>("") 
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [errorPassword, setErrorPassword] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)

    const registerProps = {
        name, setName, validName, setValidName,
        email, setEmail, validEmail, setValidEmail,
        password, setPassword, validPassword, setValidPassword,
        confirmPassword, setConfirmPassword, validConfirmPassword, setValidConfirmPassword,
        showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword
    }

    const loginProps = {
        email, 
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        errorMessage,
        errorEmail,
        errorPassword
    }

    useEffect(() => {
        let result = validateName(name, true)
        setValidName(result)
    }, [name])

    useEffect(() => {
        let result = validateEmail(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        let result = validatePassword(password)
        setValidPassword(result)
        let match = password === confirmPassword
        setValidConfirmPassword(match)
    }, [password, confirmPassword])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var response = null
        try{
            if (register){
                response = await axios.post('/user/register', 
                    JSON.stringify({name, email, password}),
                    {
                        headers: { 'Content-Type': 'application/json'}
                    }
                 )
                 setRegister(false)
                 alert('Account creation Successful! Please Login!')
            } else {
                setLoading(true)
                response = await axios.post('/auth/login', 
                    JSON.stringify({email, password}),
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                 )
                 setAuth(response.data)
                 console.log("Successfully Logged in!")
            }
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setLoading(false)
            navigate(from, {replace: true});

        } catch(err: any) {
            setLoading(false)
            setErrorMessage(err?.response.data.message)
            if(err?.response.data.type === 1){
                setErrorEmail(true)
            } else {
                setErrorPassword(true)
            }
        }
    }

    return(
        <div className={'auth_container register_form'}>
            <img src={'../logo_auth.png'} alt={'logo for authorization page'} className='auth_logo'/>
            {errorMessage && <h5 className='error_message'>{errorMessage}</h5>}
            <form onSubmit={handleSubmit}>
                {loading && <Loading/>}
                {register ? <Register {...registerProps}/> : <Login {...loginProps}/>}
            </form>
            <p>{!register && "Don't "}Have an Account?<br/>Click Here to <span onClick={() => {setRegister(!register); setErrorMessage("")}}>{register ? "Login" : "Register"}</span></p>
        </div>
    )
}

export default Auth