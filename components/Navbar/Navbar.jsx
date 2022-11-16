import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarTop = () => {

  const [key, setKey] = useState(null);

  // useEffect(() => {
  //   let temp = localStorage.getItem('caiKey')

  //   if (temp) {
  //     setKey(temp);
  //   } else {
  //     window.location.replace('/LoginPage')
  //   }
    
  // }, [])

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Car Services</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
           { 
            // <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
            //   <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            //   <NavDropdown.Item href="#action/3.2">
            //     Another action
            //   </NavDropdown.Item>
            //   <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            //   <NavDropdown.Divider />
            //   <NavDropdown.Item href="#action/3.4">
            //     Separated link
            //   </NavDropdown.Item>
            // </NavDropdown>
        }
          </Nav>
          <Nav>
            <Nav.Link href="#">Your Profile</Nav.Link>
            <Nav.Link href="/LoginPage.html" onClick={() => localStorage.removeItem('csUserToken')}>Log Out</Nav.Link>
            {
            //     <Nav.Link eventKey={2} href="#memes">
            //   Dank memes
            // </Nav.Link>
        }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default NavbarTop;