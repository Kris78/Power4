import { h, Component } from 'splay'
import './style.less'
export default class Menu extends Component {
  init () {
  }
  render () {
    return <nav className='menu'>
      <button className={`menu__item ${this.focusableClass}`}>
        Nouvelle partie</button>
      <button className={`menu__item ${this.focusableClass}`}>
        Sauvegarder</button>
      <button className={`menu__item ${this.focusableClass}`}>
        Reprendre ancienne partie</button>
    </nav>
  }
  onKeyDown () {
    this.focus(this.current + 1)
  }
  onKeyUp () {
    this.focus(this.current - 1)
  }
}
