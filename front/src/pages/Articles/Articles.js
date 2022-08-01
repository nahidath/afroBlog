import React from 'react';
import './Articles.css';
import Hair from "../Hair";
import Makeup from "../Makeup";
import Skin from "../Skin";




export default function Articles (props) {

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
};
