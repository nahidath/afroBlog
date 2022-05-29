import {Button, Card, Col, Row, Tab, Tabs} from "react-bootstrap";
import React, {useState} from "react";

export default function Skin(){
    const [key, setKey] = useState('all');
    return (
        <>
            <div id="banner"> {/*TODO:changer la bannière*/}
                <div id="textBanner">
                    <h1>Skin</h1>
                </div>
            </div>
            <div className="textTitle">
                We know skincare isn't one-size-fits-all. That's why we've tapped the top dermatologists, estheticians and skincare experts to share right products you should be using for your skin type. From reviews to treatments, consider this section to help you achieve your glowy-skin goals.
            </div>
            <div className="tabFilter">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 tabsCustom"
                >
                    <Tab eventKey="all" title="Tout">
                        <Row xs={1} md={2} className="g-4">
                            {Array.from({length: 4}).map((_, idx) => (
                                <Col>
                                    <Card style={{width: '18rem'}}>
                                        <Card.Img variant="top" src="/love-test.png"/>
                                        {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                        <Card.Body>
                                            <Card.Title>skin article1</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Category -
                                                Date</Card.Subtitle>
                                            {/*<Card.Title>{props.article.title}</Card.Title>*/}
                                            <Card.Text>
                                                blabla skin article1
                                                {/*{props.article.description}*/}
                                            </Card.Text>
                                            <Button variant="outline-dark">Lire la suite</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                    <Tab eventKey="skincare" title="Soin de la peau">
                    </Tab>
                    <Tab eventKey="oily" title="Peaux grasses">
                    </Tab>
                    <Tab eventKey="dry" title="Peaux sèches">
                    </Tab>
                    <Tab eventKey="acne" title="Peaux acnéiques">
                    </Tab>
                    <Tab eventKey="more" title="Plus +">
                    </Tab>
                </Tabs>
            </div></>
    );
};