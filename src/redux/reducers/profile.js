/* eslint-disable import/no-anonymous-default-export */
import {PROFILE_COMPLETE, PROFILE_ERROR, PROFILE_ATTEMPT} from "../actions/types";

const initialState = {
    profile:null,
    loading:false,
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
        case PROFILE_ATTEMPT:{
            return {
                ...state,
                loading:true

            }
        }
            
        default:
            return state
    }
}