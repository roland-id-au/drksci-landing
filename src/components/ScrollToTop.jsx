import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
    
    // Also try scrolling the main content container if it exists
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
    
    // Handle any scrollable containers
    const scrollableContainers = document.querySelectorAll('.overflow-auto, .overflow-y-auto, .overflow-x-auto, .overflow-scroll');
    scrollableContainers.forEach(container => {
      container.scrollTop = 0;
      container.scrollLeft = 0;
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;