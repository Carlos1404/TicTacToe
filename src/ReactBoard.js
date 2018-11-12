import React from 'react';

const Cell = (props) => (
    <button className="square" onClick={props.onClick}>
        {props.value ? props.value : <span>&nbsp;</span>}
    </button>
)

const GameButtonParameters = (props) => (
    <div className="button">
        <button className="button" onClick={props.onReset}>
            Reset
        </button>
        <button className="button" onClick={props.onRedo}>
            Redo
        </button>
    </div>
)

const Score = (props) => (
    <div className="score">
        <div>
            Score Joueur 1 : {props.score1}
        </div>
        <div>
            Score Joueur 2 : {props.score2}
        </div>
    </div>
)

export { Cell, GameButtonParameters, Score};