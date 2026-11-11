import { configureStore } from "@reduxjs/toolkit";
import meetingReducer from "@/features/meetings/meetingslicer";

export const store = configureStore({
    reducer: {
        meetings:meetingReducer
    }
})