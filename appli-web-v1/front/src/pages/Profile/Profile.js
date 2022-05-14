import './Profile.css';
import {Button, Col, Form, FormControl, FormGroup} from "react-bootstrap";
import {React} from "react";
import {BsFillPencilFill} from "react-icons";




export default function Profile() {

    return(
        <div className="profile-wrapper">
            <div className="welcome-zone">
                <div className="profile-pic">
                    <img src="/love-test" alt= "profilePic" />
                    <Button variant="outline-dark" size="sm" type="button"> <BsFillPencilFill/> </Button>
                </div>
                <div className="welcome-text">
                    welcome baba
                </div>
            </div>
            <div className="edit-profile-zone">
                <Form horizontal>
                    <FormGroup controlId="changeName">
                        <Col componentClass={Form.Label} sm={2}>
                            New Name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="changeFirstName">
                        <Col componentClass={Form.Label} sm={2}>
                            New Firstname
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"  />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="getOldPassword">
                        <Col componentClass={Form.Label} sm={2}>
                            Old password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password"  />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="getNewPassword">
                        <Col componentClass={Form.Label} sm={2}>
                            New Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password"  />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Save</Button>
                        </Col>
                    </FormGroup>
                </Form>;
                <div className="fav-zone">
                    fav article
                </div>
            </div>

        </div>
    )
}