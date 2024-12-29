import { addBug,resolveBug ,loadBugs, getUnresolvedBugs} from "../bugs";
import configureStore from "../configureStore";
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

let fakeAxios;
let store;

beforeEach(()=>{
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
});

const _bugSlice=()=> store.getState().entities.bugs;
const createState =()=>({
    entities:{
        bugs: {
            list: []
        }
    }
})
describe("bugsSlice",()=>{
    it("should add the bug into the store if it saved in the server ",async ()=>{
        const bug = { description:"a" };
        const savedBug = {...bug , id:1};
        fakeAxios.onPost('/bugs').reply(200,savedBug);
        
        await store.dispatch(addBug(bug));
       
        expect(_bugSlice().list).toContainEqual(savedBug)
    });
    it("should add the bug into the store if it saved in the server ",async ()=>{
        const bug = { description:"a" };
        fakeAxios.onPost('/bugs').reply(500,{});
        await store.dispatch(addBug(bug));
       
        expect(_bugSlice().list).toHaveLength(0)
    });
    it("should resolved the bug in store when resolved saved in the server",async ()=>{
        const savedBug = { id:1,resolved:true};
        const bugId = 1;
        fakeAxios.onPatch(`/bugs/${bugId}`).reply(200,savedBug);
        fakeAxios.onPost("/bugs").reply(200,{id:bugId});

        await store.dispatch(addBug({ }));
        await store.dispatch(resolveBug(bugId))

        expect(_bugSlice().list[0].resolved).toBe(true);

    })
    it("should bot resolved the bug in store when resolved not saved in the server",async ()=>{
        const bugId = 1;
        fakeAxios.onPatch(`/bugs/${bugId}`).reply(500);
        fakeAxios.onPost("/bugs").reply(200,{id:bugId});

        await store.dispatch(addBug({ }));
        await store.dispatch(resolveBug(bugId))

        expect(_bugSlice().list[0].resolved).not.toBe(true);

    })
    
    describe("Selectors",()=>{
        it("should return the unresolved bug list",()=>{
            const state = createState();
            state.entities.bugs.list = [{id:1,resolved:true} , {id:2},{id:3}];

            const result = getUnresolvedBugs(state)

            expect(result).toHaveLength(2)
        })
    })

    describe("loading bugs",()=>{
        describe("if the bugs exist in the cache" , ()=>{
            it("they should be fatched from the server and put to the store",async()=>{
                fakeAxios.onGet("/bugs").reply(200,[{id:1}]);

               await store.dispatch(loadBugs())
               
               expect(_bugSlice().list).toHaveLength(1)
            })
            it("should not fatched from the server again towies   ",async ()=>{
                fakeAxios.onGet("/bugs").reply(200,[{id:1}]);

                await store.dispatch(loadBugs());
                await store.dispatch(loadBugs());

               expect( fakeAxios.history.get.length).toBe(1)
                
            })
        });
        describe("if the bugs not exist in the cache",()=>{
            describe("loading indicator",()=>{
                it("should be true while fatching the bugs ", ()=>{
                    fakeAxios.onGet("/bugs").reply(()=>{
                        expect(_bugSlice().loading).toBe(true);
                        return [200,[{id:1}]]
                    });
                    
                    store.dispatch(loadBugs())
                })
                it("should be false after fatching the bugs ",async ()=>{
                    fakeAxios.onGet("/bugs").reply(200,[{id:1}]);
                    
                    await store.dispatch(loadBugs())

                    expect(_bugSlice().loading).toBe(false);
                })
                it("should be false when server return error  ",async ()=>{
                    fakeAxios.onGet("/bugs").reply(500);
                    
                    await store.dispatch(loadBugs())

                    expect(_bugSlice().loading).toBe(false);
                })
            });
        });

    })
})
