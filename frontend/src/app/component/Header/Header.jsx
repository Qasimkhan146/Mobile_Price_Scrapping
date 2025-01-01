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
        {/* <Navbar.Brand href="/" className='logo'><span>M</span>obile<span>P</span>rice</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className='justify-content-end'>
          
          {/* <Form className="d-flex gap-2 m-auto my-2 w-50">
            <Form.Control
              type="search"
              placeholder="Search"
              
              aria-label="Search"
            />
            <Button>Search</Button>
          </Form> */}
          <Nav  style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/AdvanceSearch">AdvanceSearch</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;