import Component from 'inferno-component';

import ImageView from './ImageView';

export default class ListImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      images: nextProps.images
    })
  }

  render() {
    var images = this.state.images;
    return (
      <div class="row">{
        images.map(function(image) {
          return <ImageView image={image}></ImageView>
        })
      }
      </div>
    );
      
  }

}