import { h, Component } from 'splay'
export default class Menu extends Component {
  init () {

  }
  render () {
    return <nav className='menu'>
      <button className='menu__item'>Nouvelle partie</button>
      <button className='menu__item'>Sauvegarder</button>
      <button className='menu__item'>Reprendre ancienne partie</button>
    </nav>
  }
}
