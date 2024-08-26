import React from 'react'
import './auth.css'

interface props {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    validName: boolean; 
    setValidName: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>; 
    validEmail: boolean; 
    setValidEmail: React.Dispatch<React.SetStateAction<boolean>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    validPassword: boolean; 
    setValidPassword: React.Dispatch<React.SetStateAction<boolean>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    validConfirmPassword: boolean;
    setValidConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
    showPassword: boolean; 
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>; 
    showConfirmPassword: boolean; 
    setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;

}

const Register = ({...props} : props) => {
    return(
        <>
            <label htmlFor="fullName">Name :</label>
            <p className={'instruction instruction_name ' + (!props.validName ? "show" : "hide")}>Alphabetical and Space characters only</p>
            <img src='name.png' alt='name icon' className='form_icons'/>
            <input type="text" required id='fullName' className={'default_input ' + (props.name && (props.validName ? 'valid_input' : 'invalid_input'))} placeholder='Enter Full Name' value={props.name} onChange={(e) => props.setName(e.target.value)}/>
            <img src={props.name && props.validName ? 'checkmark.png' : 'red_x.png'} alt='checkmark icon' className={'validation_icon ' + (props.name ? "show" : "hide")}/>
            
            <label htmlFor="email">Email :</label>
            <p className={'instruction instruction_email ' + (!props.validEmail && props.email ? "show" : "hide")}>Email format only</p>
            <img src='email.png' alt='email icon' className='form_icons'/>
            <input type="email" required id='email' className={'default_input ' + (props.email && (props.validEmail ? 'valid_input' : 'invalid_input'))} placeholder='Enter Email Address' value={props.email} onChange={(e) => props.setEmail(e.target.value)}/>
            <img src={props.email && props.validEmail ? 'checkmark.png' : 'red_x.png'} alt='checkmark icon' className={'validation_icon ' + (props.email ? "show" : "hide")}/>
            
            <label htmlFor="password">Password :</label>
            <p className={'instruction instruction_password ' + (!props.validPassword && props.password ? "show" : "hide")}>Must contain at least 1 letter and 1 number.<br/>Between 8-24 characters.</p>
            <img src={props.showPassword ? 'open_eye.png' : 'close_eye.png'} alt='password eye icon' onClick={() => props.setShowPassword(!props.showPassword)} className='form_icons eye_icon'/> 
            <input type={props.showPassword ? 'text' : 'password'} id='password' required className={'default_input ' + (props.password && (props.validPassword ? 'valid_input' : 'invalid_input'))} placeholder='Enter Password' value={props.password} onChange={(e) => props.setPassword(e.target.value)}/>
            <img src={props.password && props.validPassword ? 'checkmark.png' : 'red_x.png'} alt='checkmark icon' className={'validation_icon ' + (props.password ? "show" : "hide")}/>
            
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <p className={'instruction instruction_confirm_password ' + (!props.validConfirmPassword && props.confirmPassword ? "show" : "hide")}>Password must match</p>
            <img src={props.showConfirmPassword ? 'open_eye.png' : 'close_eye.png'} alt='password eye icon' onClick={() => props.setShowConfirmPassword(!props.showConfirmPassword)} className='form_icons eye_icon'/> 
            <input type={props.showConfirmPassword ? 'text' : 'password'} id='confirmPassword' required className={'default_input ' + (props.confirmPassword && (props.validConfirmPassword ? 'valid_input' : 'invalid_input'))} placeholder='Confirm Password' value={props.confirmPassword} onChange={(e) => props.setConfirmPassword(e.target.value)} />
            <img src={props.confirmPassword && props.validConfirmPassword ? 'checkmark.png' : 'red_x.png'}alt='checkmark icon' className={'validation_icon ' + (props.confirmPassword ? "show" : "hide")}/>

            <input type='submit' value={'Register'} className={props.validName && props.validEmail && props.validPassword && props.validConfirmPassword ? 'submit_button' : 'submit_button_disabled'} disabled={props.validName && props.validEmail && props.validPassword && props.validConfirmPassword ? false : true}/>
        </>
    )
}

export default Register