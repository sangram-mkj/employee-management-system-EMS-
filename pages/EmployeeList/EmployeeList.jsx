import React, { useState, useEffect } from 'react';
import NavbarTop from "../../components/Navbar/Navbar";

const EmployeeList = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        if(localStorage.getItem('csUserToken')) {
            setLoggedIn(true);
            setToken(localStorage.getItem('csUserToken'));
        } else {
            setLoggedIn(false);
            window.location.replace('/LoginPage.html'); 
        }
    }, [])

    return (
        <>
            <NavbarTop />
            <h1>Employee List</h1>
        </>
    );
}

export default EmployeeList;