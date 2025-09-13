import React from 'react';

const ReflectionSection = ({ setFullscreenImage }) => {
  return (
    <section id="reflection" className="relative min-h-screen flex flex-col justify-center py-20">
      <div className="w-full px-4 sm:px-8 mt-8">
        {/* HARMONIZED: Section heading */}
        <h2 className="text-3xl font-light text-gray-400 tracking-wider mb-12">REFLECTION</h2>
        {/* Abandoned Places Reflection - Now at the top */}
        <div className="mb-8 max-w-4xl">
          {/* HARMONIZED: Body text */}
          <p className="text-lg font-light leading-relaxed text-gray-300">
            I owe much of my professional development to these abandoned places that first fascinated me as a child. Their industrial histories and human stories have been a constant source of learning throughout my career, providing unique insights that continue to inform my approach to complex transformation challenges.
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-12">
          {[
            { thumb: '/assets/personnel/application-gallery/thumbs/calgoa-qld.jpg', full: '/assets/personnel/application-gallery/calgoa-qld.jpg', name: 'Calgoa, QLD' },
            { thumb: '/assets/personnel/application-gallery/thumbs/carbonate-hill-nm-1.jpg', full: '/assets/personnel/application-gallery/carbonate-hill-nm-1.jpg', name: 'Carbonate Hill, NM' },
            { thumb: '/assets/personnel/application-gallery/thumbs/carbonate-hill-nm-2.jpg', full: '/assets/personnel/application-gallery/carbonate-hill-nm-2.jpg', name: 'Carbonate Hill, NM' },
            { thumb: '/assets/personnel/application-gallery/thumbs/carbonate-hill-nm-3.jpg', full: '/assets/personnel/application-gallery/carbonate-hill-nm-3.jpg', name: 'Carbonate Hill, NM' },
            { thumb: '/assets/personnel/application-gallery/thumbs/carbonate-hill-nm-4.jpg', full: '/assets/personnel/application-gallery/carbonate-hill-nm-4.jpg', name: 'Carbonate Hill, NM' },
            { thumb: '/assets/personnel/application-gallery/thumbs/drake-nsw-1.jpg', full: '/assets/personnel/application-gallery/drake-nsw-1.jpg', name: 'Drake, NSW' },
            { thumb: '/assets/personnel/application-gallery/thumbs/drake-nsw-2.jpg', full: '/assets/personnel/application-gallery/drake-nsw-2.jpg', name: 'Drake, NSW' },
            { thumb: '/assets/personnel/application-gallery/thumbs/irvinebank-qld-1.jpg', full: '/assets/personnel/application-gallery/irvinebank-qld-1.jpg', name: 'Irvinebank, QLD' },
            { thumb: '/assets/personnel/application-gallery/thumbs/irvinebank-qld-2.jpg', full: '/assets/personnel/application-gallery/irvinebank-qld-2.jpg', name: 'Irvinebank, QLD' },
            { thumb: '/assets/personnel/application-gallery/thumbs/leadville-co-1.jpg', full: '/assets/personnel/application-gallery/leadville-co-1.jpg', name: 'Leadville, CO' },
            { thumb: '/assets/personnel/application-gallery/thumbs/leadville-co-2.jpg', full: '/assets/personnel/application-gallery/leadville-co-2.jpg', name: 'Leadville, CO' },
            { thumb: '/assets/personnel/application-gallery/thumbs/luina-tas.jpg', full: '/assets/personnel/application-gallery/luina-tas.jpg', name: 'Luina, TAS' },
            { thumb: '/assets/personnel/application-gallery/thumbs/nunya-qld-1.jpg', full: '/assets/personnel/application-gallery/nunya-qld-1.jpg', name: 'Nunya, QLD' },
            { thumb: '/assets/personnel/application-gallery/thumbs/nunya-qld-2.jpg', full: '/assets/personnel/application-gallery/nunya-qld-2.jpg', name: 'Nunya, QLD' },
            { thumb: '/assets/personnel/application-gallery/thumbs/nunya-qld-3.jpg', full: '/assets/personnel/application-gallery/nunya-qld-3.jpg', name: 'Nunya, QLD' },
            { thumb: '/assets/personnel/application-gallery/thumbs/rosarden-tas-1.jpg', full: '/assets/personnel/application-gallery/rosarden-tas-1.jpg', name: 'Rosarden, TAS' },
            { thumb: '/assets/personnel/application-gallery/thumbs/rosarden-tas-2.jpg', full: '/assets/personnel/application-gallery/rosarden-tas-2.jpg', name: 'Rosarden, TAS' },
            { thumb: '/assets/personnel/application-gallery/thumbs/svalbard-dk.jpg', full: '/assets/personnel/application-gallery/svalbard-dk.jpg', name: 'Svalbard, DK' },
            { thumb: '/assets/personnel/application-gallery/thumbs/tombstone-az-1.jpg', full: '/assets/personnel/application-gallery/tombstone-az-1.jpg', name: 'Tombstone, AZ' },
            { thumb: '/assets/personnel/application-gallery/thumbs/tombstone-az-2.jpg', full: '/assets/personnel/application-gallery/tombstone-az-2.jpg', name: 'Tombstone, AZ' },
            { thumb: '/assets/personnel/application-gallery/thumbs/virginia-city-nv-1.jpg', full: '/assets/personnel/application-gallery/virginia-city-nv-1.jpg', name: 'Virginia City, NV' },
            { thumb: '/assets/personnel/application-gallery/thumbs/virginia-city-nv-2.jpg', full: '/assets/personnel/application-gallery/virginia-city-nv-2.jpg', name: 'Virginia City, NV' },
          ].map((image, idx) => (
            <div key={idx} className="text-center">
              <div 
                className="relative mb-0 overflow-hidden rounded-lg cursor-pointer transition-all"
                style={{ width: '50%', aspectRatio: '1', margin: '0 auto' }}
                onClick={() => setFullscreenImage(image)}
              >
                <img 
                  src={image.thumb}
                  alt={`${image.name} abandoned mine site`}
                  className="absolute inset-0 w-full h-full object-cover kodachrome-filter"
                  style={{ 
                    objectPosition: 'center'
                  }}
                  ref={(el) => {
                    if (el) {
                      const observer = new IntersectionObserver(
                        ([entry]) => {
                          if (entry.isIntersecting) {
                            el.style.filter = 'sepia(0.2) saturate(0.8) hue-rotate(10deg) contrast(1.1) brightness(0.95)';
                          } else {
                            el.style.filter = 'sepia(0.4) saturate(0.9) hue-rotate(15deg) contrast(1.2) brightness(0.3)';
                          }
                        },
                        { threshold: 0.3 }
                      );
                      observer.observe(el);
                    }
                  }}
                />
              </div>
              <p className="text-[10px] text-gray-300 font-light text-center font-sans mt-1">
                {image.name}
              </p>
            </div>
          ))}
        </div>
        
        {/* Inspiration */}
        <div className="mt-16 max-w-4xl">
          {/* HARMONIZED: Body text */}
          <p className="text-sm font-light leading-relaxed text-gray-400">
            Inspired in no small part by my grandfathers.
          </p>
        </div>
        
        {/* Grandfathers Photos */}
        <div className="flex gap-4 mt-8 justify-start flex-wrap">
          {[
            { thumb: '/assets/personnel/application-gallery/thumbs/oliver.jpg?v=2', full: '/assets/personnel/application-gallery/oliver.jpg?v=2', name: 'Oliver Carter, Searching for Lasseter\'s Reef c.a. 1970s' },
            { thumb: '/assets/personnel/application-gallery/thumbs/oliver-tanami.jpg?v=1', full: '/assets/personnel/application-gallery/oliver-tanami.jpg?v=1', name: 'Oliver Carter, Tanami Desert' },
            { thumb: '/assets/personnel/application-gallery/thumbs/oliver-heap-leach.jpg?v=1', full: '/assets/personnel/application-gallery/oliver-heap-leach.jpg?v=1', name: 'Oliver Carter, Heap Leaching Operation' },
            { thumb: '/assets/personnel/application-gallery/thumbs/oliver-cyaniding-for-gold.jpg?v=1', full: '/assets/personnel/application-gallery/oliver-cyaniding-for-gold.jpg?v=1', name: 'Oliver Carter, Gold Cyanidation Process' },
            { thumb: '/assets/personnel/application-gallery/thumbs/keith.jpg?v=2', full: '/assets/personnel/application-gallery/keith.jpg?v=2', name: 'Keith Hughes, Exploration Geologist, Northern Territory' },
          ].map((image, idx) => (
            <div key={idx} className="text-center" style={{ width: '120px' }}>
              <div 
                className="relative mb-0 overflow-hidden rounded-lg cursor-pointer transition-all"
                style={{ width: '120px', height: '120px' }}
                onClick={() => setFullscreenImage(image)}
              >
                <img 
                  src={image.thumb}
                  alt={`${image.name}`}
                  className="absolute inset-0 w-full h-full object-cover kodachrome-filter"
                  style={{ 
                    objectPosition: 'center',
                    filter: 'sepia(0.2) saturate(0.8) hue-rotate(10deg) contrast(1.1) brightness(0.95)'
                  }}
                />
              </div>
              <p className="text-[10px] text-gray-300 font-light text-center font-sans mt-1">
                {image.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReflectionSection;