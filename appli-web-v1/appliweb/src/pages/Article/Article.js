import React from 'react';

import './Article.css';


export default function Article (props) {

    return (
        <div id='article'>
            Article n°{props.match.params.id}
        </div>
    );
};
