import React, {useState, useEffect} from 'react';
// import { Table } from '../Table';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AUTH_TOKEN, CREATE_ORDER } from '../../pages/api/pickrr';


const ShowOrders = (data) => {

    const [hasData, setHasData] = useState(false)

    const createOrder = (data) => {
        console.log(data)
        var ID = data._id.$oid;
        // console.log(ID)
        const payload = {
            auth_token: AUTH_TOKEN,
            item_name: 'Car Assistance India Card',
            from_name: 'CAR ASSISTANCE INDIA',
            from_phone_number: '7348606974',
            from_address: '2151/9b 3rd floor new patel nagar, New Delhi',
            from_pincode: '110008',
            to_name: data.name,
            to_phone_number: `${data.contact_number}`,
            to_pincode: `${data.pin_code}`,
            to_address: data.address,
            quantiy: 1,
            invoice_value: data.cod_amount,
            cod_amount: data.cod_amount,
        }

        axios.post(CREATE_ORDER, payload,)
        .then((res) => {
            console.log(res);
            let order_id = res.data.order_id;
            let order_pk = res.data.order_pk;            
            let manifest_link = res.data.manifest_link;
            let tracking_id = res.data.tracking_id;
            console.log('aapka id hai: ', ID)
            let dataTwo = {
                orderid: ID,
                tracking_id: tracking_id,
                order_pk: order_pk.toString(),
                manifest_link: manifest_link,
                order_id: order_id,
            }
            axios.put(`http://45.9.191.72:90/update-inactive-order?orderid=${ID}&tracking_id=${tracking_id}&order_pk=${order_pk}&manifest_link=${manifest_link}&order_id=${order_id}`, dataTwo, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('csUserToken')}`
                  }
            })
            .then((res) => {
                console.log('Ho gaya bhai', res)
                alert('Your Order has been created successfully');
                window.location.replace('/EmployeeList.html')
            })
            .catch((err) => {
                console.log('Nahi hua bhai', err)
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deleteOrder = (id) => {
        console.log(id)
        let orderID = id._id.$oid
        console.log(orderID)
        axios.delete(`http://45.9.191.72:90/delete-order-by-orderid?orderid=${orderID}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('csUserToken')}`
              }
        })
        .then((res) => {
            console.log(res);
            alert('Order deleted successfully');
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
            alert('Error aa gaya bhai')
        })
    }

    useEffect(() => {
        console.log('datadata: ', data)
        if(data) {
            setHasData(true);
        } else (
            setHasData(false)
        )
    }, [data])

    return (
        <>
        {hasData ? (
             <Table striped bordered hover>
             <thead>
                    <tr>
                        <th>Name</th>
                        <th>Car Number</th>
                        <th>Pin Code</th>
                        <th>Contact No.</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
            {data.data.map((item, idx) => 
                (
                    <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.car_number}</td>
                        <td>{item.pin_code}</td>
                        <td>{item.contact_number}</td>
                        <td>{item.cod_amount}</td>  
                        <td>{item.is_active ? <Button variant='success' disabled>Active</Button> : <Button variant='primary' onClick={() => createOrder(item)}>Inactive</Button>}</td>
                        <td value={item.order_id}>{item.is_active ?  <Button variant="secondary" disabled>Delete</Button> : <Button variant="danger" onClick={() => deleteOrder(item)}>Delete</Button>}</td>                        
                    </tr>
                ))}
            </tbody>
        </Table>
        ) : (
            <h2>Not available</h2>
        )}
        </>
    )
}

export default ShowOrders;