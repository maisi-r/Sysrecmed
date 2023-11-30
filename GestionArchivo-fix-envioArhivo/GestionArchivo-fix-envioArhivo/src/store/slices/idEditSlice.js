import { createSlice } from '@reduxjs/toolkit';


export const idEditSlice = createSlice({

    name: 'idEdit',
    initialState: {
        id: ""
    },
    reducers: {
        editOff: (state) => {
            state.id = "";
        },
        editOn: (state, action) => {
            state.id = action.payload;
        }
    }
});

export const { editOff, editOn } = idEditSlice.actions;