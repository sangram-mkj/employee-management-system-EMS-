import React from "react";
import {useState, useEffect} from 'react';
import NavbarTop from "../../components/Navbar/Navbar";
import { CREATE_ORDER, CANCEL_ORDER, CHECK_PINCODE, TRACK_PACKAGE, AUTH_TOKEN } from "../api/pickrr";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './UploadNewLead.module.css';
import axios from 'axios';

const UploadNewLead = () => {

    const [empID, setEmpID] = useState();
    const [leadID, setLeadID] = useState();
    const [isTL, setIsTL] = useState(false);

    const [token, setToken] = useState();

    const [name, setName] = useState('');
    const [number, setNumber] = useState(null);
    const [address, setAddress] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [codAmount, setCodAmount] = useState(null);
    const [pinCode, setPinCode] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, number, address, carNumber, codAmount, pinCode);
        if(isTL) {
            const payload = {
                auth_token: AUTH_TOKEN,
                item_name: 'Car Assistance India Card',
                from_name: 'CAR ASSISTANCE INDIA',
                from_phone_number: '7348606974',
                from_address: '2151/9b 3rd floor new patel nagar, New Delhi',
                from_pincode: '110008',
                to_name: name,
                to_phone_number: `${number}`,
                to_pincode: `${pinCode}`,
                to_address: address,
                quantiy: 1,
                invoice_value: codAmount,
                cod_amount: codAmount,
            }

            axios.post(CREATE_ORDER, payload,)
            .then((res) => {
            console.log(res);
            // alert('Your Order has been created successfully');
            let order_id = res.data.order_id;
            let order_pk = res.data.order_pk;            
            let manifest_link = res.data.manifest_link;
            let tracking_id = res.data.tracking_id;
            let data = {
                name: name,
                car_number: carNumber,
                contact_number: number,
                address: address,
                cod_amount: codAmount,
                pin_code: pinCode,
                emp_id: empID,
                tl_id: "",
                order_id: order_id,
                order_pk: order_pk,
                manifest_link: manifest_link,
                tracking_id: tracking_id,
            }
            axios.post('http://45.9.191.72:90/create-order', data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('csUserToken')}`
                  }
            })
            .then((res) => {
                console.log('Ho gaya bhai', res)
                alert('Your Order has been created successfully')
            })
            .catch((err) => {
                console.log('Nahi hua bhai', err)
            })
            // window.location.replace('/Dashboard.html')
        })
        .catch((err) => {
            alert('Some error occured. Please try again later');
            window.location.reload();
        })

        } else {
            console.log('scam chal raha hai')
            let data = {
                name: name,
                contact_number: `${number}`,
                pin_code: `${pinCode}`,
                address: address,
                invoice_value: codAmount,
                cod_amount: codAmount,
                car_number: carNumber,
                emp_id: empID,
                tl_id: leadID
            }

            axios.post('http://45.9.191.72:90/create-order', data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('csUserToken')}`
                  }
            })
            .then((res) => {
                console.log('Ho gaya bhai', res)
                alert('Your Order has been created successfully')
            })
            .catch((err) => {
                console.log('Nahi hua bhai', err)
            })
        }  
    }

    useEffect(() => {
        setToken(localStorage.getItem('csUserToken'))
        axios.get('http://45.9.191.72:90/get-employee-id-name', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('csUserToken')}`
              }
        })
        .then((res) => {
            console.log('employee id: ', res);
            setEmpID(res.data.id)
            if(!res.data.tl_id) {
                setIsTL(true);
                console.log('TL aa gaye')
            } else {
                console.log("TL nhi aaye")
                setIsTL(false);
                setLeadID(res.data.tl_id)
            }
        })
        .catch((err) => {
            console.log('Golmaal hai: ', err)
        })

    }, [])


    return (
        <>
        <NavbarTop />
            <div className={styles.mainDiv}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicNumber">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Number</Form.Label>
                        <Form.Control type="number" placeholder="Contact Number" onChange={(e) => setNumber(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Car Number</Form.Label>
                        <Form.Control type="text" placeholder="Car Number" onChange={(e) => setCarNumber(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>COD Amount</Form.Label>
                        <Form.Control type="number" placeholder="COD Amount" onChange={(e) => setCodAmount(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Pin Code</Form.Label>
                        <Form.Control type="number" placeholder="Pin Number" onChange={(e) => setPinCode(e.target.value)} required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default UploadNewLead;