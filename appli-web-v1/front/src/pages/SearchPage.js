import {Card, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

export default function SearchPage (props){

    const history = useHistory();

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');

    const handleGoArticle = (article_id) => {
        history.push({ pathname:'/article/' + article_id});
    }

    const [results, setResults] = useState([]);

    useEffect(() => {
        getSearch();
    }, [query]);


    const getSearch = () => {
        axios.get('http://localhost:5000/articles/search',{
            params : {searchText : query}
        }).then((resp) => {
            setResults(resp.data.data);
            console.log(resp.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="search-page">
            <span>Résultats de la recherche <i>{query}</i> </span>
            <div className="searchList">
                {results.map((elt, index) =>
                    <Row key={index} className="g-4 miniature">
                        {Array.from({length: results.length}).map((_, idx) => (
                            <Col key={idx}>
                                <Card style={{width: '210px', height:'350px'}}>
                                    <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                    {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                    <Card.Body>
                                        <Card.Title><a href={elt._id} onClick={() => handleGoArticle(elt._id)}>{elt.title}</a></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    )

}