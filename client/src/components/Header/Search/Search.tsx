import React from 'react';
import './Search.css';


const Search = () => {
  return (
    <div className='search-overlay'>
      <div className='search-content'>
        <input
          type='text'
          placeholder='Поиск'
          className='search-input'
          autoFocus 
        />
      </div>
    </div>
  );
};

export default Search;