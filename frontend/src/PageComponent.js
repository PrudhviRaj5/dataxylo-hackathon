import Component from 'inferno-component';

import PopupComponent from './PopupComponent';

export default class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <input type="text"></input>
        <button type="button" class="btn" data-toggle="modal" data-target="#myModal">Add Picture</button>

        <PopupComponent></PopupComponent>

      </div>
    )
  }
}
