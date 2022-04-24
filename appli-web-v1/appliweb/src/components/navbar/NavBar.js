// Import modules
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button }    from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { React, useEffect, useRef, useState } from "react";

// Import style
import "./NavBar.css";



export default function NavBar (props) {

    const history = useHistory();

    const [isResearchDisplay, setResearchDisplay] = useState(false);
    const researchRef = useRef();


    const handleHome = () => {
        history.push({ pathname:'/'});
    }

    const handleSignUp = () => {
        history.push({ pathname:'/sign-up'});
    }
    

    return (
        <div id='navBar'>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand onClick={handleHome}>
                        <img src="./logo2.png" alt= "Afro Blog" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '200px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Cheveux</Nav.Link>
                        <Nav.Link href="#action2">Maquillage</Nav.Link>
                        <Nav.Link href="#action2">Peau</Nav.Link>
                        {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Something else here
                        </NavDropdown.Item>
                        </NavDropdown> */}
                        <Nav.Link onClick={handleSignUp}>
                            Sign up
                        </Nav.Link>
                    </Nav>
                    <Nav className='rightPart'>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2 mr-2"
                                aria-label="Search"
                                ref={researchRef} 
                                style={{ display: isResearchDisplay ? "block" : "none" }}
                            /> 
                            {/* <Button variant="outline-success">Search</Button> */}
                            <img 
                                src='./research.png'
                                className="bs-search"
                                onClick={() => setResearchDisplay(!isResearchDisplay)}
                            />
                        </Form>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}