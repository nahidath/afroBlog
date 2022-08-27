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
import axios from "axios";
import SearchPage from "../../pages/SearchPage";




export default function NavBar (props) {

    const history = useHistory();

    const [isResearchDisplay, setResearchDisplay] = useState(false);
    const researchRef = useRef();
    const [searchText, setSearchText] = useState("");

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

    const handleLogout = () => {
        axios.get('http://localhost:5000/user/logout', {
        }).then((res) => {
            console.log(res)
            if (res.data.status === 'success') {
                props.setUser({});
                toast.success("Déconnexion réussie", {
                    theme: "colored",
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleSearch = (event) => {
        event.preventDefault();
        // history.push({pathname: '/search?s=' + searchText})
        if(isResearchDisplay){
            history.push({pathname: '/search?s=' + searchText})
        }


    }


    return (
        <div id='navBar' >
            <Navbar  expand="lg" style={{top: top, position: positionNav}} variant={localStorage.getItem("theme") == "dark" ? "dark" : "light"} bg={localStorage.getItem("theme") == "dark" ? "dark" : "light"}>
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
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2 mr-2 searchBar"
                                aria-label="Search"
                                ref={researchRef} 
                                style={{ display: isResearchDisplay ? "block" : "none" }}
                                onChange={(e)=> setSearchText(e.target.value)}
                            />
                            <IconButton aria-label="Search"
                                        onClick={() => {setResearchDisplay(!isResearchDisplay); handleSearch();}}  size="medium"><ImSearch className="bs-search"/></IconButton>
                        </Form>
                        {
                            (props.user.name) ? <NavDropdown title={props.user.name} id="navbarScrollingDropdown" className="signupLink">
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