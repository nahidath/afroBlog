import React from 'react';
import './Articles.css';
import Hair from "../Sections/Hair";
import Makeup from "../Sections/Makeup";
import Skin from "../Sections/Skin";




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
