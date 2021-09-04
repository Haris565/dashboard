import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Appointments from "./Appointments";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Salon from "./Salon";
import Signup from "./Signup"

function Main() {

    const user = useSelector(state => state.auth.user)
    return (
        // <Router>
        //     <Switch>
        //         { !user ?
        //             <Route exact path="/">
        //                   <Login />
        //             </Route> : 
        //            !user.profileComplete ?    
        //                 <Route path="/profile">
        //                     <Profile />
        //                 </Route> :
        //                 <Route path="/home">
        //                     <Home />
        //                 </Route>
        //         }
                   
               
          
        
        //     </Switch>
        // </Router>
        <Profile />
    )
}

export default Main
