import React from 'react';
import './Article.css';
import {
  getArticle
} from '../../articles';


export default function Article (props) {
    
    const article = getArticle(props.match.params.id);
    
    return (
        <div className='article'>
            <div className="articleHead">
                <div className='categoryArt'>Category</div>
                <div className='articleTitle'>{article.title}</div>
                <div className='articleDateInfo'>Ecrit par {article.author}. Publié le {article.date}</div>
            </div>
            <img
                src={['/articles', article.id, article.image].join('/')}
                alt="articleImage"
                className='articleImage'/>
            {/*<div className='articleImageDesc'>{article.image_desc}</div>*/}
            <div className='articleContent'>{article.content}</div>
        </div>
    );
};
