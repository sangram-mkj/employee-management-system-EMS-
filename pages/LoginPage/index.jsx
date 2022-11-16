import React from 'react';
import {useState, useEffect} from 'react'
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import NavbarTop from '../../components/Navbar/Navbar'
import styles from './LoginPage.module.css';
import { baseUrl, authUrl, LoginUrl } from "../api/hello";
import axios from "axios";

const LoginPage = () => {

    const [number, setNumber] = useState();
    const [pass, setPass] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(number.split('').length != 10){
            alert('Your mobile number must be of 10 digits');
            return;
        }
        const data = {
            mobile_no: number,
            password: pass
        }
        axios.post(LoginUrl, data)
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('csUserToken', res.data.token);
            window.location.replace('/Dashboard.html');
        })
        .catch ((err) => {
            console.log(err);
            alert('Please wait for your profile to be approved');
        });
    }

    useEffect(() => {
      if(localStorage.getItem('csUserToken')) {
        window.location.replace('/Dashboard.html');
      }
    }, [])

  return (
    <>
    <div className={styles.mainDiv}>
    <h1>Login</h1>
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicNumber">
      <Form.Label>Contact Number</Form.Label>
      <Form.Control type="number" placeholder="Enter Your Contact Number" onChange={(e) => setNumber(e.target.value)} required />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} required />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  <h6>Signup as an Employee <Button variant="link"><Link href="/SignupPage">here</Link></Button></h6>
  <h6>Signup as an Team Lead <Button variant="link"><Link href="/SignupTL">here</Link></Button></h6>
  </Form>
  </div>
  </>
  );
}

export default LoginPage;