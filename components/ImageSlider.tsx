import React, { useState, useEffect } from 'react';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearTimeout(timer); // Bersihkan timer saat komponen di-unmount
  }, [currentIndex, images.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-12">
      {/* Gambar Slideshow */}
      <div className="w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = `https://picsum.photos/seed/slide${index}/800/600?grayscale`)}
            />
          </div>
        ))}
      </div>
      
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Teks Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
        <h2 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
          Selamat Datang
        </h2>
        <p className="mt-2 text-lg md:text-2xl font-light" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
          di Dapur Mama
        </p>
      </div>
      
      {/* Navigasi Titik */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
