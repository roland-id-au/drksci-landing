import React from 'react';

export default function FullLogo() {
  return (
    <svg viewBox="0 0 98 30" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '200px', height: 'auto' }} className="logo-display">
      <defs>
        <linearGradient id="slash-vaporwave1-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="33%" stopColor="#FF00FF" /><stop offset="33%" stopColor="#00FFFF" />
          <stop offset="66%" stopColor="#00FFFF" /><stop offset="66%" stopColor="#6400FF" />
        </linearGradient>
        <linearGradient id="trail1-vaporwave1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF00FF" stopOpacity="0.2" /><stop offset="100%" stopColor="#FF00FF" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="trail2-vaporwave1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.2" /><stop offset="100%" stopColor="#00FFFF" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="trail3-vaporwave1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6400FF" stopOpacity="0.2" /><stop offset="100%" stopColor="#6400FF" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g transform="translate(-2, 0)">
        <g className="color-trail-group">
          <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="#FF00FF" opacity="0.3"/>
          <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="#00FFFF" opacity="0.3"/>
          <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="#6400FF" opacity="0.3"/>
          <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="url(#trail1-vaporwave1-dark)"/>
          <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="url(#trail2-vaporwave1-dark)"/>
          <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="url(#trail3-vaporwave1-dark)"/>
        </g>
        <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">d</text>
        <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">rksci</text>
        <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="url(#slash-vaporwave1-dark)" />
      </g>
    </svg>
  );
}