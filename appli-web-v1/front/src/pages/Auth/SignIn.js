import React, {useState} from 'react';
import axios from 'axios';

import './SignIn.css';
import {Button, Form} from "react-bootstrap";


export default function  SignIn() {

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
        // var { email, pass } = document.forms[0];
        //
        // // Find user login info
        // const userData = database.find((user) => user.username === email.value);
        //
        // // Compare user info
        // if (userData) {
        //     if (userData.password !== pass.value) {
        //         // Invalid password
        //         setErrorMessages({ name: "pass", message: errors.pass });
        //     } else {
        //         setIsSubmitted(true);
        //     }
        // } else {
        //     // Username not found
        //     setErrorMessages({ name: "uname", message: errors.email });
        // }

        axios.post('http://localhost:5000/user/signup', { 
            withCredentials: true,
            data: {
                email: email,
                password: password
            }
        }).then((res) =>{
            console.log(res)
        }).catch((err) => {
            console.log(err); 
        })
        
    };

    // const renderErrorMessage = (name) =>
    //     name === errorMessages.name && (
    //         <div className="error">{errorMessages.message}</div>
    //     );
    return (
        <div className="login-wrapper">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );

};

