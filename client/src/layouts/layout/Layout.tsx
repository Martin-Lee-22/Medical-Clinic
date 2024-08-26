import SideNavBar from "../sideNavBar/SideNavBar"
import TopNavBar from "../topNavBar/topNavBar"
import {useMediaQuery} from 'react-responsive'
import {useState, useEffect, createContext} from 'react'
import {mediaSizes} from '../../data/mediaQuerySizes'
import { Outlet } from "react-router-dom"
import './Layout.css'
import '../../Theme.css'
import ModalManager from "../../components/modal/ModalManager"
import ThemeContext from "../../context/ThemeProvider"
import { createCookie, getCookie } from "../../utils/Cookies"
import { addDays } from "date-fns"

const Layout = () => {
    const [showTopNavBar, setShowTopNavBar] = useState<boolean>(false)
    const [showSideNavBar, setShowSideNavBar] = useState<boolean>(false)
    const [darkMode, setDarkMode] = useState<boolean>(getCookie('theme') === 'dark' ? true : false)
    const isMobile =  useMediaQuery({ query: `(max-width: ${mediaSizes.mobile})` })

    useEffect(()=>{
        createCookie('theme', darkMode ? 'dark':'light', addDays(new Date(), 7))
    }, [darkMode])

    useEffect(() => {
        if (isMobile) {
            setShowTopNavBar(true)
            setShowSideNavBar(false)
        } else {
            setShowTopNavBar(false)
            setShowSideNavBar(true)
        }
    }, [isMobile])

    return(
        <div className={(darkMode ? 'dark' : 'light')}>
            <ThemeContext.Provider value={{darkMode, setDarkMode}}>
                <ModalManager>
                    {showSideNavBar && <SideNavBar isMobile={isMobile} showSideNavBar={showSideNavBar} setShowSideNavBar={setShowSideNavBar}/>}
                    {showTopNavBar && <TopNavBar showSideNavBar={showSideNavBar} darkMode={darkMode} setShowSideNavBar={setShowSideNavBar}/>}
                    <div className={"pages_container " + (isMobile ? '' : "fullscreen_container")}>
                        <Outlet/>
                    </div>
                </ModalManager>
            </ThemeContext.Provider>
        </div>
    )
}

export default Layout