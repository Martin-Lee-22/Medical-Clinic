import './auth.css'

interface props{
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>; 
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    showPassword: boolean; 
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>; 
    errorMessage: string; 
    errorEmail: boolean;
    errorPassword: boolean;
}

const Login = ({...props} : props) => {
    return(
        <>
            <label htmlFor="email">Email :</label>
            <img src='email.png' alt='email icon' className='form_icons'/>
            <input type="email" id='email' required autoComplete='off' className={'default_input ' + (props.errorMessage && props.errorEmail && "invalid_input")} placeholder='Enter Email Address' value={props.email} onChange={(e) => props.setEmail(e.target.value)}/>

            <label htmlFor="password">Password :</label>
            {props.showPassword ? <img src='open_eye.png' alt='password eye icon' onClick={() => props.setShowPassword(!props.showPassword)} className='form_icons eye_icon'/> :
            <img src='close_eye.png' alt='password eye icon' onClick={() => props.setShowPassword(!props.showPassword)} className='form_icons eye_icon'/>}
            <input type={props.showPassword ? 'text' : 'password'} required autoComplete='off' id='password' className={'default_input ' + (props.errorPassword && props.errorMessage && "invalid_input")} placeholder='Enter Password' value={props.password} onChange={(e) => props.setPassword(e.target.value)}/>

            <input type='submit' value={'Login'} className={'submit_button'}/>
        </>
    )
}

export default Login