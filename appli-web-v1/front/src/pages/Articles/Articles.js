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
                Hair
           </div>
           <div className="textTitle">
               text blabla
           </div>
           <div className="tabFilter">
               <Tabs
                   id="controlled-tab-example"
                   activeKey={key}
                   onSelect={(k) => setKey(k)}
                   className="mb-3"
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
