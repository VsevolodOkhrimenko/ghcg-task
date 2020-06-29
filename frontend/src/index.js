import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import './index.scss'
import Root from './root'
import getCookie from './utils/CSRFToken';

const rootElement = document.getElementById('root');
getCookie("csrftoken");
ReactDOM.render(<Root />, rootElement);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').default
    ReactDOM.render(<NextRoot />, rootElement)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
