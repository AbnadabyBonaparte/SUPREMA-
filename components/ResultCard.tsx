
import React, { useState } from 'react';
import { StyleRecommendation, ProfessionalType } from '../types';
import { editImage, generateImage, playTextAsSpeech } from '../services/geminiService';

interface ResultCardProps {
  recommendation: StyleRecommendation;
  userImage?: { data: string; mimeType: string };
  professional?: ProfessionalType;
}

const ResultCard: React.FC<ResultCardProps> = ({ recommendation, userImage, professional }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedImage, setSimulatedImage] = useState<string | null>(null);
  const [simulationError, setSimulationError] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Função para gerar o prompt correto baseado no profissional (Anatomia Contextual)
  const getPromptForProfessional = (prof: ProfessionalType | undefined, styleName: string, desc: string) => {
      const baseDesc = `Apply this style: "${styleName} - ${desc}".`;
      
      switch (prof) {
          case 'nail_artist_x0':
              return `${baseDesc} Focus on the HANDS. Replace fingernails with this exact nail art design. Keep fingers, skin tone, and background exactly the same. High realism manicure.`;
          case 'bronze_master':
              return `${baseDesc} Focus on SKIN TONE. Apply a natural golden bronze tan to the person's skin. Do NOT change facial features or clothing (bikini/outfit). Keep identity strictly preserved. Sun-kissed glow.`;
          case 'aesthetic_doctor':
          case 'skincare_expert':
              return `${baseDesc} Focus on FACE. Apply subtle aesthetic enhancement (smooth skin, lip filler simulation, or harmonization) as described. Keep identity 100% preserved. Medical aesthetic photography.`;
          case 'makeup_artist_x0':
              return `${baseDesc} Focus on FACE. Apply professional makeup matching the description. Keep bone structure and identity. High fashion beauty shot.`;
          case 'tattoo_artist':
              return `${baseDesc} Focus on SKIN. Apply the tattoo design described to the visible skin area. Keep anatomy and lighting consistent. Ink realism.`;
          case 'body_sculptor':
              return `${baseDesc} Focus on BODY SHAPE. Subtly contour the body physique according to the description. Keep clothing and face intact.`;
          default:
              // Cabelo e Barba (Default)
              return `Change the person's hair/beard to strictly match this style: "${styleName} - ${desc}". KEEP FACIAL FEATURES EXACTLY THE SAME. High realism, 8k resolution, professional photography lighting.`;
      }
  };

  const handleTryOn = async () => {
      setIsSimulating(true);
      setSimulationError(null);
      try {
          let resultUrl: string;
          if (userImage) {
              // Se tem imagem do usuário, faz edição (Face ID Preservation)
              const prompt = getPromptForProfessional(professional, recommendation.outfitName, recommendation.description);
              resultUrl = await editImage(prompt, userImage);
          } else {
              // Se não tem, gera modelo
              const prompt = `A photorealistic portrait of a model wearing this exact style: "${recommendation.outfitName} - ${recommendation.description}". Professional studio lighting, 8k resolution, high fashion photography.`;
              resultUrl = await generateImage(prompt, '9:16');
          }
          setSimulatedImage(resultUrl);
      } catch (error: any) {
          setSimulationError("Não foi possível gerar a simulação visual no momento.");
      } finally {
          setIsSimulating(false);
      }
  };

  const handlePlayAudio = async () => {
      setIsPlayingAudio(true);
      try {
          const textToRead = `Recomendação para ${recommendation.outfitName}. ${recommendation.description}. Análise técnica: ${recommendation.technicalAnalysis || ''}`;
          await playTextAsSpeech(textToRead);
      } catch (e) {
          console.error("Audio playback failed", e);
      } finally {
          setIsPlayingAudio(false);
      }
  };

  // --- VIRAL LOOP ENGINE (WEB SHARE API) ---
  const dataURLtoFile = (dataurl: string, filename: string) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
  };

  const handleNativeShare = async (platform: 'whatsapp' | 'instagram' | 'generic') => {
      if (!simulatedImage) return;

      let caption = "";
      if (platform === 'instagram') caption = `Minha versão 2025 desbloqueada na Alsham! ✨ O que acharam? 🔥 #AlshamAI`;
      else if (platform === 'whatsapp') caption = `Gente, faço esse visual ou não? Olha o que a IA sugeriu! 😱👇`;
      else caption = `Testando o Ecossistema Alsham Suprema. Aprovado?`;

      // Verifica se o navegador suporta compartilhamento de arquivos (Mobile)
      if (navigator.share && navigator.canShare) {
          try {
              const file = dataURLtoFile(simulatedImage, 'alsham-transformation.jpg');
              const shareData = {
                  title: 'Alsham Transformation',
                  text: caption,
                  files: [file]
              };

              if (navigator.canShare(shareData)) {
                  await navigator.share(shareData);
                  return;
              }
          } catch (err) {
              console.log('Share API Error, falling back', err);
          }
      }

      // FALLBACK (Desktop ou navegadores antigos)
      // Copia texto e baixa imagem
      navigator.clipboard.writeText(caption);
      const link = document.createElement('a');
      link.href = simulatedImage;
      link.download = 'alsham-look.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("A imagem foi baixada e a legenda copiada! \nAgora é só abrir seu app preferido e colar.");
  };

  // Função auxiliar para pegar imagens de produtos (Mock inteligente - Imagens Corrigidas)
  const getProductImage = (productName: string) => {
      const name = productName.toLowerCase();
      if (name.includes('shampoo') || name.includes('condicionador')) return 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=150&q=80';
      if (name.includes('óleo') || name.includes('oil') || name.includes('serum')) return 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=150&q=80';
      if (name.includes('pomada') || name.includes('cera') || name.includes('gel')) return 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80';
      if (name.includes('batom') || name.includes('gloss')) return 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=150&q=80';
      if (name.includes('mascara') || name.includes('rímel')) return 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=150&q=80';
      if (name.includes('pincel') || name.includes('brush')) return 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=150&q=80';
      if (name.includes('esmalte') || name.includes('nail')) return 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?auto=format&fit=crop&w=150&q=80';
      if (name.includes('creme') || name.includes('hidratante')) return 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=150&q=80';
      
      return 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=150&q=80'; // Default luxury packaging
  };

  // Título do Botão Adaptativo
  const getButtonTitle = () => {
      if (isSimulating) return 'Processando IA...';
      if (professional === 'nail_artist_x0') return 'Simular Unhas na Minha Mão 💅';
      if (professional === 'bronze_master') return 'Simular Bronzeado na Minha Pele ☀️';
      if (professional === 'aesthetic_doctor') return 'Simular Procedimento Facial 💉';
      if (professional === 'tattoo_artist') return 'Simular Tattoo na Minha Pele 🐉';
      return 'Simular Visual em Mim ✨';
  };

  return (
    <div style={{ 
        background: '#121212',
        border: '1px solid #222',
        borderLeft: '4px solid #D4AF37',
        borderRadius: '8px', 
        padding: '40px', 
        margin: '30px 0', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden'
    }}>
      
      {/* HEADER DO CARD */}
      <div style={{ borderBottom: '1px solid #222', paddingBottom: '20px', marginBottom: '25px' }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
            <div>
                <h3 style={{ 
                    color: '#F0F0F0', 
                    fontSize: '2em', 
                    margin: '0 0 10px 0',
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 400
                }}>{recommendation.outfitName}</h3>
                <p style={{ color: '#888', fontFamily: "'Montserrat', sans-serif", lineHeight: '1.6' }}>{recommendation.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    onClick={handlePlayAudio}
                    disabled={isPlayingAudio}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid #333',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        cursor: 'pointer',
                        color: '#D4AF37',
                        fontSize: '1.2em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s'
                    }}
                    title="Ouvir Análise"
                >
                    {isPlayingAudio ? '🔊' : '🔈'}
                </button>
            </div>
        </div>
      </div>

      {/* ANÁLISE TÉCNICA */}
      {recommendation.technicalAnalysis && (
          <div style={{ 
              backgroundColor: 'rgba(212, 175, 55, 0.05)', 
              padding: '20px', 
              borderRadius: '4px', 
              marginBottom: '30px', 
              border: '1px solid rgba(212, 175, 55, 0.1)' 
            }}>
              <h4 style={{ color: '#D4AF37', margin: '0 0 10px 0', textTransform: 'uppercase', fontSize: '0.75em', letterSpacing: '2px' }}>Análise Técnica de Visagismo</h4>
              <p style={{ fontSize: '0.95em', margin: 0, color: '#DDD', lineHeight: '1.6' }}>{recommendation.technicalAnalysis}</p>
          </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        
        {/* COLUNA 1: EXECUÇÃO E SIMULAÇÃO */}
        <div>
            <h4 style={{ color: '#FFF', borderBottom: '1px solid #333', display: 'block', paddingBottom: '10px', marginBottom: '15px', fontSize: '1em', textTransform: 'uppercase', letterSpacing: '1px' }}>Execução</h4>
            <ul style={{ paddingLeft: '0', listStyle: 'none', color: '#A0A0A0', marginBottom: '30px' }}>
                {recommendation.items.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px', paddingLeft: '15px', borderLeft: '1px solid #444', fontSize: '0.95em' }}>{item}</li>
                ))}
            </ul>

            {/* BOTÃO TRY-ON / SIMULAÇÃO */}
            <div style={{ 
                background: 'rgba(0,0,0,0.3)', 
                padding: '20px', 
                borderRadius: '8px', 
                border: '1px dashed rgba(212, 175, 55, 0.3)',
                textAlign: 'center'
            }}>
                <h4 style={{ color: '#D4AF37', margin: '0 0 10px 0', fontSize: '0.9em', textTransform: 'uppercase' }}>Realidade Suprema</h4>
                <p style={{ fontSize: '0.8em', color: '#666', marginBottom: '15px' }}>
                    {userImage ? "Simular este procedimento na sua foto" : "Visualizar modelo com este estilo"}
                </p>
                
                {!simulatedImage ? (
                     <button 
                        onClick={handleTryOn} 
                        disabled={isSimulating}
                        style={{ 
                            padding: '12px 25px', 
                            backgroundColor: isSimulating ? '#333' : '#D4AF37', 
                            color: '#050505',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isSimulating ? 'wait' : 'pointer',
                            fontSize: '0.85em',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            width: '100%',
                            transition: 'all 0.3s'
                        }}>
                        {getButtonTitle()}
                    </button>
                ) : (
                    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '2px solid #D4AF37' }}>
                        <img src={simulatedImage} alt="Simulação" style={{ width: '100%', display: 'block' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', color: '#D4AF37', fontSize: '0.7em', padding: '5px', textTransform: 'uppercase', textAlign: 'center' }}>
                            Simulação IA Suprema
                        </div>
                    </div>
                )}
                {simulationError && <p style={{ color: '#E87A5E', fontSize: '0.8em', marginTop: '10px' }}>{simulationError}</p>}
                
                {/* SOCIAL SHARE MENU - VIRAL LOOP NATIVO */}
                {simulatedImage && (
                    <div style={{ marginTop: '20px', borderTop: '1px solid #333', paddingTop: '15px' }}>
                        <h5 style={{ color: '#F0F0F0', fontSize: '0.9em', margin: '0 0 15px 0' }}>Viralize este Look 🚀</h5>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button 
                                onClick={() => handleNativeShare('whatsapp')} 
                                style={{ 
                                    background: '#25D366', 
                                    border: 'none', 
                                    color: '#FFF', 
                                    padding: '12px', 
                                    borderRadius: '6px', 
                                    cursor: 'pointer', 
                                    fontSize: '0.9em', 
                                    fontWeight: 'bold',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    gap: '5px'
                                }}>
                                <span>📱 WhatsApp</span>
                            </button>
                            <button 
                                onClick={() => handleNativeShare('instagram')} 
                                style={{ 
                                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
                                    border: 'none', 
                                    color: '#FFF', 
                                    padding: '12px', 
                                    borderRadius: '6px', 
                                    cursor: 'pointer', 
                                    fontSize: '0.9em', 
                                    fontWeight: 'bold',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    gap: '5px'
                                }}>
                                <span>📸 Stories</span>
                            </button>
                        </div>
                        <button 
                            onClick={() => handleNativeShare('generic')} 
                            style={{ 
                                marginTop: '10px',
                                width: '100%',
                                background: '#333', 
                                border: '1px solid #444', 
                                color: '#CCC', 
                                padding: '10px', 
                                borderRadius: '6px', 
                                cursor: 'pointer', 
                                fontSize: '0.8em'
                            }}>
                            Outras Redes
                        </button>
                        <p style={{ fontSize: '0.65em', color: '#666', marginTop: '10px', fontStyle: 'italic' }}>
                            *Em computadores, a imagem será baixada e o texto copiado.
                        </p>
                    </div>
                )}

            </div>
        </div>

        {/* COLUNA 2: MARKETPLACE */}
        {recommendation.recommendedProducts && recommendation.recommendedProducts.length > 0 && (
             <div>
                <h4 style={{ color: '#D4AF37', borderBottom: '1px solid #333', display: 'block', paddingBottom: '10px', marginBottom: '15px', fontSize: '1em', textTransform: 'uppercase', letterSpacing: '1px' }}>Marketplace Curado</h4>
                <div style={{ marginTop: '15px' }}>
                    {recommendation.recommendedProducts.map((prod, i) => (
                        <div key={i} style={{ 
                            marginBottom: '15px', 
                            padding: '15px', 
                            backgroundColor: '#1A1A1A', 
                            borderRadius: '4px', 
                            border: '1px solid #222',
                            display: 'flex',
                            gap: '15px'
                        }}>
                            {/* Product Image */}
                            <div style={{ 
                                width: '70px', 
                                height: '70px', 
                                borderRadius: '4px', 
                                overflow: 'hidden',
                                flexShrink: 0,
                                background: '#000'
                            }}>
                                <img src={getProductImage(prod.name)} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            {/* Product Details */}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, color: '#F0F0F0', marginBottom: '3px', fontSize: '0.95em' }}>{prod.name}</div>
                                <div style={{ fontSize: '0.8em', color: '#666', marginBottom: '8px', fontStyle: 'italic', lineHeight: '1.2' }}>"{prod.reason}"</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                                    <span style={{ color: '#D4AF37', fontFamily: 'monospace', fontSize: '1em' }}>{prod.price}</span>
                                    <button style={{ 
                                        border: '1px solid #D4AF37', 
                                        background: 'transparent', 
                                        color: '#D4AF37', 
                                        padding: '4px 10px', 
                                        borderRadius: '2px', 
                                        fontSize: '0.65em', 
                                        cursor: 'pointer', 
                                        fontWeight: 'bold', 
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        transition: 'all 0.3s'
                                    }}>Comprar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
