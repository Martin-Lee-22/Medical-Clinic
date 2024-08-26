import { useContext } from 'react'
import './ThemeToggle.css'
import ThemeContext from '../../../context/ThemeProvider'

const ThemeToggle = () => {
    const {darkMode, setDarkMode} = useContext(ThemeContext)
    return(
        <label className="switch">
            <input type="checkbox"/>
            <span className="slider round" onClick={() => {setDarkMode(!darkMode)}}>
                <img src='moon.png' alt='icon of sun'/>
                <img src='sun.png' alt='icon of sun'/>
            </span>
        </label>
    )
}

export default ThemeToggle