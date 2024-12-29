import axios from 'axios'
import * as actions from '../api'
const api = ({dispatch})=>next=> async action=>{
    if(action.type !== actions.apiCallBegan.type) return next(action);
   
    const { url ,method , data, onStarted ,onSuccess, onError} = action.payload
    if(onStarted) dispatch({type:onStarted}); 
    next(action)
    try {
     const response =   await axios.request({
            baseURL:'http://localhost:9001/api',
            url,
            method,
            data
        })
        dispatch(actions.apiCallSuccess(response.data))
        if(onSuccess)
            //specific
            dispatch({type:onSuccess , payload : response.data});
    } catch (error) {
        //general error 
        dispatch(actions.apiCallFailed(error.message))
        if(error)
            //specific
            dispatch({type:onError ,payload:error.message })
    }
  
};
export default api;