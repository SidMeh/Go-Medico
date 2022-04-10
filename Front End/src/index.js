import React from 'react';
import ReactDOM from 'react-dom';
import Body from './Body';


function Hello(props) {



  return ( 
    <div>

      <Body/>
    </div>);
};

ReactDOM.render(<Hello/>, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. 
