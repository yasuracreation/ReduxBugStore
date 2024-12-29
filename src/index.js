import { bugAdded, bugResolved ,assignBug,getUnresolvedBugs,getListOfBugAssigned,loadBugs,addBug,resolvedBug ,assignToUser} from "./store/bugs";
import configureStore from "./store/configureStore";
import { addProject } from "./store/projects";
import { userAdded } from "./store/users";
const store = configureStore();

const unsubscribe = store.subscribe(()=>{
    console.log("Store changed" ,store.getState());
})
// store.dispatch(userAdded({name:"Yasura"}));
// store.dispatch(userAdded({name:"Narmada"}));
// store.dispatch(bugAdded({description: "bug 1"}));
// store.dispatch(bugAdded({description: "bug 2"}));
// store.dispatch(bugAdded({description: "bug 3"}));
// store.dispatch(bugResolved({id:0}));
// store.dispatch(addProject({project: "project  3"}));
// store.dispatch(assignBug({bugId:1,userId:1}))
// unsubscribe(); 
store.dispatch(loadBugs());
// store.dispatch(addBug({description:"bug 54"}));
// setTimeout(()=>store.dispatch(resolvedBug(1)),2000)
setTimeout(()=>store.dispatch(assignToUser(1,1)),2000)
// store.dispatch(actions.apiCallBegan({ 
//     url:"/bugs",
//     onSuccess: "bugs/bugsReceived",
//     onError: "bugsRequestFailed"}))
// store.dispatch({
//     type: "apiCallBegan",
//     payload: {
//         url:"/bugs",
//         onSuccess: "bugsReceived",
//         onError: "bugsRequestFailed"
//     }
// })
console.log(store.getState())
console.table(getUnresolvedBugs(store.getState()))
console.table(getListOfBugAssigned(1)(store.getState()))
// store.dispatch({type:"Error", payload:"An Error occuerd"})