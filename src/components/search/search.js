import {
    Button,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";
  import { createTheme } from '@material-ui/core/styles'
  import SearchIcon from '@mui/icons-material/Search';
  import { useEffect, useState, useContext } from "react";
  import axios from "axios";
import CustomPagination from "../pagination/CustomPagination";
import CustomCard from "../card/contentCard";
import { useSearch } from "../../contexts/searchContext";
import { SearchContext } from "../../contexts/searchContext";


  const Search = () => { // props
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
  
    const darkTheme = createTheme({
      palette: {
        type: "dark",
        primary: {
          main: "#fff",
        },
      },
    });
    
    const { search } = useContext(SearchContext);
    // const searchParams =  props.match.params.name

    const fetchSearch = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=true`
        //   `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=e23a29beda9fa1f7e763eec816125332&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    console.log(type);
    // console.log();
    // useSearch()
  
    useEffect(() => {
      window.scroll(0, 0);
      fetchSearch();
      // eslint-disable-next-line
    }, [ search ,type, page]);
  
    return (
      <div className="content-page-area" >
        {/* <div className="content-page-area"> */}

        <h1 className="trending-text"> Seach Results </h1>
        {/* <h1 className="trending-text"> {search} </h1> */}
        {/* <h1 className="trending-text"> {props.match.params.name} </h1> */}

        <div>
        <ThemeProvider theme={darkTheme}>
          {/* <div className="search">
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
          </div> */}
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
          {searchText &&
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
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