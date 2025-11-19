
import React, { useState } from 'react';
import { generateImage, editImage, generateVideo } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const ImageStudio: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [videoPrompt, setVideoPrompt] = useState<string>('');
  
  const [baseImage, setBaseImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [baseImagePreview, setBaseImagePreview] = useState<string | null>(null);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3' | '3:4'>('1:1');
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');


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
      }
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

    if (!window.aistudio || !await window.aistudio.hasSelectedApiKey()) {
        try {
            await window.aistudio.openSelectKey();
        } catch (e) {
            setError("Você precisa selecionar uma chave de API para gerar vídeos. Por favor, atualize a página e tente novamente.");
            return;
        }
    }

    setIsLoading(true);
    setError(null);
    setGeneratedVideo(null);
    try {
        const result = await generateVideo(videoPrompt, baseImage, videoAspectRatio);
        setGeneratedVideo(result);
    } catch (err: any) {
        if (err.message.includes("Requested entity was not found.")) {
             setError("A chave de API selecionada é inválida. Por favor, selecione outra chave.");
        } else {
            setError(err.message || 'Ocorreu um erro ao gerar o vídeo.');
        }
    } finally {
        setIsLoading(false);
    }
  };

  const sectionStyle = {
    background: 'rgba(20, 20, 20, 0.6)', 
    backdropFilter: 'blur(10px)',
    padding: '30px', 
    borderRadius: '16px', 
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '15px'
  };

  const inputStyle = {
    width: '100%', 
    padding: '15px', 
    backgroundColor: 'rgba(255,255,255,0.03)', 
    border: '1px solid rgba(255,255,255,0.1)', 
    color: '#F0F0F0', 
    borderRadius: '8px',
    fontFamily: 'Montserrat, sans-serif',
    resize: 'none' as 'none',
    outline: 'none'
  };

  const buttonStyle = { 
      width: '100%',
      padding: '15px', 
      backgroundColor: '#D4AF37',
      backgroundImage: 'linear-gradient(45deg, #D4AF37 0%, #F2D06B 100%)',
      color: '#050505',
      fontWeight: 600,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9em',
      textTransform: 'uppercase' as 'uppercase',
      letterSpacing: '2px',
      boxShadow: '0 5px 15px rgba(212, 175, 55, 0.15)',
      transition: 'transform 0.2s'
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ color: '#F0F0F0', margin: 0, fontSize: '2.5em', fontWeight: 400 }}>ESTÚDIO CRIATIVO</h2>
        <p style={{ color: '#D4AF37', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8em' }}>Imagen 4 & Veo Generation Engine</p>
      </div>
      
      {error && <p style={{ color: '#E87A5E', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}
      {isLoading && <LoadingSpinner />}

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px'}}>

        {/* GERAÇÃO (TEXTO -> IMAGEM) */}
        <div style={sectionStyle}>
          <div style={{borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px', marginBottom: '10px'}}>
              <h3 style={{margin:0, color: '#F0F0F0', fontSize: '1.2em', letterSpacing: '1px'}}>Criação Ex-Nihilo</h3>
              <p style={{margin:0, color: '#666', fontSize: '0.8em'}}>Gerar imagens do zero via prompt</p>
          </div>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva sua visão com precisão poética..."
            rows={4}
            style={inputStyle}
          />
          
          <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value as any)} style={inputStyle}>
              <option value="1:1">1:1 (Quadrado - Instagram)</option>
              <option value="16:9">16:9 (Cinemático)</option>
              <option value="9:16">9:16 (Stories/Reels)</option>
              <option value="4:3">4:3 (Editorial)</option>
              <option value="3:4">3:4 (Retrato)</option>
          </select>

          <button onClick={handleGenerateImage} disabled={isLoading} style={buttonStyle}>Materializar Imagem</button>
          
          {generatedImage && (
              <div style={{ marginTop: '15px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                  <img src={generatedImage} alt="Imagem gerada" style={{width: '100%', display: 'block'}} />
              </div>
          )}
        </div>
        
        {/* EDIÇÃO E VIDEO (IMAGEM -> VIDEO/EDIT) */}
        <div style={sectionStyle}>
          <div style={{borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px', marginBottom: '10px'}}>
              <h3 style={{margin:0, color: '#F0F0F0', fontSize: '1.2em', letterSpacing: '1px'}}>Transmutação & Movimento</h3>
              <p style={{margin:0, color: '#666', fontSize: '0.8em'}}>Editar imagens ou criar vídeos (Veo)</p>
          </div>

          <div style={{ 
              border: '1px dashed rgba(255,255,255,0.2)', 
              borderRadius: '8px', 
              padding: '20px', 
              textAlign: 'center', 
              cursor: 'pointer', 
              backgroundColor: 'rgba(0,0,0,0.2)',
              transition: 'all 0.3s'
          }}>
            <label htmlFor="base-image-upload" style={{color: '#A0A0A0', cursor: 'pointer', display: 'block'}}>
                {baseImagePreview ? 'Trocar Imagem Base' : 'Carregar Imagem Base'}
            </label>
            <input id="base-image-upload" type="file" accept="image/*" onChange={handleBaseImageChange} style={{display: 'none'}} />
          </div>
          
          {baseImagePreview && (
             <div style={{ borderRadius: '8px', overflow: 'hidden', maxHeight: '200px' }}>
                  <img src={baseImagePreview} alt="Base" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7}} />
             </div>
          )}

          {baseImage && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px'}}>
              
              {/* Edit Block */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                  <h4 style={{color: '#D4AF37', fontSize: '0.9em', textTransform: 'uppercase', marginBottom: '10px'}}>Edição Inteligente</h4>
                  <textarea
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder="Comando de edição (ex: adicionar óculos de sol)"
                    rows={2}
                    style={inputStyle}
                  />
                  <button onClick={handleEditImage} disabled={isLoading} style={{...buttonStyle, marginTop: '10px', backgroundColor: '#333', backgroundImage: 'none', color: '#D4AF37', border: '1px solid #D4AF37'}}>Aplicar Edição</button>
                  {editedImage && <img src={editedImage} alt="Editada" style={{width: '100%', marginTop: '10px', borderRadius: '8px', border: '1px solid #444'}} />}
              </div>
            
              {/* Video Block */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                   <h4 style={{color: '#D4AF37', fontSize: '0.9em', textTransform: 'uppercase', marginBottom: '10px'}}>Geração de Vídeo (Veo)</h4>
                   <textarea
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="Instrução de movimento..."
                    rows={2}
                    style={inputStyle}
                  />
                   <select value={videoAspectRatio} onChange={e => setVideoAspectRatio(e.target.value as any)} style={{...inputStyle, marginTop: '10px'}}>
                      <option value="16:9">16:9 (Paisagem)</option>
                      <option value="9:16">9:16 (Retrato)</option>
                  </select>
                  <button onClick={handleGenerateVideo} disabled={isLoading} style={{...buttonStyle, marginTop: '10px'}}>Renderizar Vídeo</button>
                  {generatedVideo && <video src={generatedVideo} controls style={{width: '100%', marginTop: '15px', borderRadius: '8px', border: '1px solid #D4AF37'}} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageStudio;
