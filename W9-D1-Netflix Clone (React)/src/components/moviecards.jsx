import { Link } from "react-router-dom";

function MovieCard({img,slug}){
    return(
        <Link to={`/details/${slug}`} >
            <div className=""> 
                <img className="w-40 h-60 mb-1 rounded-lg object-cover" src={img} alt="movies" />
            </div>
        </Link>
    );
}

export default MovieCard;