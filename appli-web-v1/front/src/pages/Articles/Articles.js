import React, {useState} from 'react';
import './Articles.css';
import {Button, Card, Col, Row, Tab, Tabs} from "react-bootstrap";

// import Filters from './Filters/Filters';
// import ArticlesList from './ArticlesList/ArticlesList';


export default function Articles (props) {
    
    // console.log(props.match.params.filters);
    const [key, setKey] = useState('all');

    return (
        // <div id='articles'>
        //     <Filters />
        //     <ArticlesList />
        // </div>
       <div className="pageSection">
           <div id="banner">
                <div id="textBanner">
                    <h1>Hair</h1>
                </div>
           </div>
           <div className="textTitle">
               We're here to help you in your good-hair journey—whatever that means to you.<br />
               Want tips on how to transition to natural hair? We got you.<br/>
               What about the best curling iron that’s actually worth your money?<br/>
               We asked the pros to share their favorites.<br />
               Whatever hair concern you have (or even if you’re just looking for some color/cut inspiration), you’ve come to the right place.
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
                           {Array.from({ length: 4 }).map((_, idx) => (
                               <Col>
                                   <Card style={{ width: '18rem' }}>
                                       <Card.Img variant="top" src="/love-test.png"/>
                                       {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                       <Card.Body>
                                           <Card.Title>hair article1</Card.Title>
                                           <Card.Subtitle className="mb-2 text-muted">Category - Date</Card.Subtitle>
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
           </div>
       </div>
    );
};
