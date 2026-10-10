import Movies from "../movies";
import MovieCard from "../components/moviecards";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

function Details(){
    
        let[volume, setVolume]=useState(true);
        let {slug}=useParams();
        let movie = Movies.find( (movie)=> 
                                    movie.slug === slug );
        if (!movie){
            return <h2 className="text-white">Movie not found</h2>
        };

        console.log(movie.youtube_trailer);

        let suggestions = Movies.filter((data)=>{
            return data.genre===movie.genre && data.imdb_rating>movie.imdb_rating
        });

        function volumeHandler(){
            setVolume ((prev)=>!prev);
        }
    return(
            <div className="mt-5 h-screen">
                <div className=" h-full">
                    <ReactPlayer width="100%" height="100%" playing={false} controls={true} loop muted src={movie.youtube_trailer} />
                </div>
                <div className="mt-8 w-full ">
                    <p className="w-full border-white text-white">{movie.description}</p>
                    <div className="flex gap-2">
                        <button className="px-5 py-2 bg-orange-700 mt-3 rounded-lg text-white text-xs">IMDB Ratings {movie.imdb_rating}</button>
                        <button className="px-5 py-2 bg-white mt-3 rounded-lg text-xs">Add to Watchlist</button>
                    </div>
                </div>
            
                <div>
                    <h2 className="text-white ml-8 mt-8 font-bold">More like these</h2>
                    <div className="flex gap-2">
                        {suggestions.map(movie=><MovieCard img={movie.img} slug={movie.slug}/>)}</div>
                </div>
                
            </div>
            
    )
}

export default Details;