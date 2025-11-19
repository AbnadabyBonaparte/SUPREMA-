
import React, { useState } from 'react';
import { generateSpeech } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

// Helper functions for audio decoding
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length; // Single channel
  const buffer = ctx.createBuffer(1, frameCount, 24000); // 1 channel, 24000 sample rate
  const channelData = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}


const TextToSpeech: React.FC = () => {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setAudioUrl(null);

        try {
            const base64Audio = await generateSpeech(text);
            const decodedBytes = decode(base64Audio);
            
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) {
                throw new Error("Seu navegador não suporta a API de Áudio.");
            }
            const audioContext = new AudioContext();
            const audioBuffer = await decodeAudioData(decodedBytes, audioContext);

            const wavBlob = bufferToWave(audioBuffer, audioBuffer.length);
            const url = URL.createObjectURL(wavBlob);
            setAudioUrl(url);

        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro ao gerar o áudio.');
        } finally {
            setIsLoading(false);
        }
    };
    
    function bufferToWave(abuffer: AudioBuffer, len: number) {
        let numOfChan = abuffer.numberOfChannels,
            length = len * numOfChan * 2 + 44,
            buffer = new ArrayBuffer(length),
            view = new DataView(buffer),
            channels = [],
            i,
            sample,
            offset = 0,
            pos = 0;

        setUint32(0x46464952); 
        setUint32(length - 8); 
        setUint32(0x45564157); 

        setUint32(0x20746d66); 
        setUint32(16); 
        setUint16(1); 
        setUint16(numOfChan);
        setUint32(abuffer.sampleRate);
        setUint32(abuffer.sampleRate * 2 * numOfChan); 
        setUint16(numOfChan * 2); 
        setUint16(16); 

        setUint32(0x61746164); 
        setUint32(length - pos - 4); 

        for (i = 0; i < abuffer.numberOfChannels; i++)
            channels.push(abuffer.getChannelData(i));

        while (pos < length) {
            for (i = 0; i < numOfChan; i++) {
                sample = Math.max(-1, Math.min(1, channels[i][offset])); 
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; 
                view.setInt16(pos, sample, true); 
                pos += 2;
            }
            offset++;
        }
        return new Blob([view], { type: 'audio/wav' });

        function setUint16(data: number) {
            view.setUint16(pos, data, true);
            pos += 2;
        }

        function setUint32(data: number) {
            view.setUint32(pos, data, true);
            pos += 4;
        }
    }

    return (
        <div style={{ padding: '40px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ color: '#F0F0F0', margin: 0, fontSize: '2.5em', fontWeight: 400 }}>VOICE ENGINE</h2>
                <p style={{ color: '#D4AF37', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8em' }}>
                    Ferramenta de Acessibilidade & Wellness
                </p>
            </div>

            <div style={{ 
                background: 'rgba(20, 20, 20, 0.6)', 
                backdropFilter: 'blur(10px)',
                padding: '40px', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                <div style={{textAlign: 'center', marginBottom: '30px', color: '#888', fontSize: '0.9em', lineHeight: '1.6'}}>
                    <p>Esta tecnologia é utilizada automaticamente em nossas Consultorias para clientes com deficiência visual ou para experiências de relaxamento guiado (Spa Therapist).</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                         <label style={{ color: '#D4AF37', fontSize: '0.8em', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>Teste de Síntese (Texto para Áudio)</label>
                         <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Digite o texto para sintetização..."
                            rows={6}
                            style={{ 
                                width: '100%', 
                                padding: '20px', 
                                backgroundColor: 'rgba(255,255,255,0.03)', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                color: '#F0F0F0', 
                                borderRadius: '8px',
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '1.1em',
                                resize: 'none',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button type="submit" disabled={isLoading} style={{ 
                        width: '100%',
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
                        {isLoading ? 'Sintetizando Onda Sonora...' : 'Gerar Voz Neural'}
                    </button>
                </form>

                {error && <p style={{ color: '#E87A5E', marginTop: '20px', textAlign: 'center' }}>{error}</p>}
                
                {isLoading && <LoadingSpinner />}

                {audioUrl && (
                    <div style={{marginTop: '40px', textAlign: 'center', padding: '20px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{color: '#D4AF37', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px'}}>Reprodução de Áudio</h3>
                        <audio controls src={audioUrl} style={{ width: '100%', outline: 'none' }}></audio>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextToSpeech;
