// SNA
const logger = param => store => next => action => {
    return next(action);
    // logger > toast > api
  };
  
  export default logger;
  
  // Currying
  // N => 1
  