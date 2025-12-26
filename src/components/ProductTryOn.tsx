// src/components/ProductTryOn.tsx
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Camera, RotateCcw, Download, Sparkles } from 'lucide-react';
import Webcam from 'react-webcam';
import { Z_INDEX } from '@/lib/z-index';
import { cn } from '@/lib/utils';

interface ProductTryOnProps {
  productName: string;
  productImage: string;
  onClose: () => void;
}

export default function ProductTryOn({ productName, productImage, onClose }: ProductTryOnProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      simulateTryOn(imageSrc);
    }
  };

  const simulateTryOn = async (image: string) => {
    setIsProcessing(true);
    
    // Simulação de processamento AR/VR
    // Em produção, aqui seria a chamada para API de try-on (ex: Gemini Vision, TryOnLabs, etc.)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock: retorna a imagem original com overlay
    setTryOnResult(image);
    setIsProcessing(false);
  };

  const reset = () => {
    setImgSrc(null);
    setTryOnResult(null);
  };

  const download = () => {
    if (tryOnResult) {
      const link = document.createElement('a');
      link.href = tryOnResult;
      link.download = `alsham-tryon-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className={cn("fixed inset-0 bg-background/95 flex items-center justify-center p-4", Z_INDEX.modal)}>
      <Card className="bg-background border-primary/30 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              AR Try-On
            </h2>
            <p className="text-muted mt-1">{productName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-surface border border-border hover:border-primary transition-colors flex items-center justify-center"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Camera/Preview */}
          <div>
            <Card className="bg-surface border-border p-4 mb-4">
              {!imgSrc ? (
                <div className="relative">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="w-full rounded-lg"
                    videoConstraints={{
                      facingMode: 'user',
                      width: 640,
                      height: 480
                    }}
                  />
                  <div className="absolute inset-0 border-4 border-dashed border-gold/30 rounded-lg pointer-events-none"></div>
                </div>
              ) : (
                <img src={imgSrc} alt="Captured" className="w-full rounded-lg" />
              )}
            </Card>

            {!imgSrc ? (
              <Button
                onClick={capture}
                className="w-full bg-gold hover:bg-gold/90 text-black font-bold text-lg py-6"
              >
                <Camera className="w-6 h-6 mr-2" />
                Capturar Foto
              </Button>
            ) : (
              <Button
                onClick={reset}
                variant="outline"
                className="w-full border-gold text-gold hover:bg-gold hover:text-black font-bold text-lg py-6"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Tirar Nova Foto
              </Button>
            )}
          </div>

          {/* Right - Try-On Result */}
          <div>
            <Card className="bg-surface border-border p-4 mb-4">
              {isProcessing ? (
                <div className="w-full h-[480px] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-primary font-bold text-lg">Processando AR...</p>
                  <p className="text-muted text-sm mt-2">Aplicando produto virtualmente</p>
                </div>
              ) : tryOnResult ? (
                <div className="relative">
                  <img src={tryOnResult} alt="Try-On Result" className="w-full rounded-lg" />
                  {/* Overlay simulando efeito do produto */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-gold/20 rounded-lg pointer-events-none"></div>
                  <div className="absolute top-4 left-4 bg-gold/90 text-black px-4 py-2 rounded-full font-bold text-sm">
                    ✨ Com {productName}
                  </div>
                </div>
              ) : (
                <div className="w-full h-[480px] flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg">
                  <Sparkles className="w-16 h-16 text-muted mb-4" />
                  <p className="text-muted text-center">
                    Tire uma foto para ver<br />como o produto ficaria em você
                  </p>
                </div>
              )}
            </Card>

            {tryOnResult && (
              <div className="space-y-3">
                <Button
                  onClick={download}
                  className="w-full bg-emerald-noir-600 hover:bg-emerald-noir-700 text-foreground font-bold text-lg py-6"
                >
                  <Download className="w-6 h-6 mr-2" />
                  Baixar Resultado
                </Button>
                <p className="text-center text-muted text-sm">
                  Compartilhe nas redes sociais e marque @alsham
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <Card className="bg-gradient-to-r from-gold/10 to-transparent border-gold/30 p-6 mt-8">
          <h4 className="text-gold font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Como funciona o AR Try-On
          </h4>
          <ul className="space-y-2 text-foreground-secondary text-sm">
            <li>1. Posicione seu rosto na câmera em um ambiente bem iluminado</li>
            <li>2. Clique em "Capturar Foto" quando estiver pronto</li>
            <li>3. Nossa IA aplicará o produto virtualmente em você</li>
            <li>4. Veja o resultado em tempo real e baixe a imagem</li>
          </ul>
        </Card>

        {/* Privacy Notice */}
        <p className="text-center text-muted text-xs mt-6">
          🔒 Suas fotos são processadas localmente e não são armazenadas em nossos servidores
        </p>
      </Card>
    </div>
  );
}
