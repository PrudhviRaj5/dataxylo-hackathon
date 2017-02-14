import Component from 'inferno-component';

export default class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.image.id,
      title: props.image.title,
      imgURL: props.image.imgURL
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.image.id,
      title: nextProps.image.title,
      imgURL: nextProps.image.imgURL
    })
  }
  
  render() {
    return (
      <div class="col s4">
         <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-image">
                <img src={ this.state.imgURL }></img>
              </div>
              <div class="card-content">
                <p>{ this.state.title }</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}