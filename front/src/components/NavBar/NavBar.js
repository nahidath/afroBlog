// Import modules
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button }    from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { React, useEffect, useRef, useState } from "react";

// Import style
import "./NavBar.css";
import DarkMode from "../Theme/DarkMode";
import {Divider, IconButton} from "@mui/material";
import { ImSearch } from "react-icons/im";
import {toast} from "react-toastify";
import axios from "axios";
import SearchPage from "../Search/SearchPage";


const a = 100/230;
const b = -115.86;

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

    const initialTop = window.innerWidth == 1536 ? 450 : a * window.innerWidth + b;
    const [top, setTop] = useState(initialTop.toString() + "px");
    const [positionNav, setPositionNav] = useState("absolute");
    const [expanded, setExpanded] = useState(false);
    let today = new Date();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };

    }, [positionNav, top]);


    const handleResize = () => {
        const newTop = Math.min(a * window.innerWidth + b, 390);
        setTop(newTop.toString() + "px");
        if(window.innerWidth > 1344){
            for(let i = 390; i <=450; i++){
                const newTop = Math.min(a * window.innerWidth + b, i);
                setTop(newTop.toString() + "px");
            }
        }
    }

    const handleScroll = () => {
        if (positionNav !== "fixed" && window.pageYOffset > initialTop) {
            setTop("0");
            setPositionNav("fixed");
        }

        if (positionNav === "fixed" && window.pageYOffset < initialTop) {
            setTop(initialTop.toString() + "px");
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
            <Navbar expanded={expanded} expand="lg" style={{top: top, position: positionNav}}>
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={() => setExpanded(expanded ? false : "expanded")} />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav>
                        <DarkMode />
                    </Nav>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        id="navItems"
                        style={{ maxHeight: '200px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => {handleSetFilter('cheveux'); setExpanded(false)}}>Cheveux</Nav.Link>
                        <Nav.Link onClick={() => {handleSetFilter('maquillage'); setExpanded(false)}}>Maquillage</Nav.Link>
                        <Nav.Link onClick={() => {handleSetFilter('peau'); setExpanded(false)}}>Peau</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <div className="rightPart">
                            <Form className="d-flex" onSubmit={(e) => {handleSearch(e); setExpanded(false)}}>
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 "
                                    aria-label="Search"
                                    ref={researchRef}
                                    style={{ display: isResearchDisplay ? "block" : "none" }}
                                    onChange={(e)=> setSearchText(e.target.value)}
                                />
                                <IconButton aria-label="Search"
                                            onClick={(e) => {setResearchDisplay(!isResearchDisplay); handleSearch(e);}}  size="medium"><ImSearch className="bs-search"/></IconButton>
                            </Form>
                            {
                                (props.user.name) ? <NavDropdown align="end" title={<div className="profilePic-nav">
                                    <img className="thumbnail-image"
                                         // src={props.user.image}
                                        src="/love-test.png"
                                         // alt="user pic"
                                    />
                                </div>} id="navbarScrollingDropdown" className="signupLink">
                                    <NavDropdown.ItemText>{(today.getHours() >=12) ? "Bonjour " + props.user.name : "Bonsoir" + props.user.name }</NavDropdown.ItemText>
                                    <Divider variant="middle" />
                                    <NavDropdown.Item onClick={goToProfile}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>:<Nav.Link className="signupLink" onClick={() => {handleSignIn(); setExpanded(false)}}>
                                    Sign In
                                </Nav.Link>
                            }
                        </div>

                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}