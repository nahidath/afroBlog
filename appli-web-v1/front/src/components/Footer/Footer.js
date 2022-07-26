import React, {useState} from 'react';
import './Footer.css';
import {Col, Form, FormControl, Row} from "react-bootstrap";
import {Button, FormGroup} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import emailjs from "@emailjs/browser";

export default function Footer () {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const handleSetFilter = (pFilter) => {
        history.push({ pathname: '/articles/' + pFilter});
    }


    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.send('service_ck55iw9', 'template_k4xib47', {email:email},'4efi92eRP81rtkqUk')
            .then(function(response) {
                toast.info("Un email de bienvenue t'a été envoyé !", {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });

    };


    const subscribe = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/sub/subscribe', {
            withCredentials: true,
            data: {
                email: email
            }
        }).then((res) =>{
            if(res.data["status"]=="fail") {
                toast.error(res.data["message"], {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
            }else if(res.data["status"]=="infoFail"){
                toast.info(res.data["message"], {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
            }else {
                toast.success(res.data["message"], {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
                event.target.reset();
                sendEmail(event, email);

            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className="footer-container">
            <div className="box1">
                <span className="footerTitle">AfroBlog</span>
                <p>Le blog Afro par excellence</p>
                <Form onSubmit={subscribe}>
                    <Row>
                        <FormGroup>
                            <Col sm={10}>
                                <FormControl
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={(e) =>setEmail(e.target.value)}
                                />
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
};