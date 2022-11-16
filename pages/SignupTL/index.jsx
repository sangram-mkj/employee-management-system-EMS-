import React, {useState, useEffect} from "react";
import Toast from 'react-bootstrap/Toast';

import styles from "./SignupPage.module.css";
import NavbarTop from "../../components/Navbar/Navbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { baseUrl, authUrl, RegisterUrl } from "../api/hello";
import axios from "axios";
import Link from "next/link";

const SignupTLPage = () => {

  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [number, setNumber] = useState();
  const [address, setAddress] = useState();
  const [education, setEducation] = useState();
  const [aadhaar, setAadhaar] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, mail, number, address, education, aadhaar, password);
    if(number.split('').length != 10) {
      alert('Your mobile number must be 10 digits');
      return;
    }
    if(aadhaar.split('').length != 12) {
      alert('Your aadhaar must be 12 digits')
      return;
    }
    const data = {
      name: name,
      email: mail,
      mobile_no: number,
      address: address,
      highest_education: education,
      aadhaar_number: aadhaar,
      password: password,
      tl_id: '',
    }

    axios.post(RegisterUrl, data)
    .then((res) => {
      console.log(res);
      alert('Please wait for sometime while we approve your profile');
      window.location.replace('/LoginPage.html')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
    <Form className={styles.mainDiv} onSubmit={handleSubmit}>
    <h1>SignUP as a Team Lead</h1>
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Full Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Your Full Name" onChange={(e) => setName(e.target.value)} required />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={(e) => setMail(e.target.value)} required />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicNumber">
      <Form.Label>Contact Number</Form.Label>
      <Form.Control type="number" placeholder="Enter Your Contact Number" onChange={(e) => setNumber(e.target.value)} required />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicAddress">
      <Form.Label>Address</Form.Label>
      <Form.Control type="text" placeholder="Enter Your Address" onChange={(e) => setAddress(e.target.value)} required />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicHighestEducation">
      <Form.Label>Highest Education</Form.Label>
      <Form.Control type="text" placeholder="Your Highest Education" onChange={(e) => setEducation(e.target.value)} required />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicAadhaar">
      <Form.Label>Aadhaar</Form.Label>
      <Form.Control type="number" placeholder="Enter Your Aadhaar number" onChange={(e) => setAadhaar(e.target.value)} required />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  <h6>Are you an Employee? Sign up <Button variant="link"><Link href="/SignupPage">here</Link></Button></h6>
  <h6>Already have an account?  <Button variant="link"><Link href="/LoginPage">Sign in</Link></Button></h6>
  </Form>
    </>
  );
};

export default SignupTLPage;
