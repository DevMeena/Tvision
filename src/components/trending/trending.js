import ContentCard from "../card/contentCard"
import axios from "axios"
import { useEffect, useState } from 'react'
import { ContentPaste, LocalFireDepartment } from "@mui/icons-material";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CustomPagination from "../pagination/CustomPagination";
import Pagination from "@material-ui/lab/Pagination";
import ContentPage from '../content/contentPage'
import { SearchContext } from "../../contexts/searchContext";
import { useContext } from 'react';

const Trending = () => {
    const [page,setPage] = useState(1)
    const myUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MDB_API_KEY}&page=${page}`
    const [content, setContent] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(myUrl)
        
        setContent(data.results);
    }

    useEffect(() => {   
        window.scroll(0,0)
        fetchTrending();
        // eslint-disable-next-line
    }, [page])

    console.log(content);

    const { search } = useContext(SearchContext);
    console.log("hello");

    return (
        <div>
            {/* <span> <LocalFireDepartmentIcon color='warning' fontSize='inherit'/> </span> */}
            <h1 className="trending-text">  Trending Now </h1>
            <div className="trending">

            {content && content.map((c)=>(
                <ContentCard
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
                />
            ))}
            </div>
            
            <div className="pagination-div">
            <CustomPagination setPage={setPage}/>
            </div>

        </div>
    )
}

export default Trending
