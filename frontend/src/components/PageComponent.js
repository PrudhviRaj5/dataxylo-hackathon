import Component from 'inferno-component';
import axios from 'axios';

import PopupComponent from './PopupComponent';
import ListImageView from './ListImageView';

export default class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    var self = this;
    var url = 'http://139.59.216.131/dataxylo/api/fetch_all';
    axios({
      method: 'GET',
      url: url,
    }).then(function(response) {
      self.setState({images: response.data})
    }).catch(function(error) {
      console.log("failed to load data");
    });
  }

  componentDidUpdate() {
    var url = '';
    axios({
      method: 'GET',
      url: url,
    }).then(function(response) {
      console.log('response', response);
    }).catch(function(error) {
      console.log("failed to load data");
    });
  }

  render() {
    return (
      <div class="row">
        <form onSubmit="findImages(this); return false" class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <label for="search_field">Search</label>
              <input id="search_field" type="text" class="validate"></input>
            </div>
          </div>
        </form>
        <ListImageView images={ this.state.images }></ListImageView>
      </div>
    )
  }
}
