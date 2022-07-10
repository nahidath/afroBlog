import React from 'react';
// import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer } from 'cdbreact';
import './Footer.css';
import {Col, Form, FormControl, Row} from "react-bootstrap";
import {Button, FormGroup} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export default function Footer () {

    const history = useHistory();
    const handleSetFilter = (pFilter) => {
        history.push({ pathname: '/articles/' + pFilter});
    }

    return(
        <div className="footer-container">
            <div className="box1">
                <span className="footerTitle">AfroBlog</span>
                <p>Le blog Afro par excellence</p>
                <Form >
                    <Row>
                        <FormGroup>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Enter your email"/>
                            </Col>
                            <Button type="submit" id="submitBtn" >Subscribe</Button>
                        </FormGroup>
                    </Row>
                </Form>
            </div>
            <div className="footer-menus">
                <div className="box2">
                    <ul className="box2-list">
                        <li><a href='' onClick={() => handleSetFilter('cheveux')}>CHEVEUX</a></li>
                        <li><a href='' onClick={() => handleSetFilter('maquillage')} >MAQUILLAGE</a></li>
                        <li><a href='' onClick={() => handleSetFilter('peau')}>PEAU</a></li>
                    </ul>
                </div>
                <div className="box3">
                    <ul className="box3-list">
                        <li><a href='#'>A PROPOS DE NOUS</a></li>
                        <li><a href='/contact'>CONTACT</a></li>
                        <li><a href='#'>TERMES D'UTILISATION</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
    // return (
    //     // <CDBFooter className="shadow">
    //     //     <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
    //     //         <CDBBox display="flex" justifyContent="between" className="flex-wrap">
    //     //             <CDBBox>
    //     //                 <a href="/" className="d-flex align-items-center p-0 text-dark">
    //     //                     <img alt="logo" src="logo" width="30px" />
    //     //                     <span className="ml-3 h5 font-weight-bold">AfroBlog</span>
    //     //                 </a>
    //     //                 <p className="my-3" style={{ width: '250px' }}>
    //     //                     Le blog Afro par excellence
    //     //                 </p>
    //     //             </CDBBox>
    //     //             <CDBBox>
    //     //                 <p className="h5 mb-4" style={{ fontWeight: '600' }}>
    //     //                     Devwares
    //     //                 </p>
    //     //                 <CDBBox flex="column" display="flex" style={{ cursor: 'pointer', padding: '0' }}>
    //     //                     <CDBFooterLink href="/">MAQUILLAGE</CDBFooterLink>
    //     //                     <CDBFooterLink href="/">CHEVEUX</CDBFooterLink>
    //     //                     <CDBFooterLink href="/">PEAU</CDBFooterLink>
    //     //                 </CDBBox>
    //     //             </CDBBox>
    //     //             <CDBBox>
    //     //                 <p className="h5 mb-4" style={{ fontWeight: '600' }}>
    //     //                     Help
    //     //                 </p>
    //     //                 <CDBBox display="flex" flex="column" style={{ cursor: 'pointer', padding: '0' }}>
    //     //                     <CDBFooterLink href="/">ABOUT US</CDBFooterLink>
    //     //                     <CDBFooterLink href="/">CONTACT</CDBFooterLink>
    //     //                     <CDBFooterLink href="/">TERMS OF USE</CDBFooterLink>
    //     //                 </CDBBox>
    //     //             </CDBBox>
    //     //         </CDBBox>
    //     //         <CDBBox
    //     //             display="flex"
    //     //             justifyContent="center"
    //     //             style={{ width: '100%' }}
    //     //             className="mx-auto mt-4"
    //     //         >
    //     //             <CDBBtn flat color="dark" className="p-2">
    //     //                 <CDBIcon fab icon="facebook-f" />
    //     //             </CDBBtn>
    //     //             <CDBBtn flat color="dark" className="mx-3 p-2">
    //     //                 <CDBIcon fab icon="twitter" />
    //     //             </CDBBtn>
    //     //             <CDBBtn flat color="dark" className="p-2">
    //     //                 <CDBIcon fab icon="instagram" />
    //     //             </CDBBtn>
    //     //         </CDBBox>
    //     //     </CDBBox>
    //     // </CDBFooter>
    // );
};