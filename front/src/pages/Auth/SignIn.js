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
        console.log(email, password);
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
            <div className="login-title">
                CONNEXION
            </div>
            <div className="login-subtitle">
                Veuillez indiquer votre email et mot de passe :
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="email" className="input-name" id="name" required onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="name" className="input-label-email">Email</label>
                    <input type="password" className="input-password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password" className="input-label-password">Mot de passe</label>
                </div>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </form>
            Pas de compte ? <a href="sign-up">Inscris-toi!</a>
        </div>
    );

};

