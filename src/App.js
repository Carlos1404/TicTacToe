import React, { Component } from 'react';
import './App.css';

import {Cell, GameButtonParameters, Score} from "./ReactBoard";

class App extends Component {

    state = {
        playerTurn: true,
        winner: null,
        board: Array(9).fill(null),
        lastClick: null,
        score1: 0,
        score2: 0
    }

    play = (i) => () => {
        this.setState(state => {
            const board = state.board.slice();
            if (this.calculateWinner(board) || board[i]) {
                return;
            }
            board[i] = state.playerTurn ? 'X' : 'O';
            const winner = this.calculateWinner(board)
            return {
                board: board,
                playerTurn: !state.playerTurn,
                winner: winner,
                score1: state.playerTurn && winner ? state.score1 + 1 : state.score1, //à optimiser
                score2: !state.playerTurn && winner ? state.score2 + 1 : state.score2, //à optimiser
                lastClick: i
            }
        });
    }

    reset = () => {
        this.setState({
            playerTurn: true,
            winner: null,
            board: Array(9).fill(null)
        });
    }

    redo = () => {
        this.setState( state => {
            const board = state.board.slice();
            if (this.calculateWinner(board)) {
                return;
            }
            if(board[state.lastClick] != null) {
                board[state.lastClick] = null
                return {
                    playerTurn: !state.playerTurn,
                    board: board,
                    lastClick: null
                }
            }
        });
    }

  render() {
      let status;
      if (this.state.winner) {
          status = 'The winner is ' + this.state.winner + ' !';
      } else {
          status = 'Next player: ' + (this.state.playerTurn ? 'X' : 'O');
      }

    return (
      <div className="Board">
          <div className="Title">Tic Tac Toe</div>
          <Score score1={this.state.score1} score2={this.state.score2}/>
          <div className="board-row">
              <Cell onClick={this.play(0)} value={this.state.board[0]} />
              <Cell onClick={this.play(1)} value={this.state.board[1]} />
              <Cell onClick={this.play(2)} value={this.state.board[2]} />
          </div>
          <div className="board-row">
              <Cell onClick={this.play(3)} value={this.state.board[3]} />
              <Cell onClick={this.play(4)} value={this.state.board[4]} />
              <Cell onClick={this.play(5)} value={this.state.board[5]} />
          </div>
          <div className="board-row">
              <Cell onClick={this.play(6)} value={this.state.board[6]} />
              <Cell onClick={this.play(7)} value={this.state.board[7]} />
              <Cell onClick={this.play(8)} value={this.state.board[8]} />
          </div>
          <div className="status">{status}</div>
          <GameButtonParameters onReset={this.reset} onRedo={this.redo}/>
      </div>
    );
  }

    calculateWinner(board) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }
}

export default App;
