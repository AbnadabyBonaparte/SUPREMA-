
import React, { useState, useRef, useEffect } from 'react';
import { getStyleRecommendations } from '../services/geminiService';
import { StyleRecommendation, ProfessionalType, Trend } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ResultCard from './ResultCard';

interface SmartConsultationProps {
    professional: ProfessionalType;
    initialTrend: Trend | null;
    onBack: () => void;
    onSchedule: () => void; 
}

const agentTitles: Record<ProfessionalType, { title: string; subtitle: string }> = {
    barber_x0: { title: "Barbeiro Supreme", subtitle: "Matriz Transcendental" },
    grooming_master: { title: "Grooming Master", subtitle: "Skincare Masculino Avançado" },
    beard_expert: { title: "Beard Expert", subtitle: "Design de Barba & Crescimento" },
    mens_style: { title: "Men's Style", subtitle: "Consultoria de Imagem Total" },
    cabeleireira_x0: { title: "Cabeleireira X.0", subtitle: "Hair Design & Saúde Feminina" },
    colorista_x0: { title: "Colorista X.0", subtitle: "Colorimetria & Nuances" },
    hair_stylist_x0: { title: "Hair Stylist", subtitle: "Penteados de Alta Costura" },
    makeup_artist_x0: { title: "Makeup Artist", subtitle: "Visagismo & Maquiagem" },
    beauty_guru: { title: "Beauty Guru", subtitle: "Beleza Holística & Rotina" },
    skincare_expert: { title: "Skincare Expert", subtitle: "Dermatologia Estética AI" },
    bronze_master: { title: "Bronze Master", subtitle: "Tanning & Skin Glow" },
    body_sculptor: { title: "Body Sculptor", subtitle: "Modelagem Corporal & Wellness" },
    spa_therapist: { title: "Spa Therapist", subtitle: "Terapias de Relaxamento" },
    nail_artist_x0: { title: "Nail Artist", subtitle: "Design de Unhas & Art" },
    lash_expert: { title: "Lash Expert", subtitle: "Extensão de Cílios" },
    brow_designer: { title: "Brow Designer", subtitle: "Arquitetura Facial" },
    tattoo_artist: { title: "Tattoo Artist", subtitle: "Body Art Design" },
    piercing_master: { title: "Piercing Master", subtitle: "Joalheria & Anatomia" },
    aesthetic_doctor: { title: "Aesthetic Doctor", subtitle: "Harmonização & Procedimentos" }
};

const SmartConsultation: React.FC<SmartConsultationProps> = ({ professional, initialTrend, onBack, onSchedule }) => {
  const [prompt, setPrompt] = useState<string>('');
  // Changed to Array for multi-shot analysis
  const [images, setImages] = useState<{ data: string; mimeType: string }[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [recommendations, setRecommendations] = useState<StyleRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Camera logic
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { title, subtitle } = agentTitles[professional] || { title: "Agente Especialista", subtitle: "Consultoria AI" };

  // Load trend if available
  useEffect(() => {
      if (initialTrend) {
          setPrompt(initialTrend.promptContext);
          // Optional: We could auto-load the trend image here if we convert URL to base64, 
          // but for now we just use the text context to guide the AI.
      }
  }, [initialTrend]);

  const startCamera = async () => {
      try {
          setIsCameraOpen(true);
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
          if (videoRef.current) {
              videoRef.current.srcObject = stream;
          }
      } catch (err) {
          setError("Não foi possível acessar a câmera. Verifique as permissões.");
          setIsCameraOpen(false);
      }
  };

  const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
          videoRef.current.srcObject = null;
      }
      setIsCameraOpen(false);
  };

  const capturePhoto = () => {
      if (videoRef.current && canvasRef.current) {
          const context = canvasRef.current.getContext('2d');
          if (context) {
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
              context.drawImage(videoRef.current, 0, 0);
              const dataUrl = canvasRef.current.toDataURL('image/jpeg');
              
              // Add to arrays
              if (images.length < 5) {
                  setImagePreviews(prev => [...prev, dataUrl]);
                  setImages(prev => [...prev, { data: dataUrl.split(',')[1], mimeType: 'image/jpeg' }]);
              } else {
                  setError("Máximo de 5 fotos atingido.");
              }
              
              stopCamera();
          }
      }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      const remainingSlots = 5 - images.length;
      
      if (files.length > remainingSlots) {
          setError(`Você só pode adicionar mais ${remainingSlots} fotos.`);
          return;
      }

      files.forEach(file => {
          if (file.size > 4 * 1024 * 1024) { 
             setError("Uma das imagens é muito grande (máx 4MB).");
             return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            setImages(prev => [...prev, { data: base64String, mimeType: file.type }]);
            setImagePreviews(prev => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
      });
      setError(null);
    }
  };

  const removeImage = (index: number) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);

      const newPreviews = [...imagePreviews];
      newPreviews.splice(index, 1);
      setImagePreviews(newPreviews);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt && images.length === 0) {
      setError('Para uma análise precisa, forneça uma descrição ou fotos.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const imageParts = images.map(img => ({ inlineData: img }));
      const result = await getStyleRecommendations(prompt, professional, imageParts);
      setRecommendations(result);
    } catch (err: any) {
      setError(err.message || 'Erro de conexão com a Matriz.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <button onClick={onBack} style={{ 
          background: 'none', 
          border: 'none', 
          color: '#666', 
          cursor: 'pointer', 
          marginBottom: '30px',
          fontSize: '0.9em',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
      }}>&larr; Voltar ao Ecossistema</button>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ color: '#F0F0F0', margin: 0, fontSize: '2.5em', fontWeight: 400 }}>{title}</h2>
        <p style={{ color: '#D4AF37', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8em' }}>{subtitle}</p>
      </div>

      {/* TREND CONTEXT ALERT */}
      {initialTrend && (
          <div style={{ 
              maxWidth: '800px', margin: '0 auto 30px auto', padding: '15px', 
              background: 'rgba(212, 175, 55, 0.1)', border: '1px solid #D4AF37', borderRadius: '8px',
              display: 'flex', alignItems: 'center', gap: '15px'
          }}>
              <img src={initialTrend.image} alt="ref" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                  <div style={{ color: '#D4AF37', fontSize: '0.8em', textTransform: 'uppercase', fontWeight: 'bold' }}>Modo de Inspiração Ativado</div>
                  <div style={{ color: '#FFF' }}>Referência: {initialTrend.title} ({initialTrend.celebrityRef})</div>
              </div>
          </div>
      )}
      
      <div style={{ 
          background: 'rgba(20, 20, 20, 0.6)', 
          backdropFilter: 'blur(10px)',
          padding: '40px', 
          borderRadius: '16px', 
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
      }}>
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {/* Image Upload Section */}
                <div>
                     <div style={{
                        border: '1px dashed rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        minHeight: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '10px'
                    }}>
                        {isCameraOpen ? (
                            <>
                                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button type="button" onClick={capturePhoto} style={{
                                    position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                                    background: '#F00', width: '50px', height: '50px', borderRadius: '50%', border: '3px solid #FFF', cursor: 'pointer', zIndex: 10
                                }}></button>
                            </>
                        ) : (
                            <>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '20px', width: '100%' }}>
                                    {imagePreviews.length > 0 ? imagePreviews.map((preview, idx) => (
                                        <div key={idx} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #444' }}>
                                            <img src={preview} alt={`upload ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button type="button" onClick={() => removeImage(idx)} style={{
                                                position: 'absolute', top: 0, right: 0, background: 'rgba(0,0,0,0.7)', color: '#FFF', border: 'none', cursor: 'pointer', fontSize: '0.8em', width: '20px', height: '20px'
                                            }}>×</button>
                                        </div>
                                    )) : (
                                        <div style={{ textAlign: 'center', padding: '20px' }}>
                                            <span style={{ fontSize: '2em', display: 'block', marginBottom: '10px' }}>📸</span>
                                            <p style={{color: '#888', fontSize: '0.9em'}}>Adicione até 5 fotos para Análise 3D</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Buttons Overlay */}
                        {!isCameraOpen && images.length < 5 && (
                            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                                <label htmlFor="image-upload" style={{
                                    padding: '8px 15px', background: '#333', color: '#FFF', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8em', border: '1px solid #555'
                                }}>
                                    + Arquivos
                                </label>
                                <input id="image-upload" type="file" accept="image/*" multiple onChange={handleImageChange} style={{display: 'none'}} />
                                
                                <button type="button" onClick={startCamera} style={{
                                    padding: '8px 15px', background: '#D4AF37', color: '#000', borderRadius: '4px', cursor: 'pointer', border: 'none', fontWeight: 'bold', fontSize: '0.8em'
                                }}>
                                    Câmera
                                </button>
                            </div>
                        )}
                        {images.length >= 5 && <p style={{color: '#D4AF37', fontSize: '0.8em', marginTop: '10px'}}>Limite de fotos atingido.</p>}
                    </div>
                </div>

                {/* Text Input Section */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <label style={{ color: '#D4AF37', fontSize: '0.8em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Diretrizes para a IA</label>
                     <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Descreva seu objetivo, ocasião ou estilo desejado com detalhes..."
                        rows={6}
                        style={{ 
                            width: '100%', 
                            padding: '20px', 
                            backgroundColor: 'rgba(255,255,255,0.03)', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            color: '#F0F0F0', 
                            borderRadius: '8px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '1em',
                            resize: 'none',
                            outline: 'none',
                            flex: 1
                        }}
                    />
                </div>
            </div>

            <button type="submit" disabled={isLoading} style={{ 
                width: '100%',
                marginTop: '30px',
                padding: '20px', 
                backgroundColor: '#D4AF37',
                backgroundImage: 'linear-gradient(45deg, #D4AF37 0%, #F2D06B 100%)',
                color: '#050505',
                fontWeight: 600,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1em',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)',
                transition: 'transform 0.2s'
            }}>
                {isLoading ? 'Processando Análise Transcendental...' : 'Executar Análise'}
            </button>
        </form>
      </div>

      {error && <p style={{ color: '#ef4444', marginTop: '20px', textAlign: 'center' }}>{error}</p>}
      
      {isLoading && <LoadingSpinner />}

      <div style={{marginTop: '50px'}}>
        {recommendations.map((rec, index) => (
          <div key={index}>
              {/* Pass only the first image for simple Try-On simulation for now, and Pass PROFESSIONAL type */}
              <ResultCard 
                  recommendation={rec} 
                  userImage={images.length > 0 ? images[0] : undefined} 
                  professional={professional}
              />
              
              <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '50px' }}>
                   <p style={{ color: '#888', marginBottom: '10px', fontSize: '0.9em' }}>Gostou deste resultado?</p>
                   <button onClick={onSchedule} style={{
                       padding: '15px 40px',
                       backgroundColor: 'transparent',
                       border: '2px solid #D4AF37',
                       color: '#D4AF37',
                       fontSize: '1em',
                       textTransform: 'uppercase',
                       letterSpacing: '2px',
                       cursor: 'pointer',
                       borderRadius: '50px',
                       transition: 'all 0.3s'
                   }}
                   onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D4AF37'; e.currentTarget.style.color = '#000'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#D4AF37'; }}
                   >
                       Agendar Profissional Agora
                   </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartConsultation;
