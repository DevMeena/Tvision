import aixos from 'axios'
import { useState, useEffect } from 'react'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ContentCard from '../card/contentCard';
import CustomPagination from '../pagination/CustomPagination';
import Genres from '../genre/genre';
import useGenre from '../genre/genreHook';
import { useContext } from 'react';
import { SearchContext } from '../../contexts/searchContext';
import ContentPage from '../content/contentPage';

const Movies = () => {

    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [page,setPage]  = useState(1)
    const [content, setContent] = useState([])
    const [numOfPages, setNumOfPages] = useState()

    const genreforURL = useGenre(selectedGenres);
    // console.log(selectedGenres);
    
    const Movie_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}` // + page + "&with_genres=" + genreforURL

    const fetchMovies = async () => {
        const { data } = await aixos.get(Movie_URL); //  + "&with_genres=" + genreforURL
        
        setContent(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovies();
        // eslint-disable-next-line
    }, [genreforURL,page])

    const { search } = useContext(SearchContext);


    return (
        <div>
            <div className="title-holder">
            {/* <LocalFireDepartmentIcon color='warning' fontSize='inherit'/> */}
            <h1 className="trending-text">  Movies </h1>
            </div>

            <div className="genres-area">
            <Genres 
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            </div>

            <div className="trending">
            {content && content.map((c)=>(
                <ContentCard 
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type="movie"
                vote_average={c.vote_average}
                />
            ))}
            </div>

            <div className="pagination-div">
            {numOfPages > 1 && ( <CustomPagination setPage={setPage} numOfPages={numOfPages} /> )}
            </div>

        </div>
    )
}

export default Movies
