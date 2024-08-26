import {createContext} from "react";

type ThemeContextType = {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  }
  
const ThemeContextState = {
    darkMode: false,
    setDarkMode: () => {}
}

const ThemeContext = createContext<ThemeContextType>(ThemeContextState)

export default ThemeContext