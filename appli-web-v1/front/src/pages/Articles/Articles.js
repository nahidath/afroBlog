import React, {useState} from 'react';
import './Articles.css';
import {Button, Card, Col, Row, Tab, Tabs} from "react-bootstrap";
import Hair from "../Hair";
import Makeup from "../Makeup";
import Skin from "../Skin";

// import Filters from './Filters/Filters';
// import ArticlesList from './ArticlesList/ArticlesList';


export default function Articles (props) {
    
    console.log(props.match.params.filters);
    // console.log(props);

    // if(props == "cheveux") {
        return (
            <div className="pageSection">
                {
                    (props.match.params.filters === 'cheveux') ?
                        <>
                        <Hair />
                    </> : <></>
                }
                {
                    (props.match.params.filters === 'maquillage') ?
                        <>
                            <Makeup />
                        </> : <></>
                }
                {
                    (props.match.params.filters === 'peau') ?
                        <>
                            <Skin />
                        </> : <></>
                }
            </div>
        );
    // }else{
    //     <h1>page en cours</h1>
    // }
};
