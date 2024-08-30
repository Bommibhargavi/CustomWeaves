
import React, { useEffect, useState } from 'react';
import {
  FaInstagram,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setIsVisible(true);  // Show footer when at the bottom
    } else {
      setIsVisible(false); // Hide footer otherwise
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`footer ${isVisible ? 'visible' : ''}`}>
      <p className='footer-heading'>custom weaves pvt ltd</p>
      <ul className='footer-ul'>
        <li>Terms Of Use</li>
        <li>Privacy-Policy</li>
        <li>About</li>
        <li>FAQ</li>
      </ul>
      <div className='box-icons'>
        <a href='https://www.instagram.com/bhargavibommi/?hl=en'><FaInstagram /></a>
        <a href='linkedin.com/in/bommi-bhargavi-5a66a1238'><FaLinkedin /></a>
        <a href='https://github.com/Bommibhargavi'><FaGithub /></a>
        <a href='mailto:Bommibhargavi0147@gmail.com'><FaEnvelope /></a>
      </div>
      <p className='final-statement'>Made by @Bommi Bhargavi frontend Developer</p>
    </div>
  );
};

export default Footer;

