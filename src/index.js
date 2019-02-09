import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
// deprecated!! import { ConnectedRouter } from 'react-router-redux';

import './index.css';
import App from './App';
import { register } from './serviceWorker';

import {store, history} from "./redux/store";
import { SET_USER } from './redux/actions/actions';

/*===========================================================*/
/* localStorage.Auth is set in the login action */
if( localStorage.Auth ) {
    const user = JSON.parse(localStorage.Auth);

    // update localstorage
    store.dispatch({type: SET_USER, user: user});

    // getUser(user._id, false).then((res)=>{
    //     store.dispatch({type: SET_USER, user: res})
    // });
}

/*============================================================*/
ReactDOM.render(

  <Provider store={store}>
    <ConnectedRouter history={history} >
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </ConnectedRouter>

  </Provider>

  , document.getElementById('root')

); //end ReactDOM.render


register();
