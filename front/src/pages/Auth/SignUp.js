import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './SignUp.css';
import {Button, Col, htmlForm} from "react-bootstrap";
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
    const [isEmpty,setEmpty] = useState(true);

    //
    // useEffect(() => {
    //     stayFocus();
    // },[]);

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

    // const stayFocus = () =>{
    //     const inputName = document.getElementsByClassName("input-name-set");
    //     const inputPrenom = document.getElementsByClassName("input-prenom");
    //     const inputEmail = document.getElementsByClassName("input-email");
    //     const inputPwd = document.getElementsByClassName("input-password-set");
    //     const inputConfirmPwd =  document.getElementsByClassName("input-password-confirm");
    //
    //     if(inputName.value!=""){
    //         const labelN = document.getElementsByClassName("input-label-name");
    //         labelN.style.transhtmlForm= "translate(10px , -14px)";
    //     }
    // }

    const stayFocus = () =>{
        const ipt = document.getElementsByClassName("input-name-set");
        const lbl = document.getElementById("et");
        if(ipt.length != 0){
            console.log(ipt.length);
            setEmpty(false);
        }
        if(isEmpty ==  false){
            lbl.style.transform = "translate(10px , -14px)";
            lbl.style.backgroundColor = "inherit";
        }

    }


    return (
        <div className="signup-wrapper">
            <div className="signup-title">
                INSCRIPTION
            </div>
            <div className="signup-subtitle">
                Veuillez remplir les champs suivants :
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-group-signup">
                    <input type="text" className="input-name-set" id="name" required onChange={(e) => setName(e.target.value)} onInput={stayFocus}/>
                    <label htmlFor="name" className="input-label-name" id="et">Nom</label>
                    <input type="text" className="input-prenom" id="prenom" required onChange={(e) => setFirstName(e.target.value)}/>
                    <label htmlFor="prenom" className="input-label-prenom">Prénom</label>

                    <input type="email" className="input-email" id="email" required
                           onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="email" className="input-label-email-set">Email</label>

                    <input type="password" className="input-password-set" id="password-set" required
                           onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password" className="input-label-password-set">Mot de passe</label>

                    <input type="password" className="input-password-confirm" id="password-confirm" required
                           onChange={(e) => setConfPwd(e.target.value)}/>
                    <label htmlFor="password" className="input-label-password-confirm">Confirmez votre mot de passe</label>

                    <input type="checkbox" className="subscribeBox" id="subscribeBox" onChange={(e) =>setChecked(e.target.checked)} />
                    <label htmlFor="checkbox" className="subscribeBox-label">S'abonner à la newsletter</label>

                </div>
                <Button block size="lg" type="submit" onClick={handleSubmit}>
                    Sign up
                </Button>
            </form>
            <span>Déjà inscrit ? <a href="sign-in">Connecte-toi!</a></span>
        </div>
    );

};

