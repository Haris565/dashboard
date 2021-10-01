/* eslint-disable import/no-anonymous-default-export */
import {PROFILE_COMPLETE, PROFILE_ERROR} from "../actions/types";

const initialState = {
    profile:null,
    loading:true,
    error:null
}


export default function (state=initialState , action){
    const {type, payload} = action;
    console.log(action)

    switch(type){
        case PROFILE_COMPLETE:
            return{
                ...state,
                profile:payload,
                loading: false,
                error:null
                
            }
            
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error:payload
            }
            
        default:
            return state
    }
}