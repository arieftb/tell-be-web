import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchThreads,
  selectAllThreads,
  selectThreadsError,
  selectThreadsStatus,
  selectCategories,
  selectSelectedCategory,
  setSelectedCategory,
} from '../redux/thread/threadSlice.js';
import HomeTemplate from '../templates/HomeTemplate.jsx';
import {selectIsLoggedIn} from '../redux/auth/authSlice.js';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector(selectAllThreads);
  const status = useSelector(selectThreadsStatus);
  const error = useSelector(selectThreadsError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleSelectCategory = (category) => {
    dispatch(setSelectedCategory(category));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchThreads());
    }
  }, [status, dispatch]);

  return (
    <HomeTemplate
      threads={threads}
      status={status}
      error={error}
      isLoggedIn={isLoggedIn}
      categories={categories}
      selectedCategory={selectedCategory}
      onSelectCategory={handleSelectCategory}
    />
  );
}

export default HomePage;
