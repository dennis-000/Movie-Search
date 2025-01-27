import {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=8cca8f6d';

const movie1 = {
    "Title": "Avengers: Endgame",
    "Year": "2019",
    "imdbID": "tt4154796",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
}

// 8cca8f6d
const App = () => {

    // const [movies, setMovies] = useState([]); // if we want to fetch data dynamically
    const [movies, setMovies] = useState([]); // for static data
    const [searchTerm, setSearchTerm] = useState(''); // for dynamic search

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        // data for the movies
        const data = await response.json();

        setMovies(data.Search);
        // API works
        console.log('Data',data);
        console.log('Data Search',data.Search);

    }

    useEffect(() => {
        searchMovies('Avengers');
    }, []);




    // wants to fetch the data from the API as soon as the component is mounted/loads

    return (
        <div className='app'>
            <h1>Dennis Movie App</h1>

            <div className='search'>
                <input
                    type='text'
                    placeholder='Search for a movie...'
                value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <img 
                src={SearchIcon}
                alt='Search Icon'
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {/* <div className='container'>
                <div className='movie'>
                    <div>
                        <p>{movie1.Year}</p>
                    </div>

                    <div>
                        <img
                        src={movie1.Poster !== 'N/A' ? movie1.Poster : 'https://via.placeholder.com/400'} alt='{movie1.Title}'
                        />
                    </div>
                    <div>
                        <span>{movie1.Type}</span>
                        <h3>{movie1.Title}</h3>
                    </div>
                </div>

            </div> */}

            {/* Showing the movies dynamically */}
            {/* Dynamically looping over the movies array that is fetched from an API  and taking individual movie and dynamically passing it ("movie") */}
            {/* Dynamically passing the movie as a prop to our movie card */}
            {movies?.length > 0
                ? // if movies are found
                (
                <div className='container'>
                    {/* List all movies accordingly */}
                    {/* showing only one single card */}
                    <MovieCard movie={movies[0]} />

                    {/* showing multiple cards/ dynamic cards....let's map on all the movies */}
                    {
                        movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))
                    }
                </div>
                ) :
                // if no movies are found
                (
                    <div>
                        <h2>No movies found</h2> 
                    </div>
                )
            }
        </div>
    );
}

export default App;