import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR , LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from './types';
import setAuthToken from '../../util/setAuthToken';










export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        if(localStorage.token){
            const res = await axios.get("http://localhost:5000/api/salon");
            dispatch({
                type:USER_LOADED,
                payload:res.data
            }) 
        }
  
    }
    catch(err){
        dispatch({
            type:AUTH_ERROR
        })
    }

}


export const register =(email, password )=> async dispatch=>{

    const user= {
        
        email,
        password
   }
   console.log(user)
    axios.request({
        method: 'POST',
        url: `http://localhost:5000/api/salon/signup`,
        data:user
      
      }).then((res)=>{ 
          console.log(res);
          dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data
          }) 
          dispatch( loadUser());
        console.log("api call sucessfull",res.data.token);
      
      }).catch((err)=>{
          const error = err.response.data.errors
          console.log(error)
          dispatch({
              type: REGISTER_FAIL,
              payload: err.response.data.errors
          })
        console.log("api call unsucessfull",err);
      
        
      })
    
} 




export const login =(email, password)=> async dispatch=>{

    const user ={email,password}

    axios.request({
        method: 'POST',
        url: `http://localhost:5000/api/salon/login`,
        data:user
      
      }).then((res)=>{ 
          console.log(res);
          dispatch({
              type:LOGIN_SUCCESS,
              payload: res.data
          })
          dispatch( loadUser());
        console.log("api call sucessfull",res.data.token);
      
      }).catch((err)=>{
        // const error = err.response.data.error
        console.log(err)
          dispatch({
         
              type: LOGIN_FAIL,
              payload: "error"
          })
        // console.log("api call unsucessfull",err);
      
        
      })
} 


export const logout  = () => async dispatch =>{
    dispatch({
        type:LOGOUT
    })
}



