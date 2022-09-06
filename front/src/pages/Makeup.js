import { Tab, Tabs} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import './Makeup.css';
import axios from "axios";

import Miniature from "./Articles/Miniatures/Miniature";

export default function Makeup(){
    const [key, setKey] = useState('all');

    const [dataArt, setDataArt] = useState([]);
    useEffect(() => {
        displayArticlesBySubCat(key);
    }, []);


    const displayArticlesBySubCat = (subCat) => {
        axios.get('http://localhost:5000/articles/category',{
            params : {category : 'makeup', subCategory : subCat}
        }).then(resp => {
            const dA = resp.data.data;
            setDataArt(dA);
        }).catch((err) => {
            console.log(err);
        });

    };

    return (
        <>
            <div id="banner" className="makeupBanner">
                <div id="textBanner">
                    <h1>Makeup</h1>
                </div>
            </div>
            <div className="textTitle">
                Makeup lovers, you've come to the right place. Here you'll find the hottest makeup trends from the runways (and Instagram), breakdowns of red carpet looks begging to be your Friday night makeup inspo, plus makeup tips and tricks from the world's biggest makeup artists.
            </div>
            <div className="tabFilter">
                <Tabs
                    id="controlled-tab-example"
                    defaultActiveKey={key}
                    onSelect={(k) => {setKey(k);displayArticlesBySubCat(k);}}
                    className="mb-3 tabsCustom"
                >
                    <Tab eventKey="all" title="Tout">
                        {dataArt.map((elt, index) =>
                            <Miniature elt={elt} idx={index}/>
                        )}
                    </Tab>
                    <Tab eventKey="face" title="Teint">
                        {dataArt.map((elt, index) =>
                            <Miniature elt={elt} idx={index}/>
                        )}
                    </Tab>
                    <Tab eventKey="eyes" title="Yeux">
                        {dataArt.map((elt, index) =>
                            <Miniature elt={elt} idx={index}/>
                        )}
                    </Tab>
                    <Tab eventKey="lips" title="Lèvres">
                        {dataArt.map((elt, index) =>
                            <Miniature elt={elt} idx={index}/>
                        )}
                    </Tab>
                    <Tab eventKey="brows" title="Sourcils">
                        {dataArt.map((elt, index) =>
                            <Miniature elt={elt} idx={index}/>
                        )}
                    </Tab>
                </Tabs>
            </div></>
    );
};