import React from 'react';
import './Article.css';
import {
  getArticle
} from '../../articles';
import {Divider} from "@material-ui/core";
import {Button, Card, Col, Row} from "react-bootstrap";


export default function Article (props) {
    
    const article = getArticle(props.match.params.id);
    
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
            <Divider />
            <div className='artDiscovery'>
                Vous pourrier aussi aimez:
                <div className='artList'>
                    <Row className="g-4">
                        {Array.from({length: 3}).map((_, idx) => (
                            <Col>
                                <Card style={{width: '210px', height:'420px'}}>
                                    <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                    {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                    <Card.Body>
                                        <Card.Title>article discover</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Category - Date</Card.Subtitle>
                                        {/*<Card.Title>{props.article.title}</Card.Title>*/}
                                        <Card.Text>
                                            blabla article discover
                                            {/*{props.article.description}*/}
                                        </Card.Text>
                                        <Button variant="outline-dark">Lire la suite</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
        </>
    );
};
