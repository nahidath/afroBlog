import React, {useState} from 'react';
import axios from 'axios';

import './SignIn.css';
import {Button, Form} from "react-bootstrap";


export default function  SignIn() {

    // const handleSignUp = () => {
    //     history.push({ pathname:'/signup'});
    // }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [isAuthenticated, userHasAuthenticated] = useState(false);

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
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
        
    };


    return (
        <div className="login-wrapper">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
            Pas de compte ? <a href="sign-up">Inscris-toi!</a>
        </div>
    );

};

