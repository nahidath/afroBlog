import React, {useState} from 'react';
import axios from 'axios';

import './SignUp.css';
import {Button, Col, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";


export default function  SignUp() {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("");
    const [firstName,setFirstName] = useState("");
    const [confPwd, setConfPwd] = useState("");

    const handleSignUp = () => {
        history.push({ pathname:'/sign-in'});
    }

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        if(password !== confPwd){
            event.stopPropagation();
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        axios.post('http://localhost:5000/user/signup', {
            withCredentials: true,
            data: {
                name: name,
                firstName: firstName,
                email: email,
                password: password
            }
        }).then((res) =>{
            console.log(res)
            if(res.data["status"]=="fail"){
                alert(res.data["message"])
            }else{
                handleSignUp();
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
        <div className="signup-wrapper">
            <Form horizontal onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Col componentClass={Form.Label} sm={2}>
                        Nom
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            autoFocus
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="firstName">
                    <Col componentClass={Form.Label} sm={2}>
                        Prénom
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            autoFocus
                            type="text"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="email">
                    <Col componentClass={Form.Label} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            autoFocus
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="password">
                    <Col componentClass={Form.Label} sm={2}>
                        Mot de passe
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group  controlId="confPwd">
                    <Col componentClass={Form.Label} sm={2}>
                        Confirmez votre mot de passe
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            type="password"
                            name="confPwd"
                            onChange={(e) => setConfPwd(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col smOffset={2} sm={10}>
                        <Button block size="lg" type="submit" onClick={handleSubmit}>Sign Up</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );

};

