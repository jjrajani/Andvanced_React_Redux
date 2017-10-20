import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import requireAuth from './components/hoc/requireAuth';
import Feature from './components/feature';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: AUTH_USER });
}
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Welcome} />
                <Route path="signin" component={Signin} />
                <Route path="signup" component={Signup} />
                <Route path="signout" component={Signout} />
                <Route path="feature" component={requireAuth(Feature)} />
            </Route>
        </Router>
    </Provider>,
    document.querySelector('.container')
);
