import Component from 'inferno-component';

export default class Header extends Component {

  render() {
    return (
        <div class="row">
            <div class="col s11">
                <h4>Photo Library</h4>
            </div>
            <div class="col s1">
                <a class="btn-floating btn-large waves-effect waves-light red" href="#modal1" onClick={console.log('fml')}>
                  <i class="material-icons">add</i>
                </a>
            </div>
        </div>
    )
  }

}