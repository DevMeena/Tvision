import React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import ListContent from '../list-content/list-content';
import { useAuth } from '../../contexts/AuthContext';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Watchlist = () => {
  const [watchlistMovies, setwatchlistMovies] = useState([]);
  const [error, setError] = useState(false);
  const [del, setDel] = useState('');

  const { currentUser } = useAuth();
  // const usersCollectionRef = collection(db,"users")
  const docRef = doc(db, 'users', currentUser.uid);

  const getWatchListMovies = async () => {
    const data = await getDoc(docRef);
    if (data.exists()) {
      setwatchlistMovies([...data.data().myList]);
      if (!watchlistMovies.length) {
        setError(true);
        console.log(watchlistMovies.length);
      } else {
        setError(false);
      }
    } else {
      console.log('empty');
    }
  };

  useEffect(() => {
    getWatchListMovies();
    return () => {
      setwatchlistMovies([]); // unmounting
      setDel('');
    };
  }, [error, del]);

  return (
    <div className='content-page-area'>
      <h1 className='trending-text'> My Watchlist </h1>

      <Container className='watchlist-container'>
        <hr />

        {error && (
          <div className='error-division'>
            <h1 className='error-text'> No Media to Watch </h1>
          </div>
        )}

        {watchlistMovies &&
          watchlistMovies.map((item) => (
            <ListContent
              key={item.media_id}
              media={item}
              onChange={(value) => setDel(value)}
            />
          ))}
      </Container>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Watchlist;
