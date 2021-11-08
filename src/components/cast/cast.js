import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import { img_300, noPicture } from "../../config/config";
// import "./Carousel.css";

const img_300 = "https://image.tmdb.org/t/p/w300";
const noPicture = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <p className="carouselItem__txt">{c?.name}</p>
    </div>
  ));

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 3,
    },
    1024: {
      items: 5,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
      autoPlayInterval="1000"
    />
  );
};

export default Gallery;