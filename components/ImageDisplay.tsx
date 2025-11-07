import React from 'react';
import { Image } from 'lucide-react';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      <div className="aspect-square w-full bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        ) : (
          <div className="text-gray-500 flex flex-col items-center">
            <Image className="w-16 h-16" />
            <p className="mt-2">Waiting for image...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
