import Component from 'inferno-component';

import PageComponent from './PageComponent';

export default class MyApp extends Component {

  render() {
    return (
      <div>
        <h1>Photo Library</h1>
        <PageComponent></PageComponent>
      </div>
    )
  }

}