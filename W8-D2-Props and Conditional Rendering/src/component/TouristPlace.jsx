function TouristPlace({place}){
    return(
        <div className=" p-5">
            <img className="w-full h-78 object-cover rounded-xl" src={place.img} alt={place.placename} />
            <h2 className="text-2xl font-bold mt-3">{place.placeName}</h2>
            <p className="mt-2">{place.desc}</p>
            <p className="mt-2">Rating: ⭐{place.ratings}</p>
            <p className="">Price: ₹{place.price}</p>
            {place.price < 12000 
            ? (<p className="text-green-600 font-bold">Cheaper</p>)
            : (<p className="text-red-600 font-bold">Expensive</p>)}
            {place.whenToVisit === "Summer" 
            ? (<p className="text-orange-600 font-bold">Best for Summer</p>)
            : (<p className="text-blue-600 font-bold">Best for Winter</p>)}

        </div>
    );
}

export default TouristPlace;