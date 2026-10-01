import TouristPlace from "./component/TouristPlace";
import touristPlaces from "./data";

function App(){
    return(
        <div className="p-5">
            <h1 className="text-5xl font-bold text-center mb-5">Tourist place in India</h1>
            <div className="grid grid-cols-4 gap-5">
                {touristPlaces.map((place) =>(
                    <TouristPlace key={place.placeName} place={place} />
                ))}
            </div>
        </div>
    );
}

export default App;