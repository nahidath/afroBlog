import React, {useState} from 'react';
import axios from 'axios';

import './SignUp.css';
import {Button, Col, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import emailjs from "@emailjs/browser";


export default function  SignUp() {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("");
    const [firstName,setFirstName] = useState("");
    const [confPwd, setConfPwd] = useState("");
    const [checked, setChecked] = useState(false);

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
                toast.error(res.data["message"], {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
            }else{
                subSignUp();
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
    const sendEmail = () => {
        emailjs.send('service_ck55iw9', 'template_k4xib47', {email:email},'4efi92eRP81rtkqUk')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });

    }
    const subSignUp = () =>{
        if (checked){
            axios.post('http://localhost:5000/sub/subscribe', {
                withCredentials: true,
                data: {
                    email: email
                }
            }).then((res) =>{
                sendEmail();
            }).catch((err) => {
                console.log(err);
            })
        }
    }


    return (
        <div className="signup-wrapper">
            <Form horizontal onSubmit={handleSubmit} className="signup-form">
                <Form.Group controlId="name">
                    <Col componentClass={Form.Label} sm={2} className="label">
                        Nom
                    </Col>
                    <Col sm={10} className="inputLabel">
                        <Form.Control
                            autoFocus
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            // placeholder="Nom"
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="firstName">
                    <Col componentClass={Form.Label} sm={2} className="label">
                        Prénom
                    </Col>
                    <Col sm={10} className="inputLabel">
                        <Form.Control
                            autoFocus
                            type="text"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            // placeholder="Prénom"
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="email">
                    <Col componentClass={Form.Label} sm={2} className="label">
                        Email
                    </Col>
                    <Col sm={10} className="inputLabel">
                        <Form.Control
                            autoFocus
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            // placeholder="Email"
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="password">
                    <Col componentClass={Form.Label} className="label">
                        Mot de passe
                    </Col>
                    <Col sm={10} className="inputLabel">
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            // placeholder="Mot de passe"
                        />
                    </Col>
                </Form.Group>
                <Form.Group  controlId="confPwd">
                    <Col componentClass={Form.Label} className="label">
                        Confirmez votre mot de passe
                    </Col>
                    <Col sm={10} className="inputLabel">
                        <Form.Control
                            type="password"
                            name="confPwd"
                            onChange={(e) => setConfPwd(e.target.value)}
                            // placeholder="Confirmez votre mot de passe"
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        type='checkbox'
                        id="subscribeBox"
                        label="S'abonner à la newsletter"
                        onChange={(e) =>setChecked(e.target.checked)}
                    />
                </Form.Group>
                <Form.Group>
                    <Col smOffset={2} sm={10}>
                        <Button block size="lg" type="submit" onClick={handleSubmit}>Sign Up</Button>
                    </Col>
                </Form.Group>
            </Form>
            <span>Déjà inscrit ? <a href="sign-in">Connecte-toi!</a></span>
        </div>
    );

};

