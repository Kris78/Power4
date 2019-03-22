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
      {this.grid.map(column =>
        <Column pieces={column} parent={this}
          onKeyEnter={this.onKeyEnter.bind(this)}/>)}
    </div>
  }
  onKeyEnter () {
    console.log('onkeyenter sur GameBoard', this.current)
  }
  onKeyRight () {
    this.focus(this.current + 1)
  }
  onKeyLeft () {
    this.focus(this.current - 1)
  }
}
class Column extends Component {
  init ({ onKeyEnter, pieces }) {
    this.pieces = pieces
    this.onKeyEnter = onKeyEnter || (() => undefined)
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
  onKeyEnter () {
    console.log(this)
  }
}
