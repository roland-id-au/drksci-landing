import React from 'react';

function Logo({ type = 'main', color = 'black', isAvatar = false }) {
  let svgPath;

  if (isAvatar) {
    svgPath = `/logos/avatar-${type}${color === 'white' ? '-white' : ''}.svg`;
  } else {
    svgPath = `/logos/logo-${type}${color === 'white' ? '-white' : ''}.svg`;
  }

  return (
    <img
      src={svgPath}
      alt={`${type} logo`}
      className={`logo-display ${isAvatar ? 'avatar-variant' : 'logo-variant'}`}
      onClick={() => console.log(`${type} logo clicked`)}
    />
  );
}

export default Logo;