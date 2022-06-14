import './ContactForm.css';
import {Button, Col, Form} from "react-bootstrap";
import React, {useState} from "react";



export default function ContactForm(){

    const [email, setEmail] = useState("");
    const [name,setName] = useState("");

    const handleSubmit = (event) => {}

    return(
        <div className="contact-wrapper">
            <h3>Contactez-nous</h3>
            <div className="contactText>">
                Avez-vous quelque chose à nous faire part ? Un commentaire ou une idée à partager ? Vous pouvez nous le faire savoir grâce au formulaire si dessous :
            </div>
            <div className="formContact">
                <Form horizontal onSubmit={handleSubmit} className="contact-form">
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
                            />
                        </Col>
                    </Form.Group>
                    <label>Remarques, suggesstions</label>
                    <textarea className="txtcontact" placeholder="Ecrivez ici..."></textarea>
                    <Button variant="dark" className="btn-submitCom">Envoyer</Button>
                </Form>
            </div>
        </div>
    );
}