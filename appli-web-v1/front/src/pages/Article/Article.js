import React, {useState} from 'react';
import './Article.css';
import {
  getArticle
} from '../../articles';
import {Divider} from "@material-ui/core";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function Article (props) {
    
    const article = getArticle(props.match.params.id);
    // const [name,setName] = useState("");

    return (
        <>
        <div className='article'>
            <div className="articleHead">
                <div className='categoryArt'><a href="#">Category</a> > <a href="#">Sub Category</a></div>
                <div className='articleTitle'>{article.title}</div>
                <div className='articleDateInfo'>Ecrit par {article.author} Publié le {article.date}</div>
            </div>
            <div className='contentPart'>
                <img
                    src={['/articles', article.id, article.image].join('/')}
                    alt="articleImage"
                    className='articleImage'/>
                {/*<div className='articleImageDesc'>{article.image_desc}</div>*/}
                <div className='articleContent'>{article.content}</div>
            </div>
            <hr/>
            <div className='artDiscovery'>
                <span>VOUS POURRIEZ AUSSI AIMER</span>
                <div className='artList'>
                    <Row className="g-4">
                        {Array.from({length: 3}).map((_, idx) => (
                            <Col>
                                <Card style={{width: '210px', height:'350px'}}>
                                    <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                    {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                    <Card.Body>
                                        <Card.Title><a href="#">article discover</a></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Category - Date</Card.Subtitle>
                                        {/*<Card.Title>{props.article.title}</Card.Title>*/}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
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
