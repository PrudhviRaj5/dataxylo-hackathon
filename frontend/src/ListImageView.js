import Component from 'inferno-component';

import ImageView from './ImageView';

export default class ListImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images
    }
  }
  
  render() {
    var images = this.state.images;
    images.map(function(image){
      return <ImageView data={image}></ImageView>
    });
  }

}