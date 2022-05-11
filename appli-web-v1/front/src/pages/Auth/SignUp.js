import React, {useState} from 'react';
import axios from 'axios';

import './SignUp.css';
import {Button, Form} from "react-bootstrap";


export default function  SignUp() {

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // // const [isAuthenticated, userHasAuthenticated] = useState(false);
    //
    const validateForm = () => {
        // return email.length > 0 && password.length > 0;

    }
    }
    // const [errorMessages, setErrorMessages] = useState({});
    // const [isSubmitted, setIsSubmitted] = useState(false);
    //
    // const errors = {
    //     email: "invalid email",
    //     pass: "invalid password"
    // };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        if(password != confPwd){
            alert("Les mots de passe ne correspondent pas")
        }

        axios.post('http://localhost:5000/user/signin', {
            withCredentials: true,
            data: {
                email: email,
                password: password
            }
        }).then((res) =>{
            console.log(res)
            if(res.data["status"]=="fail"){
                alert(res.data["message"])
            }else{
                window.location = "/"
            }
            // const status = res.status;
            // //redirect logic
            // if (res.status == 200) {
            //     window.location = "/"
            // }

        }).catch((err) => {
            console.log(err);
        })

    // };


    return (
        <div className="login-wrapper">
            <Form horizontal onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    {/*<Form.Label>Nom</Form.Label>*/}
                    <Col componentClass={ControlLabel} sm={2}>
                        Nom
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            autoFocus
                            type="text"
                            name="name"
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="firstName">
                    {/*<Form.Label>Prénom</Form.Label>*/}
                    <Col componentClass={ControlLabel} sm={2}>
                        Prénom
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            autoFocus
                            type="text"
                            name="firstName"
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="email">
                    {/*<Form.Label>Email</Form.Label>*/}
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            autoFocus
                            type="email"
                            name="email"
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="password">
                    {/*<Form.Label>Mot de passe</Form.Label>*/}
                    <Col componentClass={ControlLabel} sm={2}>
                        Mot de passe
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            type="password"
                            name="password"
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group  controlId="confPwd">
                    {/*<Form.Label>Confirmez votre mot de passe</Form.Label>*/}
                    <Col componentClass={ControlLabel} sm={2}>
                        Confirmez votre mot de passe
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            type="password"
                            name="confPwd"
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col smOffset={2} sm={10}>
                        <Button block size="lg" type="submit" >Sign Up</Button>
                    </Col>
                </Form.Group>

            </Form>
        </div>
    );

};

