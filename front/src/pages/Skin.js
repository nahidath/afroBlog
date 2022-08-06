import {Button, Card, Col, Row, Tab, Tabs} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import './Skin.css';
import axios from "axios";
import {useHistory} from "react-router-dom";

export default function Skin(){
    const [key, setKey] = useState('all');
    const history = useHistory();

    const [dataArt, setDataArt] = useState([]);
    useEffect(() => {
        displayArticlesBySubCat(key);
    }, []);


    const displayArticlesBySubCat = (subCat) => {
        axios.get('http://localhost:5000/articles/category',{
            params : {category : 'skin', subCategory : subCat}
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
            <div id="banner" className="skinBanner">
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
                    defaultActiveKey={key}
                    onSelect={(k) => {setKey(k);displayArticlesBySubCat(k);}}
                    className="mb-3 tabsCustom"
                >
                    <Tab eventKey="all" title="Tout">
                        {dataArt.map((elt, index) => {
                            return(
                                <Row key={index} className="g-4" xs={1} md={4}>
                                    <Col xs={1} md={4} >
                                        <Card>
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
                                </Row>
                            );
                        })}
                    </Tab>
                    <Tab eventKey="skincare" title="Soin de la peau">
                        {dataArt.map((elt, index) => {
                            return(
                                <Row key={index} className="g-4" xs={1} md={4}>
                                    <Col xs={1} md={4}>
                                        <Card>
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
                                </Row>
                            );
                        })}
                    </Tab>
                    <Tab eventKey="oily" title="Peaux grasses">
                        {dataArt.map((elt, index) => {
                            return(
                                <Row key={index} className="g-4" xs={1} md={4}>
                                    <Col xs={1} md={4}>
                                        <Card>
                                            <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                            {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                            <Card.Body>
                                                <Card.Title>{elt.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                                <Card.Text>
                                                    {elt.description}
                                                </Card.Text>
                                                <Button variant="dark"onClick={() => handleGoArticle(elt._id)}>Lire la suite</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            );
                        })}
                    </Tab>
                    <Tab eventKey="dry" title="Peaux sèches">
                        {dataArt.map((elt, index) => {
                            return(
                                <Row key={index} className="g-4" xs={1} md={4}>
                                    <Col xs={1} md={4}>
                                        <Card>
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
                                </Row>
                            );
                        })}
                    </Tab>
                    <Tab eventKey="acne" title="Peaux acnéiques">
                        {dataArt.map((elt, index) => {
                            return(
                                <Row key={index} className="g-4" xs={1} md={4}>
                                    <Col xs={1} md={4}>
                                        <Card>
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
                                </Row>
                            );
                        })}
                    </Tab>
                    <Tab eventKey="more" title="Plus +">
                        {dataArt.map((elt, index) => {
                            return(
                                <Row key={index} className="g-4" xs={1} md={4}>
                                    <Col xs={1} md={4}>
                                        <Card>
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
                                </Row>
                            );
                        })}
                    </Tab>
                </Tabs>
            </div></>
    );
};