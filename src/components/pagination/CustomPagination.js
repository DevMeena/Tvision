import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

const CustomPagination = ({setPage, numOfPages  = 10}) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0)
    }

    return (
        <div className='pagination-styles'>
            <ThemeProvider theme={darkTheme}>
            <Pagination variant="outlined" shape="rounded" count={numOfPages} onChange={(e) => handlePageChange(e.target.textContent)} hideNextButton hidePrevButton />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
