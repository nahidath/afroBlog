import React, {useEffect, useState} from 'react';
import './Article.css';
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import {IconButton} from "@mui/material";
import { BsHeart } from "react-icons/bs";

export default function Article (props) {

    const [name,setName] = useState("");
    const [content, setContent] = useState("");
    const [commentArt, setCommentArt] = useState([]);
    const [numberOfComments, setNumberOfComments] = useState(0);
    const [favArt, setFavArt] = useState("");
    const [favArtList, setFavArtList] = useState([]);
    const [favColor, setFavColor] = useState("none");
    const [isFav, setisFav] = useState(false);


    const history = useHistory();
    const [dataArt, setDataArt] = useState({
        author: "",
        category : "",
        subCategory : "",
        title : "",
        date : "",
        imageDesc : "",
        content : ""
    });
    const [randArt, setRandArt] =  useState([]);
    useEffect(() => {
        getArticle();
        displayRandomArticle();
    }, []);

    useEffect(() =>{
        getCommentsArticle();
    }, [numberOfComments])


    const getArticle = () => {
        axios.get('http://localhost:5000/articles/article',{
            params : {_id : props.match.params.id}
        }).then((resp) => {
            const dA = resp.data.data;
            setDataArt(dA);
        }).catch((err) => {
            console.log(err);
        });
    }

    const displayRandomArticle = () => {
        axios.get('http://localhost:5000/articles/randoms').then((resp) => {
            const rA = resp.data.data;
            setRandArt(rA);
        }).catch((err) => {
            console.log(err);
        })
    }


    const postComment = (event) => {
        const getCurrentID = window.location.pathname.split('/');
        axios.post('http://localhost:5000/comments/add', {
            withCredentials: true,
            data: {
                author: name,
                commentDesc: content,
                articleID : getCurrentID[2]
            }
        }).then((res) =>{
            window.location.reload();
            setCommentArt(res.data.data);
            setNumberOfComments(numberOfComments +1)

        }).catch((err) => {
            console.log(err);
        })
    }

    const getCommentsArticle = () => {
        axios.get('http://localhost:5000/comments/allComments',{
            params : {articleID : props.match.params.id}
        }).then((resp) => {
            const cA = resp.data.data;
            setCommentArt(cA);
            const nb_cA = cA.length;
            setNumberOfComments(nb_cA);
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleGoArticle = (article_id) => {
        history.push({ pathname:'/article/' + article_id});
    }

    const handleFavAddClick = () => {
        if(!isFav){
            console.log("fav")
            // console.log("list before", favArtList)
            // setFavColor("red");
            // setFavArt(props.match.params.id);
            // console.log(favArt);s
            let favList = [...favArtList];
            favList.push(props.match.params.id);
            setFavArtList(favArt);
            // console.log("added");
            // console.log("list", favArtList)
        }
        setisFav(!isFav);
    }



    return (
        <>
        <div className='article'>
            <div className="articleHead">
                <div className='categoryArt'><a href="#">{dataArt.category}</a> > <a href="#">{dataArt.subCategory}</a></div>
                <div className='articleTitle'>{dataArt.title}</div>
                {/*<Button onClick={(e) => {setisFav(true); handleFavAddClick(e);}}><BsHeart/></Button>*/}
                <IconButton aria-label="heart"
                            onClick={handleFavAddClick}
                ><BsHeart color={isFav ? "red" : "black"}/></IconButton>
                <div className='articleDateInfo'>Ecrit par {dataArt.author} Publié le {dataArt.date}</div>
            </div>
            <div className='contentPart'>
                {/*<img*/}
                {/*    src={['/articles', article.id, article.image].join('/')}*/}
                {/*    alt="articleImage"*/}
                {/*    className='articleImage'/>*/}
                <div className='articleImageDesc'>{dataArt.image_desc}</div>
                <div className='articleContent'>{dataArt.content}</div>
            </div>
            <hr/>
            <div className='artDiscovery'>
                <span>VOUS POURRIEZ AUSSI AIMER</span>
                <div className='artList'>
                    {randArt.map((elt, index) =>
                            <Row key={index} className="g-4 miniature">
                                {Array.from({length: 1}).map((_, idx) => (
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
            <hr/>
            <div className="commentSection">
                <span>LAISSER UN COMMENTAIRE</span>
                <div className="zoneCom">
                    <label>Nom</label>
                    <input type="text" className="nameComment" name="name" onChange={(e) => setName(e.target.value)}/>
                    <label>Commentaire</label>
                    <textarea className="txtcomment" placeholder="Laisser un commentaire" name="content" onChange={(e) => setContent(e.target.value)}></textarea>
                    <Button variant="dark" className="btn-submitCom" onClick={postComment}>SOUMMETRE</Button>
                </div>

            </div>
            <div className="displayCommentsSection">
                <span className="numberOfComments">{numberOfComments} Commentaire(s)</span>
                <div className="allComments">
                    {commentArt.map((elt, index) =>
                        <div className="comment" key={index}>
                            <img id="userAvatar" src="/love-test.png"/>
                            <div className="userInfosComment">
                                <p id="styleUserName">{elt.author}</p>
                                <p id="dateCom">{elt.date}</p>
                                <p>{elt.commentDesc}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};
