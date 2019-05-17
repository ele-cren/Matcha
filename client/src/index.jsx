import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import Radium from 'radium'

render(<Provider store={ store }><Radium.StyleRoot><App /></Radium.StyleRoot></Provider>, document.getElementById('app'))