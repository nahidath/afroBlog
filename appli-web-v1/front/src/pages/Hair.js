import {Button, Card, Col, Row, Tab, Tabs} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Hair(){
    const [key, setKey] = useState('all');

    const [dataArt, getDataArt] = useState([]);
    useEffect(() => {
        displayArticlesBySubCat();
    }, []);


    // const displayArticlesByCat = () => {
    //     axios.get('http://localhost:5000/articles/category/hair').then(resp => {
    //         const dA = resp.data.data;
    //         getDataArt(dA);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // };

    const displayArticlesBySubCat = (subC) => {
        if(subC == "all"){
            axios.get('http://localhost:5000/articles/category/hair').then(resp => {
                const dA = resp.data.data;
                getDataArt(dA);
            }).catch((err) => {
                console.log(err);
            });
        }else{
            axios.get('http://localhost:5000/articles/sub/hair/${subC}').then(resp => {
                const dA = resp.data.data;
                getDataArt(dA);
            }).catch((err) => {
                console.log(err);
            });
        }

    };


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
                onSelect={(k) => {setKey(k);displayArticlesBySubCat(k);}}
                className="mb-3 tabsCustom"
            >
                <Tab eventKey="all" title="Tout">
                    {dataArt.map((elt, index) => {
                        return(
                            <Row className="g-4">
                                {Array.from({length: 4}).map((_, idx) => (
                                    <Col>
                                        <Card style={{width: '210px', height:'420px'}}>
                                            <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                            {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                            <Card.Body>
                                                <Card.Title>{elt.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                                <Card.Text>
                                                    {elt.description}
                                                </Card.Text>
                                                <Button variant="outline-dark">Lire la suite</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        );
                    })}
                </Tab>
                <Tab eventKey="haircare" title="Soin des cheveux" >
                    {dataArt.map((elt, index) => {
                        return(
                            <Row className="g-4">
                                {Array.from({length: 4}).map((_, idx) => (
                                    <Col>
                                        <Card style={{width: '210px', height:'420px'}}>
                                            <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                            {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                            <Card.Body>
                                                <Card.Title>{elt.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                                <Card.Text>
                                                    {elt.description}
                                                </Card.Text>
                                                <Button variant="outline-dark">Lire la suite</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        );
                    })}
                </Tab>
                <Tab eventKey="naturalHair" title="Cheveux naturels">
                    {dataArt.map((elt, index) => {
                        return(
                            <Row className="g-4">
                                {Array.from({length: 4}).map((_, idx) => (
                                    <Col>
                                        <Card style={{width: '210px', height:'420px'}}>
                                            <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                            {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                            <Card.Body>
                                                <Card.Title>{elt.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                                <Card.Text>
                                                    {elt.description}
                                                </Card.Text>
                                                <Button variant="outline-dark">Lire la suite</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        );
                    })}
                </Tab>
                <Tab eventKey="coiffures" title="Coiffures">
                    {dataArt.map((elt, index) => {
                        return(
                            <Row className="g-4">
                                {Array.from({length: 4}).map((_, idx) => (
                                    <Col>
                                        <Card style={{width: '210px', height:'420px'}}>
                                            <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                            {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                            <Card.Body>
                                                <Card.Title>{elt.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                                <Card.Text>
                                                    {elt.description}
                                                </Card.Text>
                                                <Button variant="outline-dark">Lire la suite</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        );
                    })}
                </Tab>
            </Tabs>
        </div></>
    );
};