import React from 'react';

import {
    getArticle
} from '../../../articles';

import './ArticlesList.css';


export default function ArticlesList (props) {

    const article = getArticle(0);

    return (
        <div id='articlesList'>
            <h2>Liste des articles :</h2>

            <div className='article'>
                <img 
                    src={['/articles', article.id, article.image].join('/')}
                    alt="subArticle"  
                    className="articleImg" 
                />
                <div className="articleText">
                    <h4>
                        {article.title}
                    </h4>
                    <p>
                        {article.description}
                    </p>
                </div>
            </div>

            
        </div>
    );
};
