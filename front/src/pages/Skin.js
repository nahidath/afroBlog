import {Tab, Tabs} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import './Skin.css';
import axios from "axios";
import Miniature from "./Articles/Miniatures/Miniature";

export default function Skin(){
    const [key, setKey] = useState('all');

    const [dataArt, setDataArt] = useState([]);
    useEffect(() => {
        displayArticlesBySubCat(key);
    }, []);


    const displayArticlesBySubCat = (subCat) => {
        axios.get('http://localhost:5000/articles/category',{
            params : {category : 'skin', subCategory : subCat}
        }).then(resp => {
            const dA = resp.data.data;
            setDataArt(dA);
        }).catch((err) => {
            console.log(err);
        });

    };

    return (
        <>
            <div id="banner" className="skinBanner">
                <div id="textBanner">
                    <h1>Skin</h1>
                </div>
            </div>
            <div className="textTitle">
                We know skincare isn't one-size-fits-all. That's why we've tapped the top dermatologists, estheticians and skincare experts to share right products you should be using for your skin type. From reviews to treatments, consider this section to help you achieve your glowy-skin goals.
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
                    <Tab eventKey="skincare" title="Soin de la peau">
                        {dataArt.map((elt, index) =>
                            <Miniature elt={elt} idx={index}/>
                        )}
                    </Tab>
                    <Tab eventKey="oily" title="Peaux grasses">
                        {dataArt.map((elt, index) =>
                            <Miniature elt={elt} idx={index}/>
                        )}
                    </Tab>
                    <Tab eventKey="dry" title="Peaux sèches">
                        {dataArt.map((elt, index) =>
                            <Miniature elt={elt} idx={index}/>
                        )}
                    </Tab>
                    <Tab eventKey="acne" title="Peaux acnéiques">
                        {dataArt.map((elt, index) =>
                            <Miniature elt={elt} idx={index}/>
                        )}
                    </Tab>
                    <Tab eventKey="more" title="Plus +">
                        {dataArt.map((elt, index) =>
                            <Miniature elt={elt} idx={index}/>
                        )}
                    </Tab>
                </Tabs>
            </div></>
    );
};