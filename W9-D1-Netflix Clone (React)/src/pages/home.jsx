import MovieCard from "../components/moviecards";
import Movies from "../movies";

function Home(){
    console.log(Movies);
    return(
        <div className="flex justify-center mt-15 mx-auto gap-3 flex-wrap border w-300" >
            {Movies.map(
                (movie)=> 
                    (<MovieCard key={movie.id} slug={movie.slug } img={movie.img} />)
                )
            }
        </div>
    );
}

export default Home;