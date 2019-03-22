import { h, Component } from 'splay'
export default class GameBoard extends Component {
  init () {
    this.grid = [
      Array(6).fill(null),
      Array(6).fill(null),
      Array(6).fill(null),
      Array(6).fill(null),
      Array(6).fill(null),
      Array(6).fill(null),
      Array(6).fill(null)
    ]
  }
  render () {
    return <div className='game-board'>
      {this.grid.map(column => <Column pieces={column} parent={this} />)}
    </div>
  }
}
class Column extends Component {
  init ({ pieces }) {
    this.pieces = pieces
  }
  render () {
    return <div className='game-board__column'>
      {this.pieces.map(piece => <div className={`game-board__piece ${piece
        ? 'game-board__piece--p1'
        : piece === false
          ? 'game-board__piece--p2'
          : ''
      }`}>
      </div>)}
    </div>
  }
}
