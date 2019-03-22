import { Router, Component, h } from 'splay'
import './error.less'

export default class Error extends Component {
  init ({ postData: { message = 'Erreur inconnue 😭' } }) {
    this.message = message
  }
  render () {
    return <div className='error'>
      <h1 className='error__heading'>Erreur ⛔</h1>
      <p className='error__message'>{this.message}</p>
      <div className='error__button'>Retour</div>
    </div>
  }
  onKeyEnter () {
    Router.back()
  }
}
