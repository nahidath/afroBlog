import './Profile.css';
import {Button, Col, Form, FormControl, FormGroup} from "react-bootstrap";
import {React, useEffect, useState} from "react";
import {BsFillPencilFill} from "react-icons/bs";
import axios from "axios";
import {toast} from "react-toastify";




export default function Profile(props) {

    const [profile, setProfile] = useState({
        name : ""
    });
    const [updtProfile, setupdtProfile] = {
        name : ""
    }

    const [firstName, setfirstName] = useState("");
    const [name, setName] = useState("");
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");

    useEffect(() => {
        getUserProfile();
    }, [])

    const getUserProfile = () => {
        axios.get('http://localhost:5000/user/user',{
            params : {email : props.match.params.email}
        }).then((resp) => {
            const pUser = resp.data.data;
            setProfile(pUser);
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateProfile = (event) => {
        if(oldPassword == props.match.params.password) {
            axios.post('http://localhost:5000/user/updateProfile',{
                withCredentials: true,
                data : {
                    email : props.match.params.email,
                    name : name,
                    firstName : firstName,
                    password : newPassword

                }

            }).then((resp) => {
                const updtUser = resp.data.data;
                setupdtProfile(updtUser);
                event.target.reset();
                toast.success("Profil modifié", {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
            })
        }else{
            toast.error("L'ancien mot de passe ne correspond pas", {
                theme: "colored",
                position: toast.POSITION.TOP_CENTER
            });
            event.preventDefault();
        }

    }



    return(
        <div id="profile-wrapper">
            <div className="welcome-zone">
                <div className="profile-pic">
                    <img src="/love-test.png" alt= "profilePic" width={"100px;"} height={"100px;"} />
                    <Button variant="outline-dark" size="sm" type="button"> <BsFillPencilFill/> </Button>
                    {/*<BsFillPencilFill/>*/}
                </div>
                <div className="welcome-text">
                    {
                        (updtProfile.name != profile.name) ?
                            "Welcome " + updtProfile.name : "Welcome " + profile.name
                    }

                </div>
            </div>
            <div className="edit-profile-zone">
                Edit your profile
                <hr/>
                <Form horizontal onSubmit={updateProfile}>
                    <FormGroup controlId="changeName">
                        <Col componentClass={Form.Label} sm={2}>
                            New Name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="changeFirstName">
                        <Col componentClass={Form.Label} sm={2}>
                            New Firstname
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                onChange={(e) => setfirstName(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="getOldPassword">
                        <Col componentClass={Form.Label} sm={2}>
                            Old password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="password"
                                onChange={(e) => setoldPassword(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="getNewPassword">
                        <Col componentClass={Form.Label} sm={2}>
                            New Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="password"
                                onChange={(e) => setnewPassword(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <hr/>
                <div className="fav-zone">
                    fav article
                </div>
            </div>

        </div>
    )
}