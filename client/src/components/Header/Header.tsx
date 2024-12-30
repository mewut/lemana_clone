import './Header.css';
import { logo1, logo2, logo3 } from '../../media/logo/logo.js';
import { useEffect, useState } from 'react';

const Header = () => {
  const logos = [logo1, logo2, logo3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <div className='header'>
      <div className="logo-slider">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`${index + 1}`}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      <div>menu</div>
      <div>search</div>
      <div>city</div>
      <div>profile</div>
      <div>favorites</div>
      <div>cart</div>
    </div>
  );
}

export default Header;
