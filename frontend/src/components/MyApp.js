import Component from 'inferno-component';

import Header from './Header';
import PageComponent from './PageComponent';
import PopupComponent from './PopupComponent';

export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  onChildChanged(newState) {
    this.setState({ counter: newState })
  }

  render() {
    return (
      <div class="row">
        <Header></Header>
        <PopupComponent callbackParent={(newState) => this.onChildChanged(newState)}></PopupComponent>
        <PageComponent></PageComponent>
      </div>
    )
  }

}