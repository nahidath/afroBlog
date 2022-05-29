import {Button, Card, Col, Row, Tab, Tabs} from "react-bootstrap";
import React, {useState} from "react";

export default function Makeup(){
    const [key, setKey] = useState('all');
    return (
        <>
            <div id="banner"> {/*TODO:changer la bannière*/}
                <div id="textBanner">
                    <h1>Makeup</h1>
                </div>
            </div>
            <div className="textTitle">
                Makeup lovers, you've come to the right place. Here you'll find the hottest makeup trends from the runways (and Instagram), breakdowns of red carpet looks begging to be your Friday night makeup inspo, plus makeup tips and tricks from the world's biggest makeup artists.
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
                                            <Card.Title>makeup article1</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Category -
                                                Date</Card.Subtitle>
                                            {/*<Card.Title>{props.article.title}</Card.Title>*/}
                                            <Card.Text>
                                                blabla makeup article1
                                                {/*{props.article.description}*/}
                                            </Card.Text>
                                            <Button variant="outline-dark">Lire la suite</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                    <Tab eventKey="face" title="Teint">
                    </Tab>
                    <Tab eventKey="eyes" title="Yeux">
                    </Tab>
                    <Tab eventKey="lips" title="Lèvres">
                    </Tab>
                    <Tab eventKey="brows" title="Sourcils">
                    </Tab>
                </Tabs>
            </div></>
    );
};