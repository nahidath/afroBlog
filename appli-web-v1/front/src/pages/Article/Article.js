import React, {useEffect, useState} from 'react';
import './Article.css';
import {
  getArticle
} from '../../articles';
import {Divider} from "@material-ui/core";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function Article (props) {
    
    // const article = getArticle(props.match.params.id);
    // const [name,setName] = useState("");

    const [dataArt, setDataArt] = useState([]);
    const [randArt, setRandArt] =  useState([]);
    useEffect(() => {
        getArticle();
        displayRandomArticle();
    }, []);

    var articleID = props.match.params.id;
    const getArticle = () => {
        axios.get('http://localhost:5000/articles/article',{
            params : {id : articleID}
        }).then((resp) => {
            const dA = resp.data.data;
            setDataArt(dA);
        }).catch((err) => {
            console.log(err);
        });
    }

    const displayRandomArticle = () => {
        axios.get('http://localhost:5000/articles/randoms').then((resp) => {
            const dA = resp.data.data;
            setRandArt(dA);
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
            {dataArt.map((elt, index) => {
                return(
                    <>
                    <div className="articleHead">
                        <div className='categoryArt'><a href="#">{elt.category}</a> > <a href="#">{elt.subCategory}</a></div>
                        <div className='articleTitle'>{elt.title}</div>
                        <div className='articleDateInfo'>Ecrit par {elt.author} Publié le {elt.date}</div>
                    </div>
                    <div className='contentPart'>
                        {/*<img*/}
                        {/*    src={['/articles', article.id, article.image].join('/')}*/}
                        {/*    alt="articleImage"*/}
                        {/*    className='articleImage'/>*/}
                        <div className='articleImageDesc'>{elt.image_desc}</div>
                        <div className='articleContent'>{elt.content}</div>
                    </div></>
                );
            })}
            <hr/>
            <div className='artDiscovery'>
                <span>VOUS POURRIEZ AUSSI AIMER</span>
                <div className='artList'>
                    {randArt.map((elt, index) =>{
                        return (
                            <Row className="g-4">
                                {Array.from({length: 3}).map((_, idx) => (
                                    <Col>
                                        <Card style={{width: '210px', height:'350px'}}>
                                            <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                            {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                            <Card.Body>
                                                <Card.Title><a href="#" onClick={handleGoArticle(randArt._id)}>{randArt.title}</a></Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{randArt.category} - {randArt.date}</Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        );
                    })}
                </div>
            </div>
            <hr/>
            <div className="commentSection">
                <span>LAISSER UN COMMENTAIRE</span>
                <div className="zoneCom">
                    <label>Nom</label>
                    <input type="text" className="nameComment" />
                    <label>Commentaire</label>
                    <textarea className="txtcomment" placeholder="Laisser un commentaire"></textarea>
                    <Button variant="dark" className="btn-submitCom">SOUMMETRE</Button>
                </div>

            </div>
        </div>
        </>
    );
};
