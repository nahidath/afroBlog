import React from 'react';
import { useHistory } from 'react-router-dom';

import {
    getArticles
} from '../../../articles';

import './ArticlesList.css';


export default function ArticlesList (props) {

    const history = useHistory();
    const articles = getArticles();
    
    const handleGoArticle = (pId) => {
        history.push({ pathname:'/article/' + props.article.id});
    }

    return (
        <div id='articlesList'>
            <h2>Liste des articles :</h2>

            {
                articles.map((article, index) => 
                    <div className='article' key={index}>
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
                            <h5 onClick={() => handleGoArticle(article.id)}>Lire la suite</h5>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
