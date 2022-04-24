import React from 'react';
import './Articles.css';

import Filters from './Filters/Filters';
import ArticlesList from './ArticlesList/ArticlesList';


export default function Articles (props) {
    
    console.log(props.match.params.filters);

    return (
        <div id='articles'>
            <Filters />
            <ArticlesList />
        </div>
    );
};
