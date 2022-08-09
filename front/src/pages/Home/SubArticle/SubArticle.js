import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {BsShareFill} from 'react-icons/bs';
import './SubArticle.css';
import {Button, Card, Col, Dropdown, Row} from "react-bootstrap";
import {
    FacebookIcon,
    FacebookShareButton, InstapaperIcon,
    InstapaperShareButton, TwitterIcon,
    TwitterShareButton, WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import ShareButtons from "../../../components/Share/ShareButtons";


export default function SubArticle (props) {

    const history = useHistory();

    const handleGoArticle = () => {
        history.push({ pathname:'/article/' + props.article._id});
    }

    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
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
                        <Col>
                            <Card className="displaySubArt">
                                {/*<div>*/}
                                {/*    <FacebookShareButton size={15} round={true} />*/}
                                {/*    <InstapaperShareButton size={15} round={true} />*/}
                                {/*    <TwitterShareButton size={15} round={true} />*/}
                                {/*    <WhatsappShareButton size={15} round={true} />*/}
                                {/*</div>*/}
                                <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}} />
                                <Card.Body>
                                    <Card.Title>{props.article.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{props.article.category} - {props.article.date}</Card.Subtitle>
                                    <Card.Text>
                                        {props.article.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Button variant="dark" onClick={handleGoArticle}>Lire la suite</Button>
                            <Dropdown className="dropdown-share"
                                      show={show}
                                      onMouseEnter={showDropdown}
                                      onMouseLeave={hideDropdown}
                            >
                                <Dropdown.Toggle >
                                    <BsShareFill/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item><FacebookShareButton title={props.article.title} url={window.location.href + 'article/' + props.article._id}>
                                        <FacebookIcon  size={32} round={true}/>
                                    </FacebookShareButton></Dropdown.Item>
                                    <Dropdown.Item><TwitterShareButton title={props.article.title} url={window.location.href + 'article/' + props.article._id}>
                                        <TwitterIcon  size={32} round={true}/>
                                    </TwitterShareButton></Dropdown.Item>
                                    <Dropdown.Item><WhatsappShareButton title={props.article.title} url={window.location.href + 'article/' + props.article._id}>
                                        <WhatsappIcon  size={32} round={true}/>
                                    </WhatsappShareButton></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>
                </Row>
            </div>
            
        </div>
    );
};
