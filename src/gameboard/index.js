import { h, Component } from 'splay'
import './style.less'
export default class GameBoard extends Component {
  init () {
    this.turn = false
    this.grid = [ // chaque ligne est colonne verticale
      Array(6).fill(null), // null = slot vide
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
  onKeyEnter () { // appui sur la touche entrée
    console.log('before')
    console.log(JSON.parse(JSON.stringify(this.grid)))
    const column = this.grid[this.current]
    // on cherche le premier slot vide
    const slot = column.findIndex(x => x === null)
    // si pas trouvé donc coup invalide (colonne toute remplie par exemple)
    if (slot === -1) return
    column[slot] = this.turn
    this.turn = !this.turn
    this.patch()
    console.log('after')
    console.log(JSON.parse(JSON.stringify(this.grid)))
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
}
