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

    const [listArt, setListArt] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [name, setName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleGoSignIn = () => {
        history.push({ pathname:'/sign-in'});
    }

    const handleGoArticle = (article_id) => {
        history.push({ pathname:'/article/' + article_id});
    }
    
    useEffect(() => {
        setCheckboxSub();
    }, [])

    const setCheckboxSub = () => {
        axios.get('http://localhost:5000/sub/check').then((resp) => {
            console.log(resp)
            if(resp.data["status"] === "success"){
                setSubscribed(true);
                setCheckbox(true);
            }else{
                setSubscribed(false);
                setCheckbox(false);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const selectFile = () => {
        fileInput.current.click();
    }

    const handleUpdateProfile = (event) => {
        console.log(checkbox)
        axios.post('http://localhost:5000/user/updateProfile',{
            withCredentials: true,
            data : {
                name : name,
                firstName : firstName,
                password : newPassword,
                subscribe : checkbox
            }
        }).then((resp) => {
            props.setUser(resp.data.data);
            toast.success("Profil modifié", {
                theme: "colored",
                position: toast.POSITION.TOP_CENTER
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    // const sendEmail = (sub) => {
    //     if(sub == "subscribe"){
    //         emailjs.send('service_ck55iw9', 'template_k4xib47', {email:currentUser.email, subject:"Bienvenue sur notre newsletter !!", message:"\n" +
    //                 "BIENVENUE CHEZ AFROBLOG !\n" +
    //                 "\n" +
    //                 "MERCI DE T'ÊTRE ABONNÉ(E) À LA NEWSLETTER D' AFROBLOG. DÈS AUJOURD'HUI, TU RECEVRAS PAR MAIL DES INFORMATIONS SUR LES TENDANCES, LA MODE ET LES NOUVEAUTÉS D' AFROBLOG. TU SERAS INFORMÉ(E) À TOUT MOMENT !\n" +
    //                 "\n" +
    //                 "À BIENTÔT ET PROFITE BIEN DE NOTRE BLOG !\n" +
    //                 "\n" +
    //                 "www.afroblog.com"},'4efi92eRP81rtkqUk')
    //             .then(function(response) {
    //                 console.log('SUCCESS!', response.status, response.text);
    //             }, function(error) {
    //                 console.log('FAILED...', error);
    //             });

    //     }else{
    //         emailjs.send('service_ck55iw9', 'template_k4xib47', {email:currentUser.email, subject: "Oh non vous partez !", message:"Oh non, vous vous êtes désabonné de la newsletter!\nMais c'est pas grave tu continueras à avoir accès à tous les articles du blog.\n\nA très vite !!!\n\n\nwww.afroblog.com"},'4efi92eRP81rtkqUk')
    //             .then(function(response) {
    //                 console.log('SUCCESS!', response.status, response.text);
    //             }, function(error) {
    //                 console.log('FAILED...', error);
    //             });
    //     }
    // }

    // const subscribe = (event, check) => {
    //     if(check == true){
    //         axios.post('http://localhost:5000/sub/subscribe', {
    //             withCredentials: true,
    //             data: {
    //                 email: currentUser.email
    //             }
    //         }).then((res) =>{
    //             toast.success(res.data["message"], {
    //                 theme: "colored",
    //                 position: toast.POSITION.TOP_CENTER
    //             });
    //             sendEmail("subscribe");
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     }else{
    //         axios.post('http://localhost:5000/sub/unsubscribe', {
    //             withCredentials: true,
    //             data: {
    //                 email: currentUser.email
    //             }
    //         }).then((res) =>{
    //             sendEmail("unsubscribe");
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     }
    // }


    return (
        (!props.user.name) ?
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
                    <FormGroup controlId="changeName">
                        <Col>
                            New Name
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

                    <FormGroup controlId="changeFirstName">
                        <Col>
                            New Firstname
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
                    <FormGroup controlId="getNewPassword">
                        <Col>
                            New Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <Form.Group>
                        <Form.Check
                            type='checkbox'
                            id="subscribeBox"
                            label="S'abonner à la newsletter"
                            onChange={(e) =>setCheckbox(e.target.checked)}
                            checked={checkbox}
                        />
                    </Form.Group>
                    <FormGroup>
                        <Col sm={10}>
                            <Button 
                                onClick={handleUpdateProfile}
                                disabled={name === '' && firstName === '' && newPassword === '' && subscribed === checkbox}>
                                    Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <hr/>
                <div className="fav-zone">
                    <span>Vos articles favoris <BsFillSuitHeartFill/></span>
                    <div className="fav-zone-art">
                        {listArt.map((elt, index) =>
                            <Row key={index} className="g-4 miniature" xs={1} md={4}>
                                <Col xs={1} md={4}>
                                    <Card style={{width: '210px', height:'350px'}}>
                                        <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
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