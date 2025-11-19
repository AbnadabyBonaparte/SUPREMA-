
import React, { useState } from 'react';
import { getStyleRecommendations } from '../services/geminiService';
import { StyleRecommendation } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ResultCard from './ResultCard';

const StyleConsultant: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [image, setImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [recommendations, setRecommendations] = useState<StyleRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { 
         setError("O tamanho da imagem deve ser inferior a 4MB.");
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage({ data: base64String, mimeType: file.type });
        setImagePreview(reader.result as string);
        setError(null);
      };
      reader.onerror = () => {
          setError("Falha ao ler o arquivo de imagem.");
      }
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt && !image) {
      setError('Forneça uma descrição ou uma imagem.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const imageParts = image ? [{ inlineData: image }] : undefined;
      const result = await getStyleRecommendations(prompt, 'mens_style', imageParts);
      setRecommendations(result);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{color: '#B4A9FF'}}>Consultora de Estilo AI (com Modo de Raciocínio)</h2>
      <p>Descreva seu estilo, o evento para o qual está se vestindo, ou carregue uma foto sua ou de um item que queira estilizar. Nossa IA mais poderosa analisará seu pedido.</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: 'Vou a um casamento de verão e quero parecer elegante, mas confortável.'"
          rows={5}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#2d2a2e', border: '1px solid #4A5568', color: '#F4F0EC', borderRadius: '5px' }}
        />
        <div style={{
            border: '2px dashed #4A5568',
            borderRadius: '5px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer'
        }}>
            <label htmlFor="image-upload" style={{color: '#B4A9FF', cursor: 'pointer'}}>Carregue uma imagem (opcional, máx 4MB)</label>
            <input 
                id="image-upload"
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                style={{display: 'none'}}
            />
        </div>

        {imagePreview && (
            <div style={{marginTop: '15px', border: '1px solid #B4A9FF', padding: '5px', borderRadius: '5px', display: 'inline-block'}}>
                <img src={imagePreview} alt="upload preview" style={{maxWidth: '200px', maxHeight: '200px', borderRadius: '5px'}} />
            </div>
        )}

        <button type="submit" disabled={isLoading} style={{ 
            marginTop: '20px', 
            padding: '12px 25px', 
            backgroundColor: '#E87A5E', 
            color: '#121014',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em'
        }}>
          {isLoading ? 'Analisando...' : 'Obter Recomendações'}
        </button>
      </form>

      {error && <p style={{ color: '#E87A5E' }}>{error}</p>}
      
      {isLoading && <LoadingSpinner />}

      <div style={{marginTop: '30px'}}>
        {recommendations.map((rec, index) => (
          <ResultCard key={index} recommendation={rec} />
        ))}
      </div>
    </div>
  );
};

export default StyleConsultant;
