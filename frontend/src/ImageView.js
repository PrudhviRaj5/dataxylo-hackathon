import Component from 'inferno-component';

export default class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      title: props.data.title,
      imgURL: props.data.imgURL
    }
  }
  
  render() {
    return (
      <div>
        <p>{ this.state.id }</p>
        <p>{ this.state.title }</p>
        <p>{ this.state.imgURL }</p>
      </div>
    )
  }

}