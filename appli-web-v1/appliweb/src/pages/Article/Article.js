import React from 'react';
import './Article.css';
import {
  getArticle
} from '../../articles';


export default function Article (props) {
    
    const article = getArticle(props.match.params.id);
    console.log(article)
    console.log(['./articles', article.id, article.image].join('/'))

    return (
        <div id='article'>
            <div className='articleDate'>{article.date}</div>
            <div className='articleTitle'>{article.title}</div>
            <img 
                src={['/articles', article.id, article.image].join('/')}
                alt="articleImage" 
                className='articleImage'/>
            <div className='articleImageDesc'>{article.image_desc}</div>
            <div className='articleContent'>{article.content}</div>
            <div className='articleAuthor'>{article.author}</div>
        </div>
    );
};
