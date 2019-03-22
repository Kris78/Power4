import { h, Component } from 'splay'
import './style.less'
export default class GameBoard extends Component {
  init () {
    this.turn = true
    this.grid = [ // chaque ligne est colonne verticale
      Array(6).fill(null), // null = slot vide
      Array(6).fill(null),
      Array(6).fill(null),
      Array(6).fill(null),
      Array(6).fill(null),
      Array(6).fill(null),
      Array(6).fill(null)
    ]
    this.columns = []
    this.grid.forEach((column) => {
      const col = this.addChildComponent(new Column({
        board: this,
        pieces: column
      }))
      this.columns.push(col)
    })
  }
  render () {
    return <div className='game-board'>
      {this.columns.map(x => x.$el)}
    </div>
  }

  onKeyRight () {
    this.focus(this.current + 1)
  }
  onKeyLeft () {
    this.focus(this.current - 1)
  }
  onKeyUp () { }
  onKeyDown () { }
  didWin () {
    const has4consecutive = arr => {
      const str = arr.map(x => ({
        true: 'A',
        false: 'B',
        null: ' '
      })[x]).join('').trim()
      console.log(str)
      return str.includes('AAAA') || str.includes('BBBB')
    }
    const getLines = () => {
      const getLine = n => this.grid.map(col => col[n])
      const lignes = []
      for (let ligne = 0; ligne < 6; ++ligne) {
        lignes.push(getLine(ligne))
      }
      return lignes
    }
    const getRows = () => this.grid
    const lines = getLines()
    console.log('lines', lines)
    const rows = getRows()
    console.log('rows', rows)
    if (lines.some(has4consecutive) || rows.some(has4consecutive)) {
      return true
    }
    return false
  }
}
class Column extends Component {
  init ({ board, pieces }) {
    console.log('init with pieces ', pieces)
    this.pieces = pieces
    this.board = board
  }
  onKeyEnter () { // appui sur la touche entrée
    const board = this.board
    const column = board.grid[board.current]
    // on cherche le premier slot vide
    const slot = column.findIndex(x => x === null)
    // si pas trouvé donc coup invalide (colonne toute remplie par exemple)
    if (slot === -1) return
    column[slot] = board.turn
    board.$el.classList.toggle('j1')
    if (board.didWin()) {
      board.$el.classList.add('gameover')
      console.log('partie terminée')
      this.patch()
      return
    }
    board.turn = !board.turn
    this.patch()
  }
  render () {
    return <div className={`game-board__column`}>
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
