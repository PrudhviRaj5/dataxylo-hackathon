// inferno module
import {render} from 'inferno';

// routing modules
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// app components
import MyApp from './components/MyApp';

if (module.hot) {
    require('inferno-devtools');
}

const browserHistory = createBrowserHistory();

const routes = (
    <Router history={ browserHistory }>
        <Route component={ MyApp }>
        </Route>
    </Router>
);

render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}

