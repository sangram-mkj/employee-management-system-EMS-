import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';

const CardBox = () => {
    return (
    <Card style={{ width: '18rem', margin: '9px' }}>
    <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar value='70' text='70%' />
    </div>
        <Card.Body>
            <Card.Title>Target Reached</Card.Title>
            <Card.Text>
            You have a target of 7000 this month and you&apos;ve completed 70% of that.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>
    )
}

export default CardBox;