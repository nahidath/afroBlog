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

    const stayFocus = (inputID, labelID) =>{

        const ipt = document.getElementById(inputID);
        const lbl = document.getElementById(labelID);
        if(ipt.value.length >= 1){
            lbl.style.transform = "translate(10px , -14px) scale(.85)";
        }
        if(ipt.value.length === 0){
            lbl.style.removeProperty('transform');
        }
    }

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
                    <input type="email" className="email-input" id="name" required onChange={(e) => setEmail(e.target.value)} onInput={()=>stayFocus("name", "email-label")}/>
                    <label htmlFor="name" className="input-label-email" id="email-label">Email</label>
                    <input type="password" className="password-input" id="password" required onChange={(e) => setPassword(e.target.value)} onInput={()=>stayFocus("password", "password-label")}/>
                    <label htmlFor="password" className="input-label-password" id="password-label">Mot de passe</label>
                </div>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </form>
            Pas de compte ? <a href="sign-up">Inscris-toi!</a>
        </div>
    );

};

