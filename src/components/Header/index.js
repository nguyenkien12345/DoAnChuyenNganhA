import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

function Header() {

    const [activeTab,setActiveTab] = useState("Home");

    const location = useLocation();

    const handleActive = (tab) => {
        setActiveTab(tab);
    }

    useEffect(() => {
        if(location.pathname === '/' || location.pathname === '/home'){
            setActiveTab('Home');
        }
        else if(location.pathname === '/add'){
            setActiveTab('Add');
        }
        else if(location.pathname === '/profile'){
            setActiveTab('Profile');
        }
    },[location])

    return (
       <div className="header">
           <p className="logo">Project Programming</p>
           <div className="header-right">
                <Link to="/home">
                    <p className={activeTab === "Home" ? "active" : ""} onClick={() => handleActive("Home")}>
                        Home
                    </p>
                </Link>
                <Link to="/add">
                    <p className={activeTab === "Add" ? "active" : ""} onClick={() => handleActive("Add")}>
                        Add
                    </p>
                </Link>
                <Link to="/profile">
                    <p className={activeTab === "Profile" ? "active" : ""} onClick={() => handleActive("Profile")}>
                        Profile
                    </p>
                </Link>
           </div>
       </div>
    )
}

export default Header;
