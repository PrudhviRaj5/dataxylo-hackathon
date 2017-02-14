import Component from 'inferno-component';
import axios from 'axios';

export default class PopupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  postImg(imgURL, title) {
    var self = this;
    var url = 'http://139.59.216.131/dataxylo/api/post_img';
    axios({
      method: 'POST',
      url: url,
      data: {
        title: title,
        imgURL: imgURL
      }
    }).then(function(response) {
      var newState = self.state.counter + 1;
      self.props.callbackParent(newState);
      alert('Successfully Posted!');
      self.setState({images: response.data});
    }).catch(function(error) {
      console.log("failed to load data");
    });
  }

  handleSubmit() {
    var self = this;
    var description = document.getElementById('description').value;
    var image_url = $("#image_url")[0].value;
    var img = $("#image_file")[0].files[0];
    if (!description) {
      alert('Please Input something in the text field for image');
      return null;
    }
    if (img) {
      var form = new FormData();
      form.append("file", img);
      var url = 'http://139.59.216.131/dataxylo/api/set_img_and_get_url';
      axios({
        async: true,
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: form
      }).then(function(response) {
        var rec_url = response.data;
        self.postImg(rec_url, description);
      }).catch(function(error) {
        console.log("failed to load data");
      });
    } else if (image_url) {
      axios({
        method: 'GET',
        url: image_url,
      }).then(function(response) {
        self.postImg(image_url, description);
      }).catch(function(error) {
        console.log("failed to load data");
        alert('Please Input valid image url');
        return null;
      });
    } else {
      alert('Please Give Image url or upload an image!');
      return null;
    }
  }
  
  render() {
    var self = this;
    return (
      <div class="modal fade" id="myPopup" role="dialog" style={{zIndex:50}}>
        <div class="modal-dialog">
        
          <div class="modal-content">
            <div class="modal-header col s12">
              <div class="col s11">
                <h4 class="modal-title">Add Photo</h4>
              </div>
              <div class="dismiss-button col s1">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
            </div>
            <div class="modal-body col s12">
              <div class="file-button col s6">
                <div class="file-field input-field">
                  <div class="btn">
                    <span>File</span>
                    <input type="file" id="image_file" accept="image/x-png,image/jpeg" name="upload"></input>
                  </div>
                  <div class="file-path-wrapper col s8">
                    <input class="file-path validate" type="text"></input>
                  </div>
                </div>
              </div>
              <div class="url-input col s6">
                <label for="image_url">Enter url of image</label>
                <input id="image_url" type="text" class="validate"></input>
              </div>
            </div>
            <form onSubmit={(e) => {e.preventDefault(); self.handleSubmit()}} class="col s12">
              <div class="image-description">
                <label for="description">Type Something, Hit enter</label>
                <input id="description" type="text" class="validate"></input>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    )
  }

}