// src/components/ProductTryOn.tsx
// AR Try-On Real com Webcam + IA (Etapa 2 Completa)

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Camera, RotateCcw, Download, Sparkles, Upload, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import Webcam from 'react-webcam';
import { Z_INDEX } from '@/lib/z-index';
import { cn } from '@/lib/utils';
import { aiService } from '@/services/ai';

interface ProductTryOnProps {
  productName: string;
  productImage: string;
  onClose: () => void;
}

interface TryOnHistory {
  before: string;
  after: string;
  timestamp: number;
}

export default function ProductTryOn({ productName, productImage, onClose }: ProductTryOnProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [history, setHistory] = useState<TryOnHistory[]>([]);

  // Verificar permissão de câmera ao montar
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission(true);
      stream.getTracks().forEach(track => track.stop()); // Liberar câmera imediatamente
    } catch (err) {
      setCameraPermission(false);
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      processTryOn(imageSrc);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImgSrc(result);
        processTryOn(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processTryOn = async (imageBase64: string) => {
    setIsProcessing(true);
    setError(null);
    setTryOnResult(null);

    try {
      // Extrair base64 sem prefixo data:image/...
      const base64Data = imageBase64.includes(',') 
        ? imageBase64.split(',')[1] 
        : imageBase64;

      // Criar prompt estruturado para o try-on
      const prompt = `Aplique o produto de beleza "${productName}" no rosto desta pessoa de forma realista e natural. Mantenha os traços faciais originais, a identidade da pessoa e aplique o produto de forma profissional como um maquiador experiente faria. O resultado deve parecer fotorrealista e natural.`;

      // Usar aiService.editImage para processar
      const processedImage = await aiService.editImage(prompt, {
        data: base64Data,
        mimeType: 'image/jpeg'
      });

      // Se retornou base64 sem prefixo, adicionar
      const resultImage = processedImage.startsWith('data:')
        ? processedImage
        : `data:image/jpeg;base64,${processedImage}`;

      setTryOnResult(resultImage);

      // Adicionar ao histórico
      const newHistoryItem: TryOnHistory = {
        before: imageBase64,
        after: resultImage,
        timestamp: Date.now()
      };
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 5)); // Manter últimos 5

    } catch (err: any) {
      console.error('Erro ao processar try-on:', err);
      setError(err.message || 'Erro ao processar imagem. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setImgSrc(null);
    setTryOnResult(null);
    setError(null);
  };

  const download = () => {
    if (tryOnResult) {
      const link = document.createElement('a');
      link.href = tryOnResult;
      link.download = `alsham-tryon-${productName.replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.click();
    }
  };

  const retry = () => {
    setError(null);
    if (imgSrc) {
      processTryOn(imgSrc);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn("fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 z-50", Z_INDEX.modal)}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-6xl w-full"
      >
        <Card className="bg-surface border-primary/30 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                AR Try-On
              </h2>
              <p className="text-muted mt-1">{productName}</p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-surface border border-border hover:border-primary transition-colors flex items-center justify-center"
              aria-label="Fechar"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-ruby-900/30 border border-ruby-700/40 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-ruby-500" />
                <p className="text-ruby-400 font-semibold">Erro ao processar</p>
              </div>
              <p className="text-sm text-marble-50/70">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={retry}
                className="mt-2"
              >
                Tentar novamente
              </Button>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Left - Camera/Preview */}
            <div className="space-y-4">
              <Card className="bg-surface border-border p-4">
                {!imgSrc ? (
                  <div className="relative">
                    {cameraPermission === false ? (
                      <div className="w-full aspect-video bg-surface border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center p-8 text-center">
                        <AlertCircle className="w-16 h-16 text-muted mb-4" />
                        <p className="text-foreground font-semibold mb-2">Câmera não disponível</p>
                        <p className="text-muted text-sm mb-4">
                          Permissão negada ou câmera não encontrada
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Fazer upload de foto
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <>
                        <Webcam
                          ref={webcamRef}
                          audio={false}
                          screenshotFormat="image/jpeg"
                          className="w-full rounded-lg"
                          videoConstraints={{
                            facingMode: 'user',
                            width: { ideal: 640 },
                            height: { ideal: 480 }
                          }}
                        />
                        <div className="absolute inset-0 border-4 border-dashed border-primary/30 rounded-lg pointer-events-none flex items-center justify-center">
                          <Badge variant="gold" className="bg-primary/20 text-primary border-primary/50">
                            Posicione seu rosto aqui
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <img src={imgSrc} alt="Captured" className="w-full rounded-lg" />
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-surface/90">
                        Foto capturada
                      </Badge>
                    </div>
                  </div>
                )}
              </Card>

              {!imgSrc ? (
                <div className="space-y-3">
                  {cameraPermission !== false && (
                    <Button
                      onClick={capture}
                      variant="gold"
                      size="lg"
                      className="w-full font-bold text-lg py-6"
                      disabled={!cameraPermission}
                    >
                      <Camera className="w-6 h-6 mr-2" />
                      Capturar Foto
                    </Button>
                  )}
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    size="lg"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-background font-bold text-lg py-6"
                  >
                    <Upload className="w-6 h-6 mr-2" />
                    Fazer Upload de Foto
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <Button
                  onClick={reset}
                  variant="outline"
                  size="lg"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-background font-bold text-lg py-6"
                >
                  <RotateCcw className="w-6 h-6 mr-2" />
                  Tirar Nova Foto
                </Button>
              )}
            </div>

            {/* Right - Try-On Result */}
            <div className="space-y-4">
              <Card className="bg-surface border-border p-4">
                {isProcessing ? (
                  <div className="w-full aspect-video flex flex-col items-center justify-center bg-surface rounded-lg">
                    <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                    <p className="text-primary font-bold text-lg">Processando com IA...</p>
                    <p className="text-muted text-sm mt-2">Aplicando {productName} virtualmente</p>
                    <p className="text-muted text-xs mt-1">Isso pode levar alguns segundos</p>
                  </div>
                ) : tryOnResult ? (
                  <div className="relative">
                    <img src={tryOnResult} alt="Try-On Result" className="w-full rounded-lg" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="gold" className="bg-primary/90 text-background px-4 py-2">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Com {productName}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-video flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-surface/50">
                    <Sparkles className="w-16 h-16 text-muted mb-4" />
                    <p className="text-muted text-center text-lg font-semibold mb-2">
                      Veja como ficaria
                    </p>
                    <p className="text-muted text-center text-sm">
                      Tire uma foto para ver<br />como o produto ficaria em você
                    </p>
                  </div>
                )}
              </Card>

              {tryOnResult && (
                <div className="space-y-3">
                  <Button
                    onClick={download}
                    variant="gold"
                    size="lg"
                    className="w-full font-bold text-lg py-6"
                  >
                    <Download className="w-6 h-6 mr-2" />
                    Baixar Resultado
                  </Button>
                  <p className="text-center text-muted text-sm">
                    Compartilhe nas redes sociais e marque @alsham
                  </p>
                </div>
              )}

              {/* Galeria Antes/Depois */}
              {history.length > 0 && (
                <Card className="bg-surface border-border p-4">
                  <h4 className="text-foreground font-semibold mb-3">Histórico de Try-Ons</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {history.map((item, idx) => (
                      <div key={idx} className="relative group cursor-pointer" onClick={() => setTryOnResult(item.after)}>
                        <img
                          src={item.after}
                          alt={`Try-on ${idx + 1}`}
                          className="w-full rounded-lg opacity-75 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Instructions */}
          <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/30 p-6 mt-8">
            <h4 className="text-primary font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Como funciona o AR Try-On
            </h4>
            <ul className="space-y-2 text-foreground-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Posicione seu rosto na câmera em um ambiente bem iluminado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Clique em "Capturar Foto" ou faça upload de uma foto</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Nossa IA aplicará o produto virtualmente de forma realista</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <span>Veja o resultado e baixe a imagem para compartilhar</span>
              </li>
            </ul>
          </Card>

          {/* Privacy Notice */}
          <p className="text-center text-muted text-xs mt-6 flex items-center justify-center gap-2">
            <span>🔒</span>
            <span>Suas fotos são processadas com IA e não são armazenadas em nossos servidores</span>
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
}
