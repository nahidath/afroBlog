import './ContactForm.css';
import {Button, Col, Form} from "react-bootstrap";
import React, {useRef, useState} from "react";
import emailjs from '@emailjs/browser';



export default function ContactForm(){

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_ck55iw9', 'template_yafwsxd', form.current, '4efi92eRP81rtkqUk')
            .then(function(response) {
                window.location.reload();
                alert("Request sent successfully");
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
                <Form horizontal onSubmit={sendEmail} ref={form}>
                    <Form.Group>
                        <Col componentClass={Form.Label} sm={2}>
                            Nom
                        </Col>
                        <Col sm={10} className="inputLabel">
                            <Form.Control
                                autoFocus
                                type="text"
                                name="from_name"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Col componentClass={Form.Label} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <Form.Control
                                autoFocus
                                type="email"
                                name="email"
                            />
                        </Col>
                    </Form.Group>
                    <div className="commentArea">
                        <label>Remarques, suggestions</label>
                        <textarea className="txtcontact" placeholder="Ecrivez ici..." name="message"></textarea>
                        <Button type="submit" variant="dark" className="btn-submitCom">Envoyer</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}