import React from 'react';
import './topNavBar.css'

interface props {
    showSideNavBar: boolean;
    setShowSideNavBar: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode:boolean
}

const topNavBar = ({showSideNavBar, setShowSideNavBar, darkMode}: props ) => {
    return(
        <div className='topNavBar_container'>
            <div className='menu_container' id={darkMode ? 'dark_menu_container':''}><img src='../menu.png' alt='menu icon' onClick={() => {setShowSideNavBar(!showSideNavBar)}}/></div>
        </div>
    )
}

export default topNavBar;