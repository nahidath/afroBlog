import React from 'react';

import './MainArticle.css';


export default function MainArticle () {
    return (
        <div id='mainArticle'>
            <img 
                src='./articles/1/nature.jpg' 
                alt="mainArticle"  
                className="mainArticleImg" 
            />
            <div className="mainArticleText">
                <h2>
                    Main Article
                </h2>
                <h4>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                    standard dummy text ever since the 1500s, when an unknown printer took a galley 
                    of type and scrambled it to make a type specimen book.
                </h4>
            </div>
            
        </div>
    );
};
