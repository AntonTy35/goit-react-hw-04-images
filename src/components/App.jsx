import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchQuery } from 'api';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from './Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const queryWithoutId = newQuery => {
    return newQuery.slice(newQuery.indexOf('/') + 1);
  };

  useEffect(() => {
    if (query === '') return;

    const getQuery = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchQuery(
          queryWithoutId(query),
          page
        );
        if (hits.length === 0) {
          return toast.error(
            'Sorry, there are no matching images for your search. Please try again'
          );
        }

        const arrImages = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        const totalPage = totalHits / 12;
        totalPage > page ? setIsLoadMore(true) : setIsLoadMore(false);

        setImages(prevState => [...prevState, ...arrImages]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getQuery();
  }, [query, page]);

  const handleLoadMore = () => setPage(prevState => prevState + 1);

  const changeQuery = newQuery => {
    if (newQuery !== query) {
      setQuery(`${Date.now()}/${newQuery}`);
      setImages([]);
      setPage(1);
    }
  };

  return (
    <>
      <Searchbar onSubmit={changeQuery} />
      {images.length > 0 && <ImageGallery arrImages={images} />}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && isLoadMore && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
};
