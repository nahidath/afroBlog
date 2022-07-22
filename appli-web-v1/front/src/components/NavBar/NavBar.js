// Import modules
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button }    from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { React, useEffect, useRef, useState } from "react";

// Import style
import "./NavBar.css";
import DarkMode from "../Theme/DarkMode";
import {IconButton} from "@mui/material";
import { ImSearch } from "react-icons/im";
import {toast} from "react-toastify";




export default function NavBar (props) {

    const history = useHistory();

    const [isResearchDisplay, setResearchDisplay] = useState(false);
    const [user, setUser] = useState("");
    const [isLogged, setisLogged] = useState(false);
    const researchRef = useRef();


    const handleHome = () => {
        history.push({ pathname:'/'});
    }

    const handleSignIn = () => {
        history.push({ pathname:'/sign-in'});
    }

    const goToProfile = () =>{
        history.push({ pathname:'/profile'});

    }

    const handleSetFilter = (pFilter) => {
        history.push({ pathname: '/articles/' + pFilter});
    }

    const [top, setTop] = useState("450px");
    const [positionNav, setPositionNav] = useState("absolute");
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [positionNav, top]);


    useEffect(() => {
        checkLogged();
    },[]);

    const handleScroll = () => {
        if (positionNav !== "fixed" && window.pageYOffset > 450) {
            setTop("0");
            setPositionNav("fixed");
        }

        if (positionNav === "fixed" && window.pageYOffset < 450) {
            setTop("450px");
            setPositionNav("absolute");
        }
    };

    const checkLogged = () => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            setisLogged(true);
        }
    }
    const handleLogout = () => {
        localStorage.clear();
        window.location = "/";
        toast.success("Déconnexion réussie", {
            theme: "colored",
            position: toast.POSITION.TOP_RIGHT
        });
    };


    return (
        <div id='navBar' >
            <Navbar bg="white" expand="lg" style={{top: top, position: positionNav}}>
                <Container fluid>
                    {/*<Navbar.Brand onClick={handleHome}>*/}
                    {/*    <img src="/logo2.png" alt= "Afro Blog" />*/}
                    {/*</Navbar.Brand>*/}
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <DarkMode />
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        id="navItems"
                        style={{ maxHeight: '200px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => handleSetFilter('cheveux')}>Cheveux</Nav.Link>
                        <Nav.Link onClick={() => handleSetFilter('maquillage')}>Maquillage</Nav.Link>
                        <Nav.Link onClick={() => handleSetFilter('peau')}>Peau</Nav.Link>
                        {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Something else here
                        </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav className='rightPart'>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2 mr-2 searchBar"
                                aria-label="Search"
                                ref={researchRef} 
                                style={{ display: isResearchDisplay ? "block" : "none" }}
                            /> 
                            {/* <Button variant="outline-success">Search</Button> */}
                            <IconButton aria-label="Search"
                                        onClick={() => setResearchDisplay(!isResearchDisplay)} size="medium"><ImSearch className="bs-search"/></IconButton>
                            {/*<img */}
                            {/*    src='/research.png'*/}
                            {/*    */}
                            {/*/>*/}
                        </Form>
                        {
                            (isLogged) ? <NavDropdown title={user} id="navbarScrollingDropdown" className="signupLink">
                        <NavDropdown.Item onClick={goToProfile}>Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>:<Nav.Link className="signupLink" onClick={handleSignIn}>
                                Sign In
                            </Nav.Link>
                        }

                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}