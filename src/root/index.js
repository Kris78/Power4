import './style.less'
import Menu from '../menu'
import GameBoard from '../gameboard'
import { h, Component } from 'splay'
export default class Root extends Component {
  onKeyDown () {
    this.focus(this.current + 1)
  }
  onKeyUp () {
    this.focus(this.current - 1)
  }
  render () {
    return <div className='root'>
      <aside><Menu ref='menu' parent={this} /></aside>
      <div><GameBoard ref='gameboard' parent={this} /></div>
      <aside><img /></aside>
    </div>
  }
  mounted () {
    this.focusComponent(this.refs.gameboard)
  }
  onKeyMenu () {
    this.focusComponent(this.refs.menu)
  }
}
