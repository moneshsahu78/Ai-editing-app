import React, { useState, useCallback } from 'react';
import { ImageFile } from './types';
import { editImageWithGemini } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import PromptControls from './components/PromptControls';
import ImageDisplay from './components/ImageDisplay';
import Header from './components/Header';
import { LoaderCircle } from 'lucide-react';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((imageFile: ImageFile) => {
    setOriginalImage(imageFile);
    setEditedImage(null);
    setError(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and enter an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const newImageBase64 = await editImageWithGemini(
        originalImage.base64,
        originalImage.mimeType,
        prompt
      );
      if (newImageBase64) {
        setEditedImage(`data:image/png;base64,${newImageBase64}`);
      } else {
        throw new Error('The model did not return an image. Please try a different prompt.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(errorMessage);
      setError(`Generation failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800/50 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm border border-gray-700">
            {!originalImage && <ImageUploader onImageUpload={handleImageUpload} />}
            
            {originalImage && (
              <div className="flex flex-col gap-8">
                <PromptControls
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onGenerate={handleGenerate}
                  isLoading={isLoading}
                  onClear={() => {
                    setOriginalImage(null);
                    setEditedImage(null);
                    setPrompt('');
                    setError(null);
                  }}
                />
                {error && (
                  <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <ImageDisplay title="Original Image" imageUrl={originalImage.url} />
                  <div className="relative">
                    {isLoading && (
                       <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/80 rounded-lg z-10">
                         <LoaderCircle className="w-16 h-16 animate-spin text-indigo-400" />
                         <p className="mt-4 text-lg">Editing your image...</p>
                       </div>
                    )}
                    <ImageDisplay title="Edited Image" imageUrl={editedImage} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
