import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Meetingcards from "@/components/meetingcard";
import { setMeetings, setLoading, setError } from "@/features/meetings/meetingslicer";

function Previous() {
    const dispatch = useDispatch();
    const { meetings, loading, error } = useSelector((state) => state.meetings);
    const url = 'https://meeting-app-2eb3a-default-rtdb.asia-southeast1.firebasedatabase.app';
    const today = new Date();
    today.setHours(0,0,0,0);
    const previousMeetings = meetings
        .filter((meeting) => meeting.date && new Date(meeting.date) < today)
        .sort((a,b) => new Date(b.date) - new Date(a.date));

    useEffect(() => {
        dispatch(setLoading(true));
        axios.get(`${url}/meet.json`)
        .then((response) => {
            const data = response.data || {};
            const allMeetings = Object.entries(data).map(([id, meeting]) => ({id, ...meeting}));
            dispatch(setMeetings(allMeetings));
        })
        .catch((error) => {
            dispatch(setError(error.message));
        })
        .finally(() => {
            dispatch(setLoading(false));
        });
    },[dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Previous Meetings</h1>
        {loading && <p className="m-auto w-10 h-10 rounded-full animate-spin border-2 border-neutral-300 border-b-white"></p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && previousMeetings.length === 0 && (
            <p>No previous meetings found</p>
        )}
        <div className="rounded-lg p-2 mb-3">
            {!loading && !error && previousMeetings.map((meeting) => (
                <Meetingcards key={meeting.id} meeting={meeting} />
            ))}        
        </div>
    </div>
  )
}

export default Previous;
