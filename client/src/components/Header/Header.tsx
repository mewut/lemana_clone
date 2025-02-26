import './Header.css';
import { logo1, logo2, logo3 } from '../../media/logo/logo.js';
import { useEffect, useState } from 'react';
import { arrow, menu, profile, search, cart, favorites } from '../../media/icons/icons.js';
import Search from './Search/Search';

const Header = () => {
  const logos = [logo1, logo2, logo3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [city, setCity] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [logos.length]);

  useEffect(() => {
    // фиктивные координаты для тестирования
    const testCoordinates = { latitude: 55.7558, longitude: 37.6173 }; // координаты Москвы
    getCityName(testCoordinates.latitude, testCoordinates.longitude).then(cityName => {
      setCity(cityName);
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const cityName = await getCityName(latitude, longitude);
        setCity(cityName);
      }, (error) => {
        console.error(error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const getCityName = async (latitude: number, longitude: number) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        return data[0].name;
      }
      return 'Unknown';
    } catch (error) {
      console.error(error);
      return 'Unknown';
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className='header'>
      <div className='logo-slider'>
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`${index + 1}`}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className='wrapper-search'>
        <button className='menu'>
          <img src={menu} />
        </button>
        <div
          className={`search-form ${isSearchOpen ? 'expanded' : ''}`}
          onClick={handleSearchClick}
        >
          {isSearchOpen ? (
            <Search />
          ) : (
            <div className='search-input-wrapper'>
              <img src={search} alt='search' className='search-icon' />
              <input
                type='text'
                placeholder='Поиск'
                className='search-input'
              />
            </div>
          )}
        </div>
        <div className='city'>
          <div className='city-label'>Город</div>
          <div className='city-name'>{city}<img src={arrow} /></div>
        </div>
      </div>
      <div className='wrapper-profile'>
        <button className='profile' data-tooltip='Профиль'><img src={profile} className='icon' /></button>
        <button className='favorites' data-tooltip='Мой список'><img src={favorites} className='icon' /></button>
        <button className='cart' data-tooltip='Корзина'><img src={cart} className='icon' /></button>
      </div>
    </div>
  );
}

export default Header;
