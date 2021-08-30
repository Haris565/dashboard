import logo from './logo.svg';
import './App.css';
import "filepond/dist/filepond.min.css";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Salon from './pages/Salon';
import Reset from './pages/Reset';

import {Provider} from 'react-redux';
import store from "./redux/store"
import setAuthToken from './util/setAuthToken';
import Main from './pages/Main';


if(localStorage.token){
  setAuthToken(localStorage.token)
}



function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

export default App;
