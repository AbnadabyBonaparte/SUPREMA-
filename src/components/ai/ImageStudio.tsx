import React, { useState } from 'react';
import { generateImage, editImage, generateVideo } from '@/services/ai/geminiService';

type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
type VideoAspectRatio = '16:9' | '9:16';

export function ImageStudio() {
  const [activeTab, setActiveTab] = useState<'generate' | 'edit' | 'video'>('generate');
  
  // Generate states
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // Edit states
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [baseImage, setBaseImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [baseImagePreview, setBaseImagePreview] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  
  // Video states
  const [videoPrompt, setVideoPrompt] = useState<string>('');
  const [videoAspectRatio, setVideoAspectRatio] = useState<VideoAspectRatio>('16:9');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBaseImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError("O tamanho da imagem deve ser inferior a 4MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setBaseImage({ data: base64String, mimeType: file.type });
        setBaseImagePreview(reader.result as string);
        setError(null);
      };
      reader.onerror = () => {
        setError("Falha ao ler o arquivo de imagem.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async () => {
    if (!prompt) {
      setError("Por favor, forneça um prompt para gerar a imagem.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const result = await generateImage(prompt, aspectRatio);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao gerar a imagem.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditImage = async () => {
    if (!editPrompt || !baseImage) {
      setError("Por favor, forneça uma imagem base e um prompt de edição.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImage(null);
    try {
      const result = await editImage(editPrompt, baseImage);
      setEditedImage(result);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao editar a imagem.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt || !baseImage) {
      setError("Por favor, forneça uma imagem base e um prompt para o vídeo.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedVideo(null);
    try {
      const result = await generateVideo(videoPrompt, baseImage, videoAspectRatio);
      setGeneratedVideo(result);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao gerar o vídeo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-light text-foreground mb-2">ESTÚDIO CRIATIVO</h2>
        <p className="text-[#D4AF37] text-xs uppercase tracking-[2px]">Imagen 4 & Veo Generation Engine</p>
      </div>
      
      {/* Error Message */}
      {error && <p className="text-red-400 text-center mb-5">{error}</p>}
      
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center mb-5">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-center mb-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab('generate')}
          className={`px-6 py-3 text-sm uppercase tracking-wider transition-colors ${
            activeTab === 'generate' 
              ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Gerar
        </button>
        <button
          onClick={() => setActiveTab('edit')}
          className={`px-6 py-3 text-sm uppercase tracking-wider transition-colors ${
            activeTab === 'edit' 
              ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Editar
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`px-6 py-3 text-sm uppercase tracking-wider transition-colors ${
            activeTab === 'video' 
              ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Vídeo
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* GENERATE TAB */}
        {activeTab === 'generate' && (
          <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl">
            <div className="border-b border-white/5 pb-4 mb-6">
              <h3 className="text-xl font-light text-foreground tracking-wider">Criação Ex-Nihilo</h3>
              <p className="text-xs text-muted-foreground">Gerar imagens do zero via prompt</p>
            </div>
            
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Descreva sua visão com precisão poética..."
                rows={4}
                className="w-full p-4 bg-white/5 border border-white/10 text-foreground rounded-lg resize-none outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
              
              <select 
                value={aspectRatio} 
                onChange={e => setAspectRatio(e.target.value as AspectRatio)}
                className="w-full p-4 bg-white/5 border border-white/10 text-foreground rounded-lg outline-none focus:border-[#D4AF37]/50 transition-colors"
              >
                <option value="1:1">1:1 (Quadrado - Instagram)</option>
                <option value="16:9">16:9 (Cinemático)</option>
                <option value="9:16">9:16 (Stories/Reels)</option>
                <option value="4:3">4:3 (Editorial)</option>
                <option value="3:4">3:4 (Retrato)</option>
              </select>

              <button 
                onClick={handleGenerateImage} 
                disabled={isLoading}
                className="w-full px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] text-black font-semibold rounded uppercase tracking-[2px] shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Materializar Imagem
              </button>
              
              {generatedImage && (
                <div className="mt-4 rounded-lg overflow-hidden border border-[#D4AF37]/30">
                  <img src={generatedImage} alt="Imagem gerada" className="w-full block" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* EDIT TAB */}
        {activeTab === 'edit' && (
          <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl">
            <div className="border-b border-white/5 pb-4 mb-6">
              <h3 className="text-xl font-light text-foreground tracking-wider">Transmutação</h3>
              <p className="text-xs text-muted-foreground">Editar imagens existentes</p>
            </div>

            <div className="space-y-4">
              {/* Image Upload */}
              <div className="border border-dashed border-white/20 rounded-lg p-5 text-center cursor-pointer bg-black/20 hover:bg-black/30 transition-colors">
                <label htmlFor="base-image-upload" className="text-muted-foreground cursor-pointer block">
                  {baseImagePreview ? 'Trocar Imagem Base' : 'Carregar Imagem Base'}
                </label>
                <input 
                  id="base-image-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleBaseImageChange} 
                  className="hidden" 
                />
              </div>
              
              {baseImagePreview && (
                <div className="rounded-lg overflow-hidden max-h-48">
                  <img src={baseImagePreview} alt="Base" className="w-full h-full object-cover opacity-70" />
                </div>
              )}

              {baseImage && (
                <>
                  <textarea
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder="Comando de edição (ex: adicionar óculos de sol)"
                    rows={2}
                    className="w-full p-4 bg-white/5 border border-white/10 text-foreground rounded-lg resize-none outline-none focus:border-[#D4AF37]/50 transition-colors"
                  />
                  
                  <button 
                    onClick={handleEditImage} 
                    disabled={isLoading}
                    className="w-full px-6 py-4 bg-gray-800 text-[#D4AF37] font-semibold rounded uppercase tracking-[2px] border border-[#D4AF37] hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Aplicar Edição
                  </button>
                  
                  {editedImage && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-gray-700">
                      <img src={editedImage} alt="Editada" className="w-full" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* VIDEO TAB */}
        {activeTab === 'video' && (
          <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl">
            <div className="border-b border-white/5 pb-4 mb-6">
              <h3 className="text-xl font-light text-foreground tracking-wider">Geração de Vídeo (Veo)</h3>
              <p className="text-xs text-muted-foreground">Criar vídeos a partir de imagens</p>
            </div>

            <div className="space-y-4">
              {/* Image Upload */}
              <div className="border border-dashed border-white/20 rounded-lg p-5 text-center cursor-pointer bg-black/20 hover:bg-black/30 transition-colors">
                <label htmlFor="video-base-image" className="text-muted-foreground cursor-pointer block">
                  {baseImagePreview ? 'Trocar Imagem Base' : 'Carregar Imagem Base'}
                </label>
                <input 
                  id="video-base-image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleBaseImageChange} 
                  className="hidden" 
                />
              </div>
              
              {baseImagePreview && (
                <div className="rounded-lg overflow-hidden max-h-48">
                  <img src={baseImagePreview} alt="Base" className="w-full h-full object-cover opacity-70" />
                </div>
              )}

              {baseImage && (
                <>
                  <textarea
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="Instrução de movimento..."
                    rows={2}
                    className="w-full p-4 bg-white/5 border border-white/10 text-foreground rounded-lg resize-none outline-none focus:border-[#D4AF37]/50 transition-colors"
                  />
                  
                  <select 
                    value={videoAspectRatio} 
                    onChange={e => setVideoAspectRatio(e.target.value as VideoAspectRatio)}
                    className="w-full p-4 bg-white/5 border border-white/10 text-foreground rounded-lg outline-none focus:border-[#D4AF37]/50 transition-colors"
                  >
                    <option value="16:9">16:9 (Paisagem)</option>
                    <option value="9:16">9:16 (Retrato)</option>
                  </select>
                  
                  <button 
                    onClick={handleGenerateVideo} 
                    disabled={isLoading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] text-black font-semibold rounded uppercase tracking-[2px] shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Renderizar Vídeo
                  </button>
                  
                  {generatedVideo && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-[#D4AF37]">
                      <video src={generatedVideo} controls className="w-full" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
