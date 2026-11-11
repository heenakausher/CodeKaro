import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Star } from "lucide-react";
import Meetingcards from "@/components/meetingcard";
import { setMeetings, setLoading, setError } from "../features/meetings/meetingslicer";

function Home() {
    const dispatch = useDispatch();
    const {meetings, loading, error} = useSelector((state) => state.meetings);
    const url = 'https://meeting-app-2eb3a-default-rtdb.asia-southeast1.firebasedatabase.app'
    const [showImportantOnly, setShowImportantOnly] =useState(false);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingMeetings  = meetings
        .filter((meeting) => meeting.date && new Date(meeting.date) >= today )
        .sort((a,b) => new Date(a.date) - new Date(b.date));

    const displayedMeetings = showImportantOnly
        ? upcomingMeetings.filter((meeting) => meeting.important === true)
        : upcomingMeetings;

    useEffect(()=>{
        dispatch(setLoading(true));
        axios.get(`${url}/meet.json`)
        .then((response) => {
            const data = response.data || {};
            const allMeetings = Object.entries(data).map(([id, meeting]) => ({id,...meeting}));
            dispatch(setMeetings(allMeetings));
        })
        .catch((error) => {
            dispatch(setError(error.message));
        })
        .finally(() => {
            dispatch(setLoading(false));
        });
    }, [dispatch]);

    return (
        <div>
            <div>
                <div className="flex justify-between items-center ">
                {loading && <p className="m-auto w-10 h-10 rounded-full animate-spin border-2 border-neutral-300 border-b-white"></p>}
                </div>
            </div>
            <div className="max-w-4xl mx-auto p-4">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{showImportantOnly ? "Important Meetings" : "All Meetings"}</h1>
                    <div className="flex gap-2">
                        <button onClick={() => setShowImportantOnly(false)}
                            className={`px-3 py-2 rounded-md text-sm hover:scale-103 ${!showImportantOnly 
                            ? "bg-black text-white" : "bg-gray-50"}`}>
                            All Meetings
                        </button>
                        <button onClick={() => setShowImportantOnly(true)}
                            className={`px-3 flex item-center gap-1 py-2 rounded-md text-sm hover:scale-103  ${showImportantOnly 
                            ? "bg-black text-white" : "bg-gray-50"}`}>
                            Important Only
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-500"/>
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && displayedMeetings.length === 0 && <p>No meetings found.</p> }
                <div className="rounded-lg p-2 mb-3">
                    {!loading && displayedMeetings.map((meeting)=>(
                    <Meetingcards key={meeting.id} meeting={meeting}/>        
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;