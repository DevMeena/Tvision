import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Badge } from "@material-ui/core";
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ContentPage from '../content/contentPage';
import Link from '@mui/material/Link';

const contentCard = ({
    id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {

    function getdate(date) {
        return '(' + date.substring(0, 4) + ')'
    }

    return (
        <div>
            <Link underline="none" href={"/content/" + media_type + '/' + id} >
            <div className="card-outer">
            <Badge className="badge-part" badgeContent={vote_average} color={ vote_average >= 7 ? 'primary' : vote_average < 4 ? 'error' : 'secondary' } />
                {media_type !== "tv" ? <MovieIcon className="card-title-tag"/> : <LiveTvIcon className="card-title-tag" />}
                <img className="movie-poster" alt={title} src={ poster ? "https://image.tmdb.org/t/p/w300" + `${poster}` : "https://www.movienewz.com/img/films/poster-holder.jpg" } />
                <span className="movie-subtitles">
                    {title ? title : "no title found"}  {( date ?  getdate(date) : "(no date found)")}

                    {/* <IconButton aria-label="Favourite" color="inherit">
                    <FavoriteIcon />
                    </IconButton> */}
                </span>
            </div>
            </Link>
        </div>
    )
}

export default contentCard
