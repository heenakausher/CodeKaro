import { createSlice } from "@reduxjs/toolkit";

export const meetingSlice = createSlice({
    name:'meetings',
    initialState:{
        meetings: [],
        loading: false,
        error: null,
    },
    reducers:{
        // fetch meetings from firebase
        setMeetings:(state,action) => {
            state.meetings = action.payload;
        },

        // add meeting
        addMeeting:(state,action) => {
            state.meetings.push(action.payload)
        },

        // mark/unmark meeting as important
        toggleImportant:(state,action) => {
            const meeting = state.meetings.find(
                (item) => item.id === action.payload.id
            );
            if (meeting) {
                meeting.important = action.payload.important;
            }
        },

        deleteMeeting:(state,action) =>{
            state.meetings = state.meetings.filter(
                (meeting) => meeting.id !== action.payload
            );
        },

        setLoading:(state,action) => {
            state.loading = action.payload;
        },

        setError:(state,action)  => {
            state.error = action.payload;
        },
    },
});

export const {setMeetings, addMeeting, deleteMeeting, toggleImportant, setLoading, setError} = meetingSlice.actions;

export default meetingSlice.reducer;