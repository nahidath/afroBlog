import './Profile.css';
import {Button, Card, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {React, useEffect, useState} from "react";
import {BsFillPencilFill} from "react-icons/bs";
import axios from "axios";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import SignIn from "../Auth/SignIn";




export default function Profile(props) {

    const history = useHistory();

    const [profile, setProfile] = useState({
        name : ""
    });
    const [updtProfile, setupdtProfile] = useState({
        name : ""
    });

    const [listArt, setListArt] = useState([]);
    const [firstName, setfirstName] = useState("");
    const [name, setName] = useState("");
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    };
    const currentUser = getCurrentUser();
    // console.log("the current user", currentUser);

    useEffect(() => {
        getUserProfile();
        favArtUsr();
    }, [])

    const getUserProfile = () => {
        axios.get('http://localhost:5000/user/user',{
            params : {email : currentUser}
        }).then((resp) => {
            setProfile(resp.data.data);
            console.log(profile);
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

    const favArtUsr = () => {
        axios.get('http://localhost:5000/user/favListArt',{
            params : {email : props.match.params.email}
        }).then((resp) => {
            setListArt(resp.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleGoArticle = (article_id) => {
        history.push({ pathname:'/article/' + article_id});
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
                    Welcome {
                        // (updtProfile.name != profile.name) updtProfile.name : profile.name
                        profile.name
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
                    {listArt.map((elt, index) =>
                        <Row key={index} className="g-4 miniature">
                            {Array.from({length: listArt.length}).map((_, idx) => (
                                <Col key={idx}>
                                    <Card style={{width: '210px', height:'350px'}}>
                                        <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                        {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                        <Card.Body>
                                            <Card.Title><a href={elt._id} onClick={() => handleGoArticle(elt._id)}>{elt.title}</a></Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            </div>

        </div>
    )
}