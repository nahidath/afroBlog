import React, {useState} from 'react';
import axios from 'axios';

import './SignIn.css';
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {setAuthToken} from "./setAuthToken()";


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

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/user/signin', {
            withCredentials: true,
            data: {
                email: email,
                password: password
            }
        }).then((res) =>{
            if(res.data["status"]=="fail"){
                toast.error(res.data["message"], {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
            }else{
                const userStored = JSON.stringify(email);
                localStorage.setItem("user", userStored);

                window.location = "/profile";
                // return res.data;
                // //get token from response
                // const token  =  res.data;
                // console.log(res.data);
                //
                // //set JWT token to local
                // localStorage.setItem("token", token);
                //
                // //set token to axios common header
                // setAuthToken(token);
                // // this.props.history.push("/profile");
                // // window.location = "/"
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

