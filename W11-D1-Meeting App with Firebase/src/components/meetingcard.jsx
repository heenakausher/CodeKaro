import axios from "axios";
import { useDispatch } from "react-redux";
import { setError, toggleImportant } from "@/features/meetings/meetingslicer";
import { Star } from "lucide-react";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function Meetingcards({meeting}) {
    const dispatch = useDispatch();
    const url = 'https://meeting-app-2eb3a-default-rtdb.asia-southeast1.firebasedatabase.app';
    const meetingDate = meeting.date ? new Date(meeting.date).toLocaleDateString() : "Date not available";
    const [confirmOpen, setConfirmOpen] = useState(false);

    function handleImportant(){
        const newStatus = !meeting.important;
        axios.patch(`${url}/meet/${meeting.id}.json`, {important:newStatus})
        .then(() => {
            dispatch(toggleImportant({id:meeting.id, important:newStatus}));
        })
        .catch((error) => {
            dispatch(setError(error.message))
        });
    }

    return (
        <div className="flex justify-between px-4 border rounded-lg p-2 mb-3 hover:scale-101">
            <div>
                <h6 className="text-sm font-semibold">{meeting.title}</h6>
                <p className="text-sm text-gray-500">Date:{meetingDate}</p>
            </div>
            <button onClick={() => setConfirmOpen(true)}>
                <Star className={`h-4 w-4 transition-colors ${meeting.important
                        ? "fill-yellow-400 text-yellow-500"
                        : "fill-white text-gray-400 hover:fill-white hover:text-yellow-500"
                }`} />
            </button>

            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {meeting.important ? "Remove from Important" : "Mark as Important"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {meeting.important 
                            ? "Are you sure you want to remove this meeting from Important?"
                            : "Are you sure you want to mark this meeting as Important?"}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {handleImportant();
                            setConfirmOpen(false);}}>
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
  );
}

export default Meetingcards;