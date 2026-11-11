import { Link } from "react-router-dom";
import axios from "axios";
import { Star, StarOff } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, buttonVariants } from "@/components/ui/button"
import { toggleImportant, setError } from "@/features/meetings/meetingslicer";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { ChevronDownIcon, Calendar as CalendarIcon  } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
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


function Navbar() {
    const dispatch = useDispatch();
    const url = 'https://meeting-app-2eb3a-default-rtdb.asia-southeast1.firebasedatabase.app';    
    const [date, setDate] = React.useState(undefined)
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const titleInput = useRef(null)
    const { meetings } = useSelector((state) => state.meetings);
    const importantMeetings = meetings.filter((meeting) => meeting.important === true);

    function handleSubmit(){
        axios.post(`${url}/meet.json`,{
            title: titleInput.current.value,
            date:date,
            important:false,
        }).then(()=>{
            console.log('data saved')
        })
    }

    function handleRemoveImportant(meeting){
        axios.patch(`${url}/meet/${meeting.id}.json`,{important: false})
        .then(() => {
            dispatch(toggleImportant({id:meeting.id, important: false}));
        })
        .catch((error) => {
        dispatch(setError(error.message))
        });
    }

    function confirmRemoveImportant(meeting){
        setSelectedMeeting(meeting);
        setConfirmOpen(true);
    }

    return (
    <div className="border-b border-neutral-100 py-3 max-w-4xl mx-auto items-center">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="hover:scale-103">CodeKaro Meetings</Link>
        <div className="flex gap-4 items-center">
            <Link to="/previous" variant="ghost" className="hover:scale-103">Past Meetings</Link>
            
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button className="text-md hover:scale-103 font-normal shadow-none border-0 hover:bg-transparent" variant="outline" >
                    Important<Star className="h-4 w-4 fill-yellow-400 text-yellow-500"/>
                    ({importantMeetings.length})</Button>} />
                <DropdownMenuContent className="w-64">
                    <h3 className="text-sm font-semibold">Important Meetings</h3>
                    <DropdownMenuSeparator />
                    {importantMeetings.length === 0
                    ? (<DropdownMenuItem disabled className="text-sm text-gray-500">No important meetings.</DropdownMenuItem>)
                    : (
                    <AnimatePresence>
                        {importantMeetings.map((meeting) => (
                        <motion.div
                        key={meeting.id} 
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.25 }}>
                        <DropdownMenuItem className="flex justify-between">
                            <Link to="/" className="flex-1 truncate">{meeting.title} </Link>
                            <button type="button" 
                                onClick={() => confirmRemoveImportant(meeting)}
                                className="ml-2 text-red-400">
                                <StarOff className="h-4 w-4"/>
                                </button>
                        </DropdownMenuItem>
                        </motion.div>))}
                    </AnimatePresence>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove from Important?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove "{selectedMeeting?.title}" from Important meetings?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            handleRemoveImportant(selectedMeeting);
                            setConfirmOpen(false);
                            setSelectedMeeting(null);
                        }}>
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Sheet>
                <SheetTrigger render={<Button className="text-md hover:scale-103 font-normal shadow-none border-0 hover:bg-transparent" variant="outline">Add Meeting</Button>} />
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Meeting</SheetTitle>
                        <SheetDescription>
                            Create new meeting with your members. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 mx-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Title</Label>
                            <Input id="name" ref={titleInput} placeholder="Meeting Title" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right" >Date</Label>
                            <Popover>
                                <PopoverTrigger render={
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "col-span-3 justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>}
                                />
                                <PopoverContent className="flex w-auto flex-col space-y-2 p-2" align="start">

                                    <Select
                                        onValueChange={(value) =>
                                            setDate(addDays(new Date(), parseInt(value)))
                                        }
                                        >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="0">Today</SelectItem>
                                            <SelectItem value="1">Tomorrow</SelectItem>
                                            <SelectItem value="3">In 3 days</SelectItem>
                                            <SelectItem value="7">In a week</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                    />

                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button onClick={handleSubmit}>Add Meeting</Button>
                        <SheetClose render={<Button variant="outline">Close</Button>} />
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
      </div>

    </div>
  )
}

export default Navbar;






















// import { Link } from "react-router-dom";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import { Button, buttonVariants } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import * as React from "react"
// import { cn } from "@/lib/utils"
// import { ChevronDownIcon, Calendar as CalendarIcon  } from "lucide-react"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { addDays, format } from "date-fns"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"
// import axios from "axios";
// import { useRef, useState } from "react";

// function Navbar() {
//     let url = 'https://meeting-app-2eb3a-default-rtdb.asia-southeast1.firebasedatabase.app'
//     const [date, setDate] = React.useState(undefined)
//     const titleInput = useRef(null)
//     function handleSubmit(){
//         axios.post(`${url}/meet.json`,{
//             title: titleInput.current.value,
//             date:date,
//         }).then(()=>{
//             console.log('data saved')
//         })
//     }
//   return (
//     <div className="border-b border-neutral-100 py-3 max-w-4xl mx-auto">
//       <div className="max-w-4xl mx-auto flex justify-between">
//         <Link to="/">CodeKaro Meetings</Link>
//         <div className="flex gap-4">
//             <Link to="/previous">Past Meetings</Link>
//             <Sheet>
//                 <SheetTrigger render={<Button variant="outline">Add Meeting</Button>} />
//                 <SheetContent>
//                     <SheetHeader>
//                         <SheetTitle>Add New Meeting</SheetTitle>
//                         <SheetDescription>
//                             Create new meeting with your members. Click save when you're done.
//                         </SheetDescription>
//                     </SheetHeader>
//                     <div className="grid gap-4 mx-4">
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="name" className="text-right">Title</Label>
//                             <Input id="name" ref={titleInput} placeholder="Meeting Title" className="col-span-3" />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="username" className="text-right" >Date</Label>
//                             {/* <Input id="username" placeholder="Meeting date" /> */}
//                             <Popover>
//                                 <PopoverTrigger
//                                     render={
//                                         <Button
//                                             variant={"outline"}
//                                             className={cn(
//                                                 "col-span-3 justify-start text-left font-normal",
//                                                 !date && "text-muted-foreground"
//                                             )}>
//                                             <CalendarIcon className="mr-2 h-4 w-4" />
//                                             {date ? format(date, "PPP") : <span>Pick a date</span>}
//                                         </Button>
//                                     }
//                                 />
//                                 <PopoverContent className="flex w-auto flex-col space-y-2 p-2" align="start">

//                                     {/* Date Presets */}
//                                     <Select
//                                         onValueChange={(value) =>
//                                             setDate(addDays(new Date(), parseInt(value)))
//                                         }
//                                         >
//                                         <SelectTrigger className="w-full">
//                                             <SelectValue placeholder="Select" />
//                                         </SelectTrigger>
//                                         <SelectContent position="popper">
//                                             <SelectItem value="0">Today</SelectItem>
//                                             <SelectItem value="1">Tomorrow</SelectItem>
//                                             <SelectItem value="3">In 3 days</SelectItem>
//                                             <SelectItem value="7">In a week</SelectItem>
//                                         </SelectContent>
//                                     </Select>

//                                     {/* Calendar */}
//                                     <Calendar
//                                         mode="single"
//                                         selected={date}
//                                         onSelect={setDate}
//                                     />

//                                 </PopoverContent>
//                             </Popover>
//                         </div>
//                     </div>
//                     <SheetFooter>
//                         <Button onClick={handleSubmit}>Add Meeting</Button>
//                         <SheetClose render={<Button variant="outline">Close</Button>} />
//                     </SheetFooter>
//                 </SheetContent>
//             </Sheet>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Navbar;