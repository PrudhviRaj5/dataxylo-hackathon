import Component from 'inferno-component';

export default class Header extends Component {

  render() {
    return (
        <div class="row">
            <div class="col s11">
                <h4>Photo Library</h4>
            </div>
            <div class="col s1">
                <a class="modal-trigger btn-floating btn-large waves-effect waves-light red" data-toggle="modal" data-target="#myPopup">
                  <i class="material-icons">add</i>
                </a>
            </div>
        </div>
    )
  }

}