import axios from 'axios';
import {PROFILE_COMPLETE, PROFILE_ERROR, PROFILE_ATTEMPT, } from './types';
import { loadUser } from './auth';





export const profileComplete = (profile) => async dispatch => {
    const user = profile
    dispatch({
      type:PROFILE_ATTEMPT
    })
    axios.request({
        method: 'POST',
        url: `http://localhost:5000/api/salon/setProfile`,
        data: user
      
      }).then((res)=>{ 
          console.log(res);
          dispatch({
              type:PROFILE_COMPLETE,
              payload: res.data
          })
        console.log("api call sucessfull",res.data);
        dispatch( loadUser());
      
      }).catch((err)=>{
        console.log(err)
          dispatch({
         
              type: PROFILE_ERROR,
              payload: err
          })
        console.log("api call unsucessfull",err);
      
        
      })
}