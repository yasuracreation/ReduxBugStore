import {createSlice } from "@reduxjs/toolkit"

let lastId = 0;
const slice = createSlice({
    name:'projects',
    initialState:[],
    reducers:{
        addProject(projects,action){
            projects.push({ id: ++lastId, project: action.payload.project }) 
        }
    }
})
export const {addProject} = slice.actions
export default slice.reducer;  //export reducer