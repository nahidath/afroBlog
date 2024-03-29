import React, {useCallback, useEffect, useState} from 'react';
import './Article.css';
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import {IconButton} from "@mui/material";
import { BsHeart } from "react-icons/bs";
import ShareButtons from "../../components/Share/ShareButtons";

axios.withCredentials = true;

export default function Article (props) {

    const history = useHistory();

    const [name,setName] = useState("");
    const [content, setContent] = useState("");
    const [commentArt, setCommentArt] = useState([]);
    const [isFav, setisFav] = useState(false);
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

    const getArticle = useCallback(() => {
        axios.get('http://localhost:5000/articles/article',{
            params : {_id : props.match.params.id}
        }).then((resp) => {
            const dA = resp.data.data;
            setDataArt(dA);
        }).catch((err) => {
            console.log(err);
        });
    }, [props.match.params.id]);

    const getCommentsArticle = useCallback(() => {
        axios.get('http://localhost:5000/comments/allComments',{
            params : {articleID : props.match.params.id}
        }).then((resp) => {
            setCommentArt(resp.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [props.match.params.id]);
    
    useEffect(() => {
        getArticle();
        displayRandomArticle();
        getCommentsArticle();
    }, [getArticle, getCommentsArticle]);

    useEffect(() => {
        if (props.user.favArtList) {
            setisFav(props.user.favArtList.includes(props.match.params.id))
        }
    }, [props.user, props.match.params.id]);

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
            let listComment  = [...commentArt];
            listComment.push(res.data.data)
            setCommentArt(listComment);
            event.target.reset();

        }).catch((err) => {
            console.log(err);
        })
    }

    const handleGoArticle = (article_id) => {
        history.push({ pathname:'/article/' + article_id});
    }

    const handleFavAddClick = () => {
        let action = !isFav ? "add" : "delete";
        axios.post('http://localhost:5000/user/updateFavArticles', {
            action: action,
            articleID : props.match.params.id
        }).then((res) => {
            if (res.data.status === "success") {
                let userInfos = {...props.user};
                if (action === "delete") {
                    let index = userInfos.favArtList.indexOf(props.match.params.id);
                    if (index > -1) {
                        userInfos.favArtList.splice(index, 1);
                    }
                } else {
                    userInfos.favArtList.push(props.match.params.id);
                }
                props.setUser(userInfos);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const favColorTheme = () => {
        const storedTheme = localStorage.getItem("theme");
        if(storedTheme === "dark"){
            return "white";
        }
        return "black";
    }

    return (
        <>
        <div className='article'>
            <div className="articleHead">
                <div className='categoryArt'><a href="#">{dataArt.category}</a> > <a href="#">{dataArt.subCategory}</a></div>
                <div className='articleTitle'>{dataArt.title}</div>
                <div className="heartFavIcon" >
                    <IconButton aria-label="heart" onClick={handleFavAddClick} ><BsHeart className="heartIcon" color={isFav ? "red" : favColorTheme()} /></IconButton>
                </div>

                <div className='articleDateInfo'>Ecrit par {dataArt.author} Publié le {dataArt.date}</div>
                <div>
                    <ShareButtons title={dataArt.title} url={window.location.href} size={40}/>
                </div>
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
                            <Row key={index} className="g-4 miniature" xs={1} md={4}>
                                <Col xs={1} md={4}>
                                    <Card style={{width: '210px', height:'350px'}}>
                                        <Card.Img variant="top" src="/love-test.png" style={{height:'210px'}}/>
                                        {/*<Card.Img variant="top" src={['./articles', props.article.id, props.article.image].join('/')} />*/}
                                        <Card.Body>
                                            <Card.Title><a href={elt._id} onClick={() => handleGoArticle(elt._id)}>{elt.title}</a></Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{elt.category} - {elt.date}</Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                    )}
                </div>
            </div>
            <hr/>
            <div className="commentSection">
                <span>LAISSER UN COMMENTAIRE</span>
                <form onSubmit={postComment}>
                    <div className="zoneCom">
                        <label>Nom</label>
                        <input type="text" className="nameComment" name="name" onChange={(e) => setName(e.target.value)}/>
                        <label>Commentaire</label>
                        <textarea className="txtcomment" placeholder="Laisser un commentaire" name="content" onChange={(e) => setContent(e.target.value)}></textarea>
                        <Button variant="dark" className="btn-submitCom" type="submit" >SOUMMETRE</Button>
                    </div>
                </form>


            </div>
            <div className="displayCommentsSection">
                <span className="numberOfComments">{commentArt.length} Commentaire(s)</span>
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
