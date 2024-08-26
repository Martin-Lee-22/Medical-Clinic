import './sideNavBar.css'
import React, { useRef } from 'react'
import logo from '../../assets/logo.png'
import data from '../../data/navBar.json'
import {Link, useNavigate } from "react-router-dom";
import useLogout from '../../hooks/useLogout';
import ThemeToggle from './components/ThemeToggle';
import useOnClickOutside from '../../hooks/useOnClickOutside';

type propsType = {
    isMobile: boolean;
    setShowSideNavBar: React.Dispatch<React.SetStateAction<boolean>>,
    showSideNavBar:boolean
}

const SideNavBar = ({isMobile, setShowSideNavBar, showSideNavBar}: propsType) => {
    const logout = useLogout();
    const navigate = useNavigate();

    const sideNavBar = useRef(null)
    // useOnClickOutside(sideNavBar, ()=>{if(isMobile)setShowSideNavBar(false)}, showSideNavBar)

    const signout = async () => {
        await logout();
        navigate('/')
    }

    return(
        <div className={'sideNavBar_container ' + (isMobile && 'sideNavBar_container_mobile')}>
            <div className='sideNavBar' ref={sideNavBar}>
                <div className='logo_container'>
                    <img src={logo} alt='logo of application' className='logo'/>
                    <h2>Medical Clinic</h2>
                </div>
                <div className='links_container'>
                    {data.map((link, index) => {
                        return(
                        <div key={index}>
                            <Link to={link.to} onClick={() => {if(isMobile) setShowSideNavBar(false)}}><img src={link['icon_src']} alt={link.alt}/><span>{link.name}</span></Link>
                        </div>
                        )
                    })}
                    <ThemeToggle/>
                </div>
                <div className='links_container'>
                    <div onClick={signout}>
                        <Link to='/'><img src={'logout.png'} alt='logout icon'/><span>logout</span></Link>
                    </div>
                </div>
            </div>
            <div className='side_space' onClick={() => {if(isMobile) setShowSideNavBar(false)}}/>
        </div>
    )
}

export default SideNavBar;