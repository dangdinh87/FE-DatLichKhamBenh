import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './app/store';
import reportWebVitals from './reportWebVitals';
import './scss/custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/animate.min.css';
// import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
// import './assets/css/demo.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
