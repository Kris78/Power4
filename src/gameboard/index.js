import { h, Component } from 'splay'
export default class GameBoard extends Component {
  init () {
    this.grid = [
      Array(7).fill(null),
      Array(7).fill(null),
      Array(7).fill(null),
      Array(7).fill(null),
      Array(7).fill(null),
      Array(7).fill(null)
    ]
  }
  render () {
    return <div class='game-board'>
      {this.grid.map(ligne =>
        <div className='game-board__row'>
          {ligne.map(pawn => <div className={`game-board__pawn ${pawn
            ? 'game-board__pawn--p1'
            : pawn === false ? 'game-board__pawn--p2' : ''}`}>
          </div>)}
        </div>)}
    </div>
  }
}
