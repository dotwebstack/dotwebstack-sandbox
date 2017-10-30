import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const data = JSON.parse(document.getElementById('graph').innerHTML);

ReactDOM.render(
  <App data={data} />,
  document.getElementById('root'),
);
