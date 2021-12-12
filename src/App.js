import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Salon from './pages/Salon';
import Reset from './pages/Reset';
import setAuthToken from './util/setAuthToken';
import Forget from './pages/Forget';
import Messages from "./pages/Chat"
import {  Switch, Route } from "react-router-dom";

import {loadUser} from "./redux/actions/auth"
import AcceptedTable from "./pages/AcceptedTable";
import ProtectedRoute from './util/ProtectedRoute';
import Pakage from './pages/Pakage';
import Payment from "./pages/Payment"
import Success from './pages/Success';






if(localStorage.token){
    setAuthToken(localStorage.token)
    
    
  }



function App() {
    
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(loadUser())
    })

    return (
      
        <Switch>

            <ProtectedRoute path="/" exact component={Home}  />

   
            <Route path="/login" exact> 
                <Login />  
            </Route>
            <Route path="/signup" > 
                <Signup />
            </Route>
       
            <Route path="/forgot"> 
                <Forget />
            </Route>
          
            <Route path="/reset/:token"> 
                <Reset  />
            </Route>
            

            <Route path="/profile"> 
                <Profile />
            </Route>

            <Route path="/messages"> 
                <Messages />
            </Route>

            <Route path="/userProfile"> 
                <Salon />
            </Route>

            <Route path="/allAppointments"> 
                <Appointments />
                {/* <AcceptedTable /> */}
            </Route>

            <Route path="/accepted"> 
            <AcceptedTable />
            </Route>

            <Route path="/package"> 
                <Pakage />
            </Route>

        
            <ProtectedRoute path="/pricing" exact component={Payment}  />
            <Route path="/success"   component={Success}  />
         
          
          
        </Switch>
   
   
  );
}

export default App;
