import React from 'react';
import { useHistory } from 'react-router-dom';

import './SubArticle.css';
import {Button, Card, Col, Row} from "react-bootstrap";


export default function SubArticle (props) {

    const history = useHistory();

    const handleGoArticle = () => {
        history.push({ pathname:'/article/' + props.article._id});
    }

    return (
        <div id='subArticle'>
            {/*<img */}
            {/*    src={['./articles', props.article.id, props.article.image].join('/')}*/}
            {/*    alt="subArticle"  */}
            {/*    className="articleImg" */}
            {/*/>*/}
            <div className="articleText">
                <Row className="g-4">
                    {Array.from({length: 2}).map((_, idx) => (
                        <Col key={idx}>
                            <Card className="displaySubArt">
                                <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}} />
                                <Card.Body>
                                    <Card.Title>{props.article.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{props.article.category} - {props.article.date}</Card.Subtitle>
                                    <Card.Text>
                                        {props.article.description}
                                    </Card.Text>
                                    <Button variant="dark" onClick={handleGoArticle}>Lire la suite</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            
        </div>
    );
};
