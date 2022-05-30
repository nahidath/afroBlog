import {Button, Card, Col, Row, Tab, Tabs} from "react-bootstrap";
import React, {useState} from "react";

export default function Hair(){
    const [key, setKey] = useState('all');
    return (
        <>
        <div id="banner">
            <div id="textBanner">
                <h1>Hair</h1>
            </div>
        </div>
        <div className="textTitle">
            We're here to help you in your good-hair journey—whatever that means to you. Want tips on how to transition to natural hair? We got you. What about the best curling iron that’s actually worth your money? We asked the pros to share their favorites. Whatever hair concern you have (or even if you’re just looking for some color/cut inspiration), you’ve come to the right place.
        </div>
        <div className="tabFilter">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 tabsCustom"
            >
                <Tab eventKey="all" title="Tout">
                    <Row className="g-4">
                        {Array.from({length: 4}).map((_, idx) => (
                            <Col>
                                <Card style={{width: '210px', height:'420px'}}>
                                    <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                    {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                    <Card.Body>
                                        <Card.Title>hair article1</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Category -
                                            Date</Card.Subtitle>
                                        {/*<Card.Title>{props.article.title}</Card.Title>*/}
                                        <Card.Text>
                                            blabla hair article1
                                            {/*{props.article.description}*/}
                                        </Card.Text>
                                        <Button variant="outline-dark">Lire la suite</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="haircare" title="Soin des cheveux">
                </Tab>
                <Tab eventKey="naturalHair" title="Cheveux naturels">
                </Tab>
                <Tab eventKey="coiffures" title="Coiffures">
                </Tab>
            </Tabs>
        </div></>
    );
};