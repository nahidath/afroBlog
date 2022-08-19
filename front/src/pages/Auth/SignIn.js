import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";

import './SignIn.css';
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";

axios.defaults.withCredentials = true;

export default function SignIn(props) {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/user/signin', {
            email: email,
            password: password
        }).then((res) => {
            console.log(res.data)
            if (res.data["status"] === "fail") {
                toast.error(res.data["message"], {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                props.setUser(res.data["data"])
                history.push({ pathname:'/'});
            }
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

