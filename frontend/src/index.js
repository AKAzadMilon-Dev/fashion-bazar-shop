import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import {StoreProvider} from './Store'

ReactDOM.render( <StoreProvider><HelmetProvider><App /></HelmetProvider></StoreProvider> ,document.getElementById('root'));

