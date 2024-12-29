import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api";


export default function() {
    return configureStore({
      reducer,
      middleware:[
        ...getDefaultMiddleware(),
        // logger({ destination: "console" }),
        toast,
       api
      ]
    });
  }
  

// import { createStore } from "redux";
// import reducer from "./bugs";
// import { devToolsEnhancer} from 'redux-devtools-extension';


// export default function configureStore(){
//     const store = createStore(
//         reducer, /* preloadedState, */
//        devToolsEnhancer({trace:true})
//        );
//        return store;
// };