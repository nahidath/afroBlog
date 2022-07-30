import './Profile.css';
import {Button, Card, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {React, useEffect, useState} from "react";
import {BsFillPencilFill, BsFillSuitHeartFill} from "react-icons/bs";
import axios from "axios";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import SignIn from "../Auth/SignIn";
import {forEach} from "react-bootstrap/ElementChildren";
import emailjs from "@emailjs/browser";




export default function Profile(props) {
    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    };
    const currentUser = getCurrentUser();

    const history = useHistory();

    // const [profile, setProfile] = useState({
    //     name : "",
    //     firstName : "",
    //     email : "",
    //     password : "",
    //     favArtList : []
    // });
    const [updtProfile, setupdtProfile] = useState({
        name : ""
    });

    const [listArt, setListArt] = useState([]);
    const [firstName, setfirstName] = useState("");
    const [name, setName] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [checkbox, setCheckbox] = useState("");
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        // getUserProfile();
        displayFavArtUsr();
        setCheckboxSub();
    }, [])

    // useEffect(() => {
    //     localStorage.setItem("user", JSON.stringify(profile));
    // },[profile])
    //
    // const getUserProfile = () => {
    //     axios.get('http://localhost:5000/user/user',{
    //         params : {email : currentUser}
    //     }).then((resp) => {
    //         // const userUpdt = JSON.stringify(resp.data.data);
    //         // localStorage.setItem("user", userUpdt);
    //         setProfile(resp.data.data);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }

    const sendEmail = (sub) => {
        if(sub == "subscribe"){
            emailjs.send('service_ck55iw9', 'template_k4xib47', {email:currentUser.email, subject:"Bienvenue sur notre newsletter !!", message:"\n" +
                    "BIENVENUE CHEZ AFROBLOG !\n" +
                    "\n" +
                    "MERCI DE T'ÊTRE ABONNÉ(E) À LA NEWSLETTER D' AFROBLOG. DÈS AUJOURD'HUI, TU RECEVRAS PAR MAIL DES INFORMATIONS SUR LES TENDANCES, LA MODE ET LES NOUVEAUTÉS D' AFROBLOG. TU SERAS INFORMÉ(E) À TOUT MOMENT !\n" +
                    "\n" +
                    "À BIENTÔT ET PROFITE BIEN DE NOTRE BLOG !\n" +
                    "\n" +
                    "www.afroblog.com"},'4efi92eRP81rtkqUk')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    console.log('FAILED...', error);
                });

        }else{
            emailjs.send('service_ck55iw9', 'template_k4xib47', {email:currentUser.email, subject: "Oh non vous partez !", message:"Oh non, vous vous êtes désabonné de la newsletter!\nMais c'est pas grave tu continueras à avoir accès à tous les articles du blog.\n\nA très vite !!!\n\n\nwww.afroblog.com"},'4efi92eRP81rtkqUk')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    console.log('FAILED...', error);
                });
        }

    }

    const subscribe = (event, check) => {
        if(check == true){
            axios.post('http://localhost:5000/sub/subscribe', {
                withCredentials: true,
                data: {
                    email: currentUser.email
                }
            }).then((res) =>{
                toast.success(res.data["message"], {
                    theme: "colored",
                    position: toast.POSITION.TOP_CENTER
                });
                sendEmail("subscribe");
            }).catch((err) => {
                console.log(err);
            })
        }else{
            axios.post('http://localhost:5000/sub/unsubscribe', {
                withCredentials: true,
                data: {
                    email: currentUser.email
                }
            }).then((res) =>{
                sendEmail("unsubscribe");
            }).catch((err) => {
                console.log(err);
            })
        }


    }

    const updateProfile = (event) => {
        axios.post('http://localhost:5000/user/updateProfile',{
            withCredentials: true,
            data : {
                email : currentUser.email,
                name : name,
                firstName : firstName,
                password : newPassword
            }
        }).then((resp) => {
            setupdtProfile(resp.data.data);
            const userStored = JSON.stringify(resp.data.data);
            localStorage.setItem("user", userStored);
            // if(checked){
            //   subscribe(event,true);
            // }else{
            //     subscribe(event,false);
            // }
            event.target.reset();
            toast.success("Profil modifié", {
                theme: "colored",
                position: toast.POSITION.TOP_CENTER
            });
        }).catch((err) => {
        console.log(err);
        })

    }

    const displayFavArtUsr = () => {
        const currentUserList = currentUser.favArtList;
        axios.get('http://localhost:5000/articles/favArticles',{
            params : {list: currentUserList}
        }).then((resp) => {
            setListArt(resp.data.data)
        }).catch((err) => {
            console.log(err);
        });

    }

    const handleGoArticle = (article_id) => {
        history.push({ pathname:'/article/' + article_id});
    }

    const setCheckboxSub = () => {
        axios.get('http://localhost:5000/sub/check',{
            params: {email : currentUser.email}
        }).then((resp) => {
            if(resp.data["status"] == "success"){
                setCheckbox("checked");
            }else{
                setCheckbox("");
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    return(
        <div className="profile-wrapper">
            <div className="welcome-zone">
                <div className="profile-pic">
                    <img src="/love-test.png" alt= "profilePic" width={"100px;"} height={"100px;"} />
                    <Button variant="outline-dark" size="sm" type="button"> <BsFillPencilFill/> </Button>
                    {/*<BsFillPencilFill/>*/}
                </div>
                <div className="welcome-text">
                    Welcome {currentUser.name}
                </div>
            </div>
            <div className="edit-profile-zone">
                Edit your profile
                <hr/>
                <Form horizontal onSubmit={updateProfile}>
                    <FormGroup controlId="changeName">
                        <Col componentClass={Form.Label}>
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
                        <Col componentClass={Form.Label} >
                            New Firstname
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                onChange={(e) => setfirstName(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="getNewPassword">
                        <Col componentClass={Form.Label}>
                            New Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="password"
                                onChange={(e) => setnewPassword(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <Form.Group>
                        <Form.Check
                            type='checkbox'
                            id="subscribeBox"
                            label="S'abonner à la newsletter"
                            onChange={(e) =>setChecked(e.target.checked)}
                            checked={checkbox}
                        />
                    </Form.Group>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Save</Button>
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