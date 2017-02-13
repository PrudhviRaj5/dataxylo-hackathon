import Component from 'inferno-component';

import Header from './Header';
import PageComponent from './PageComponent';
import PopupComponent from './PopupComponent';

export default class MyApp extends Component {

  render() {
    return (
      <div class="row">
        <Header></Header>
        <PopupComponent></PopupComponent>
        <PageComponent></PageComponent>
      </div>
    )
  }

}