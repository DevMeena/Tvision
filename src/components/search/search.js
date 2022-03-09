import {
    Tab,
    Tabs,
    ThemeProvider,
  } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles'
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CustomPagination from "../pagination/CustomPagination";
import CustomCard from "../card/contentCard";
import { SearchContext } from "../../contexts/searchContext";


  const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [error, setError] = useState(false)

  
    const darkTheme = createTheme({
      palette: {
        type: "dark",
        primary: {
          main: "#fff",
        },
      },
    });
    
    const { search } = useContext(SearchContext);

    const fetchSearch = async () => {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`);
        setContent(data.results);
        setNumOfPages(data.total_pages);

        if(!data.total_results){
          setError(true)
        } else {
          setError(false)
        }

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    console.log(type);
  
    useEffect(() => {
      window.scroll(0, 0);
      fetchSearch();
      // eslint-disable-next-line
    }, [ search ,type, page]);
  
    return (
      <div className="content-page-area" >

        <h1 className="trending-text"> Seach Results </h1>

        <div>
        <ThemeProvider theme={darkTheme}>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
          >
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search TV Series" />
          </Tabs>
        </ThemeProvider>

        { error && <> <br/><br/> <div className='error-division'><h1 className="error-text" >No Media Found </h1></div></>}

        <div className="trending">
          {content &&
            content.map((c) => (
              <CustomCard
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))}
          {
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
          }
        </div>
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
        </div>
        <br/>
      </div>
    );
  };
  
  export default Search;