import {Button, Card, Col, Row, Tab, Tabs} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

export default function Hair(){
    const [key, setKey] = useState('all');
    const history = useHistory();
    const [dataArt, setDataArt] = useState([]);
    useEffect(() => {
        displayArticlesBySubCat(key);
    }, []);


    const displayArticlesBySubCat = (subCat) => {
        axios.get('http://localhost:5000/articles/category',{
        params : {category : 'hair', subCategory : subCat}
        }).then(resp => {
            const dA = resp.data.data;
            setDataArt(dA);
        }).catch((err) => {
            console.log(err);
        });

    };

    const handleGoArticle = (ia) => {
        history.push({ pathname:'/article/'+ ia});
    }


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
                defaultActiveKey={key}
                onSelect={(k) => {setKey(k);displayArticlesBySubCat(k);}}
                className="mb-3 tabsCustom"
            >
                <Tab eventKey="all" title="Tout">
                    {dataArt.map((elt, index) =>
                            <Row key={index} className="g-4">
                                {Array.from({length: dataArt.length}).map((_, idx) => (
                                    <Col key={idx}>
                                        <Card style={{width: '210px', height:'420px'}}>
                                            <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                            {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                            <Card.Body>
                                                <Card.Title>{elt.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                                <Card.Text>
                                                    {elt.description}
                                                </Card.Text>
                                                <Button variant="dark" onClick={() => handleGoArticle(elt._id)}>Lire la suite</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                    )}
                </Tab>
                <Tab eventKey="haircare" title="Soin des cheveux" >
                    {dataArt.map((elt, index) =>
                            <Row key={index} className="g-4">
                                {Array.from({length: dataArt.length}).map((_, idx) => (
                                    <Col key={idx}>
                                        <Card style={{width: '210px', height:'420px'}}>
                                            <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                            {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                            <Card.Body>
                                                <Card.Title>{elt.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                                <Card.Text>
                                                    {elt.description}
                                                </Card.Text>
                                                <Button variant="dark" onClick={() => handleGoArticle(elt._id)}>Lire la suite</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                    )}
                </Tab>
                <Tab eventKey="naturalHair" title="Cheveux naturels">
                    {dataArt.map((elt, index) =>
                            <Row key={index} className="g-4">
                                {Array.from({length: dataArt.length}).map((_, idx) => (
                                    <Col key={idx}>
                                        <Card style={{width: '210px', height:'420px'}}>
                                            <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                            {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                            <Card.Body>
                                                <Card.Title>{elt.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                                <Card.Text>
                                                    {elt.description}
                                                </Card.Text>
                                                <Button variant="dark" onClick={() =>handleGoArticle(elt._id)}>Lire la suite</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                    )}
                </Tab>
                <Tab eventKey="coiffures" title="Coiffures">
                    {dataArt.map((elt, index) =>
                            <Row key={index} className="g-4">
                                {Array.from({length: dataArt.length}).map((_, idx) => (
                                    <Col key={idx}>
                                        <Card style={{width: '210px', height:'420px'}}>
                                            <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                            {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                            <Card.Body>
                                                <Card.Title>{elt.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                                <Card.Text>
                                                    {elt.description}
                                                </Card.Text>
                                                <Button variant="dark" onClick={() => handleGoArticle(elt._id)}>Lire la suite</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                    )}
                </Tab>
            </Tabs>
        </div></>
    );
};