"use client";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../../../../public/images/MOBILE PRI.png"
import Image from "next/image";
import Link from 'next/link';

function Header() {
  return (
    <Navbar expand="lg" variant='light' className=' drop-shadow-[10px_10px_10px_rgba(9,9,9,0.1)]'>
      <Container fluid>
       <Link href="/"> <Image src={Logo} className='logoImg' alt='logo' width={100} height={100}/></Link>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className='justify-content-end'>
          <Nav  style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/AdvanceSearch">AdvanceSearch</Nav.Link>
            <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
            <Nav.Link href="/FAQs">FAQs</Nav.Link>
            <Nav.Link href="/AdvanceSearch?mobile">All Mobile</Nav.Link>
            <Nav.Link href="/AdvanceSearch?brand" className="pt-2">Brands</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;