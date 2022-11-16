import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Grid from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTop from "../../components/Navbar/Navbar";
import CardBox from "../../components/Card/Card";
import axios from "axios";
import ShowOrders from "../../components/AllOrders/AllOrders";

const Dashboard = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState();
    const [lead, setLead] = useState();
    const [isTL, setIsTL] = useState(false);
    const [hasOrder, setHasOrder] = useState(false);
    const [allOrders, setAllOrders] = useState();

    useEffect(() => {
        if(localStorage.getItem('csUserToken')) {
            setLoggedIn(true);
            setToken(localStorage.getItem('csUserToken'));

            axios.get('http://45.9.191.72:90/get-all-orders', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('csUserToken')}`
                  }
            })
            .then((res) => {
                console.log('data: ', res);
                setAllOrders(res.data)
            })
            .catch((error) => {
                console.log('error while fetching all orders: ', error)
            })
        } else {
            setLoggedIn(false);
            window.location.replace('/LoginPage.html');
        }
    }, [])

    useEffect(() => {
        if (loggedIn) {
            axios.get('http://45.9.191.72:90/get-tl-name-id', {
                headers: {
                    authorization: `Bearer ${token}`
                  }
            })
            .then((res) => {
                console.log(res);
                if(res.data == "tl"){
                    setIsTL(true)
                } else {
                    setLead(res.data.tl_name)
                    setIsTL(false)
                }
            })
            .catch((err) => {
                 console.log('bhai comedy ho gaya', err)
                 if(err.response.statusText == 'Unauthorized') {
                    localStorage.removeItem('csUserToken')
                    window.location.reload();
                 }
                })
        }
    }, [loggedIn, token]);


    useEffect(() => {
        console.log("allOrders", allOrders)
        if(allOrders){
            setHasOrder(true);
        }
    }, [allOrders])

    return (
        <div>
            <NavbarTop />
        <button onClick={() => window.location.replace('/UploadNewLead.html')}>Create Order</button>{' '}
        {isTL ? (<button onClick={() => window.location.replace('/EmployeeList.html')}>Employee List</button>) : <h1>Welcome</h1>}
        
        <br />
        <br />
        <>
        {hasOrder ? <ShowOrders data={allOrders} /> : <h1>All Orders</h1>}
        </>
        </div>
      );
}

export default Dashboard;