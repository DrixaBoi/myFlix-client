import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

//statement indicating that you need to bundle './index.scss'
import './index.scss';

//main component
class MyFlixApplication extends React.Compenent {
  render() {
    return (
      <MainView />
    );
  }
}

//finds the root of your app
const container = document.getElementByClassName('app-container')[0];

//tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
