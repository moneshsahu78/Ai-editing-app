import React, { useCallback } from 'react';
import { ImageFile } from '../types';
import { fileToBase64 } from '../utils/fileUtils';
import { UploadCloud } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageFile: ImageFile) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        const url = URL.createObjectURL(file);
        onImageUpload({ url, base64, mimeType: file.type });
      } catch (error) {
        console.error('Error converting file to base64:', error);
        // You might want to show an error message to the user here
      }
    }
  }, [onImageUpload]);

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
          <UploadCloud className="w-12 h-12 mb-4 text-gray-400" />
          <p className="mb-2 text-lg font-semibold text-gray-300">
            <span className="font-bold text-indigo-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-gray-500">PNG, JPG, or WEBP</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
