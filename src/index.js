import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/config.css'

import {AuthProvider} from './utils/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<App/>
		</AuthProvider>
  	</React.StrictMode>,
	document.getElementById('root')
);
