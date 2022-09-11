import './ContactForm.css';
import {Button, Col, Form} from "react-bootstrap";
import React, {useRef} from "react";
import emailjs from '@emailjs/browser';
import {toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function ContactForm(){

    const form = useRef();
    console.log(form.current);
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_ck55iw9', 'template_yafwsxd', form.current, '4efi92eRP81rtkqUk')
            .then(function(response) {
                e.target.reset();
                toast.success("Request sent successfully !", {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });

    };

    return(
        <div className="contact-wrapper">
            <h2>Contactez-nous</h2>
            <div className="contactText">
                Avez-vous quelque chose à nous faire part ? Un commentaire ou une idée à partager ? Vous pouvez nous le faire savoir grâce au formulaire ci-dessous :
            </div>
            <div className="formContact">
                <form onSubmit={sendEmail} ref={form}>
                    <div className="input-group-contact">
                        <input type="text" className="inputName" id="name" name="from_name"/>
                        <label htmlFor="name" className="inputLabelName">Nom</label>
                        <input type="email" className="inputEmail" id="email" name="email" />
                        <label htmlFor="email" className="inputLabelEmail">Email</label>
                        <textarea className="txtcontact" placeholder="Ecrivez ici..." name="message"></textarea>
                        <label className="rmqLabel">Remarques, suggestions</label>
                        <Button type="submit" variant="dark" className="btn-submitContact">Envoyer</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}