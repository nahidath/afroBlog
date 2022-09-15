import './Profile.css';
import {Button, Card, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {React, useEffect, useRef, useState} from "react";
import {BsFillPencilFill, BsFillSuitHeartFill} from "react-icons/bs";
import axios from "axios";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import SignIn from "../Auth/SignIn";
import {forEach} from "react-bootstrap/ElementChildren";
import emailjs from "@emailjs/browser";



export default function Profile(props) {

    const history = useHistory();

    const fileInput = useRef();

    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [favArtList, setFavArtList] = useState([]);
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (props.user.name) {
            setIsConnected(true);
            setName(props.user.name);
            setFirstName(props.user.firstName);
            setPassword(props.user.password);
            setFavArtList(props.user.favArtList);
            setIsSubscribe(props.user.isSubscribe);
        } else {
            setIsConnected(false);
            setName("");
            setFirstName("");
            setPassword("");
            setFavArtList([]);
            setIsSubscribe(false);
        }
    }, [props.user]);

    const handleGoSignIn = () => {
        history.push({ pathname:'/sign-in'});
    }

    const handleGoArticle = (article_id) => {
        history.push({ pathname:'/article/' + article_id});
    }

    const selectFile = () => {
        fileInput.current.click();
    }

    const handleUpdateProfile = (event) => {
        axios.post('http://localhost:5000/user/updateProfile',{
            withCredentials: true,
            data : {
                name : name,
                firstName : firstName,
                password : password,
                isSubscribe : isSubscribe
            }
        }).then((resp) => {
            if (resp.data.status === "fail") {
                toast.error("Profil modifié", {
                    theme: "colored",
                    position: resp.data.message
                });
            } else {
                let userInfos = {...props.user};
                let fields = {
                    'name': name, 
                    'firstName': firstName, 
                    'password': password, 
                    'isSubscribe': isSubscribe
                };
                Object.keys(fields).forEach(field => {
                    if (fields[field] !== props.user[field] && fields[field] !== '') {
                        userInfos[field] = fields[field]
                    }
                });
                props.setUser(userInfos);
                toast.success("Profil modifié", {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        (!isConnected) ?
        <div className="profile-wrapper">
            <div className='text-center'>
                <p>Vous devez être connecté pour accéder à cette page</p>
                <Button onClick={handleGoSignIn}>Se connecter</Button>
            </div> 
        </div> :
        <div className="profile-wrapper">
            <div className="welcome-zone">
                <div className="profile-pic">
                    <img src="/love-test.png" alt= "profilePic" width={"100px;"} height={"100px;"} />
                    <input
                        style={{display: 'none'}}
                        ref={fileInput}
                        type="file"/>
                    <Button variant="outline-dark" size="sm" type="button" onClick={selectFile}> 
                        <BsFillPencilFill/>
                    </Button>
                </div>
                <div className="welcome-text">
                    Welcome {props.user.name}
                </div>
            </div>
            <div className="edit-profile-zone">
                Edit your profile
                <hr/>
                <Form>
                    <FormGroup>
                        <Col>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                value={name}
                                placeholder={props.user.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col>
                            Firstname
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                value={firstName}
                                placeholder={props.user.firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="password"
                                value={password}
                                placeholder='**********'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <Form.Group>
                        <Form.Check
                            type='checkbox'
                            id="subscribeBoxProfile"
                            label="S'abonner à la newsletter"
                            onChange={(e) =>setIsSubscribe(e.target.checked)}
                            checked={isSubscribe}
                        />
                    </Form.Group>
                    <FormGroup>
                        <Col sm={10}>
                            <Button 
                                onClick={handleUpdateProfile}
                                disabled={
                                    (name === '' && firstName === '' && password === '' && isSubscribe === props.user.isSubscribe) || 
                                    (name === props.user.name && firstName === props.user.firstName && password === props.user.password && isSubscribe === props.user.isSubscribe)}>
                                    Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <hr/>
                <div className="fav-zone">
                    <span>Vos articles favoris <BsFillSuitHeartFill/></span>
                    <div className="fav-zone-art">
                        {favArtList.map((elt, index) =>
                            <Row key={index} className="g-4 miniature" xs={1} md={4}>
                                <Col xs={1} md={4}>
                                    <Card style={{width: '210px', height:'350px'}}>
                                        <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}} onClick={() => handleGoArticle(elt._id)}/>
                                        {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                        <Card.Body>
                                            <Card.Title><a href={elt._id} onClick={() => handleGoArticle(elt._id)}>{elt.title}</a></Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}