import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Sliders, Download, Trash2, RotateCw, ZoomIn, SunMoon, Contrast, Palette } from 'lucide-react';

interface EditorState {
  brightness: number;
  contrast: number;
  saturation: number;
  scale: number;
}

export default function ImageEditor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editorState, setEditorState] = useState<EditorState>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    scale: 100,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSliderChange = (property: keyof EditorState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditorState(prev => ({
      ...prev,
      [property]: parseInt(e.target.value),
    }));
  };

  const resetEdits = () => {
    setEditorState({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      scale: 100,
    });
  };

  const clearImage = () => {
    setSelectedImage(null);
    resetEdits();
  };

  const imageStyle = {
    filter: `brightness(${editorState.brightness}%) contrast(${editorState.contrast}%) saturate(${editorState.saturation}%)`,
    transform: `scale(${editorState.scale / 100})`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Cumulonimbus Photo Editor
          </h1>
          <p className="text-gray-400">Professional-grade photo editing in your browser</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-2xl">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="max-h-full max-w-full transition-all duration-200"
                  style={imageStyle}
                />
              ) : (
                <div className="text-center p-8">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-500">Upload an image to get started</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
                <Upload className="w-5 h-5" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
                <span>Save Image</span>
              </button>
              <button
                onClick={resetEdits}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <RotateCw className="w-5 h-5" />
                <span>Reset</span>
              </button>
              <button 
                onClick={clearImage}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Sliders className="w-5 h-5" />
              Adjustments
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <SunMoon className="w-4 h-4" />
                  Brightness
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={editorState.brightness}
                  onChange={handleSliderChange('brightness')}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <Contrast className="w-4 h-4" />
                  Contrast
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={editorState.contrast}
                  onChange={handleSliderChange('contrast')}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <Palette className="w-4 h-4" />
                  Saturation
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={editorState.saturation}
                  onChange={handleSliderChange('saturation')}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <ZoomIn className="w-4 h-4" />
                  Scale
                </label>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={editorState.scale}
                  onChange={handleSliderChange('scale')}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}