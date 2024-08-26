import React from 'react';
import './topNavBar.css'

interface props {
    showSideNavBar: boolean;
    setShowSideNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const topNavBar = ({showSideNavBar, setShowSideNavBar}: props ) => {
    return(
        <div className='topNavBar_container'>
            <div className='menu_container'><img src='../menu.png' alt='menu icon' onClick={() => {setShowSideNavBar(!showSideNavBar)}}/></div>
            <div className='heading_container'><h3>Default Clinic</h3><img src='../expand-arrow.png' alt='expand-arrow icon'/></div>
            <div className='plus_container'><img src='../plus.png' alt='plus icon'/></div>
            <div className='calendar_container'><img src='../calendar.png' alt='calendar icon'/></div>
        </div>
    )
}

export default topNavBar;