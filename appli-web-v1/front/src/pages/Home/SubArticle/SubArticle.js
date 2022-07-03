import React from 'react';
import { useHistory } from 'react-router-dom';

import './SubArticle.css';
import {Button, Card, Col, Row} from "react-bootstrap";


export default function SubArticle (props) {

    const history = useHistory();

    const handleGoArticle = () => {
        history.push({ pathname:'/article/' + props.article.id});
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
                    {Array.from({length: 4}).map((_, idx) => (
                        <Col>
                            <Card style={{width: '210px', height:'420px'}}>
                                {/*<Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>*/}
                                <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                <Card.Body>
                                    <Card.Title>{props.article.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{props.article.category} -
                                        {props.article.date}</Card.Subtitle>
                                    {/*<Card.Title>{props.article.title}</Card.Title>*/}
                                    <Card.Text>
                                        {props.article.description}
                                    </Card.Text>
                                    <Button variant="outline-dark" onClick={handleGoArticle}>Lire la suite</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {/*<h2>*/}
                {/*    {props.article.title}*/}
                {/*</h2>*/}
                {/*<p>*/}
                {/*    {props.article.description}*/}
                {/*</p>*/}
                {/*<h5 onClick={handleGoArticle}>Lire la suite</h5>*/}
            </div>
            
        </div>
    );
};
