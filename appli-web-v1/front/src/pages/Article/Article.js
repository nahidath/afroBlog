import React, {useEffect, useState} from 'react';
import './Article.css';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import { useHistory } from 'react-router-dom';

export default function Article (props) {

    const [name,setName] = useState("");
    const [content, setContent] = useState("");


    const history = useHistory();
    const [dataArt, setDataArt] = useState({
        author: "",
        category : "",
        subCategory : "",
        title : "",
        date : "",
        imageDesc : "",
        content : ""
    });
    const [randArt, setRandArt] =  useState([]);
    useEffect(() => {
        getArticle();
        displayRandomArticle();
    }, []);


    const getArticle = () => {
        axios.get('http://localhost:5000/articles/article',{
            params : {_id : props.match.params.id}
        }).then((resp) => {
            const dA = resp.data.data;
            setDataArt(dA);
        }).catch((err) => {
            console.log(err);
        });
    }

    const displayRandomArticle = () => {
        console.log("function displayRandomArticle")
        axios.get('http://localhost:5000/articles/randoms').then((resp) => {
            const rA = resp.data.data;
            console.log(rA);
            setRandArt(rA);
        }).catch((err) => {
            console.log(err);
        })
    }

    const postComment = (event) => {
        axios.post('http://localhost:5000/comments/add', {
            withCredentials: true,
            data: {
                author: name,
                commentDesc: content,
                //TODO: ajouterla date et get l'id de l'article actuel
                // date : date,
                // articleID :
            }
        }).then((res) =>{
            console.log(res)
            // if(res.data["status"]=="fail"){
            //     alert(res.data["message"])
            // }else{
            //     handleSignUp();
            // }

        }).catch((err) => {
            console.log(err);
        })
    }

    const handleGoArticle = (article_id) => {
        history.push({ pathname:'/article/' + article_id});
    }

    return (
        <>
        <div className='article'>
            <div className="articleHead">
                <div className='categoryArt'><a href="#">{dataArt.category}</a> > <a href="#">{dataArt.subCategory}</a></div>
                <div className='articleTitle'>{dataArt.title}</div>
                <div className='articleDateInfo'>Ecrit par {dataArt.author} Publié le {dataArt.date}</div>
            </div>
            <div className='contentPart'>
                {/*<img*/}
                {/*    src={['/articles', article.id, article.image].join('/')}*/}
                {/*    alt="articleImage"*/}
                {/*    className='articleImage'/>*/}
                <div className='articleImageDesc'>{dataArt.image_desc}</div>
                <div className='articleContent'>{dataArt.content}</div>
            </div>
            <hr/>
            <div className='artDiscovery'>
                <span>VOUS POURRIEZ AUSSI AIMER</span>
                <div className='artList'>
                    {randArt.map((elt, index) =>
                            <Row key={index} className="g-4 miniature">
                                {Array.from({length: 1}).map((_, idx) => (
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
            <hr/>
            <div className="commentSection">
                <span>LAISSER UN COMMENTAIRE</span>
                <div className="zoneCom">
                    <label>Nom</label>
                    <input type="text" className="nameComment" name="name"/>
                    <label>Commentaire</label>
                    <textarea className="txtcomment" placeholder="Laisser un commentaire" name="content"></textarea>
                    <Button variant="dark" className="btn-submitCom" onClick={postComment}>SOUMMETRE</Button>
                </div>

            </div>
        </div>
        </>
    );
};
