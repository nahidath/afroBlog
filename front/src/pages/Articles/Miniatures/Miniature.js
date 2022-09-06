import {Button, Card, Col, Dropdown, Row} from "react-bootstrap";
import {BsShareFill} from "react-icons/bs";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";


export default function Miniature (elt,idx){
    const history = useHistory();

    const handleGoArticle = (ia) => {
        history.push({ pathname:'/article/'+ ia});
    }
    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    return(
        <Row key={idx} className="g-4" xs={1} md={4}>
            <Col xs={1} md={4}>
                <Card className="artCard">
                    <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}} onClick={() => handleGoArticle(elt.elt._id)}/>
                    {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                    <Card.Body>
                        <Card.Title>{elt.elt.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{elt.elt.category} - {elt.elt.date}</Card.Subtitle>
                        <Card.Text>
                            {elt.elt.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Button variant="dark" onClick={() => handleGoArticle(elt.elt._id)}>Lire la suite</Button>
                <Dropdown className="dropdown-share"
                          show={show}
                          onMouseEnter={showDropdown}
                          onMouseLeave={hideDropdown}
                          drop="up"
                >
                    <Dropdown.Toggle>
                        <BsShareFill/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item><FacebookShareButton title={elt.elt.title} url={window.location.href + 'article/' + elt.elt._id}>
                            <FacebookIcon  size={25} round={true}/>
                        </FacebookShareButton></Dropdown.Item>
                        <Dropdown.Item><TwitterShareButton title={elt.elt.title} url={window.location.href + 'article/' + elt.elt._id}>
                            <TwitterIcon  size={25} round={true}/>
                        </TwitterShareButton></Dropdown.Item>
                        <Dropdown.Item><WhatsappShareButton title={elt.elt.title} url={window.location.href + 'article/' + elt.elt._id}>
                            <WhatsappIcon  size={25} round={true}/>
                        </WhatsappShareButton></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    )
}