"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Camera, Upload, Sparkles } from "lucide-react";
import { getStyleRecommendations } from "@/services/ai/geminiService";
import { ProfessionalType, StyleRecommendation, Trend } from "@/types/ai";

interface SmartConsultationProps {
  professional?: ProfessionalType;
  initialTrend?: Trend | null;
  onBack?: () => void;
  onSchedule?: () => void;
}

export default function SmartConsultation({
  professional = 'makeup_artist_x0',
  initialTrend,
  onBack,
  onSchedule
}: SmartConsultationProps) {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StyleRecommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) setImages(prev => [...prev, screenshot]);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setImages(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const submit = async () => {
    if (!prompt && images.length === 0) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Convert base64 images to the format expected by Gemini
      const imageData = images.map(img => ({
        inlineData: {
          data: img.split(',')[1], // Remove data:image/jpeg;base64, prefix
          mimeType: 'image/jpeg'
        }
      }));

      const recommendations = await getStyleRecommendations(
        prompt || "Me dê 3 recomendações de beleza personalizadas com base nas imagens.",
        professional,
        imageData
      );

      setResult(recommendations);
    } catch (err: any) {
      console.error('Error getting recommendations:', err);
      setError(err.message || "Erro: verifique sua chave VITE_GOOGLE_API_KEY no .env.local");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <Card className="max-w-6xl mx-auto p-12 bg-gradient-to-br from-black to-gray-900 border-2 border-gold rounded-3xl">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Voltar
          </button>
        )}

        <h1 className="text-6xl font-bold text-center mb-12 bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
          Alsham Suprema Beleza 5.0
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Textarea
              placeholder="Descreva seu desejo ou deixe em branco para análise automática..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-gray-900 border-gold text-white placeholder-gray-500"
              rows={5}
            />

            <div className="flex gap-8 items-start">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-2xl border-4 border-gold"
                width={400}
                height={400}
              />
              <div className="space-y-4">
                <Button
                  onClick={capture}
                  size="lg"
                  className="w-full bg-gold hover:bg-amber-500 text-black font-bold"
                >
                  <Camera className="mr-3" /> Tirar Foto
                </Button>
                <label>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full border-gold text-white"
                  >
                    <span>
                      <Upload className="mr-3" /> Upload Fotos
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFile}
                        className="hidden"
                      />
                    </span>
                  </Button>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    alt="upload"
                    className="w-32 h-32 object-cover rounded-xl border-2 border-gold"
                  />
                  <button
                    onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <Button
              onClick={submit}
              disabled={loading}
              size="lg"
              className="w-full py-8 text-2xl font-bold bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold"
            >
              {loading ? <Loader2 className="animate-spin mr-4" /> : <Sparkles className="mr-4" />}
              {loading ? "Gemini 2.0 Flash pensando..." : "Consultar Especialista"}
            </Button>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
                {error}
              </div>
            )}
          </div>

          <div>
            {result && result.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gold mb-8">Suas Recomendações</h2>
                {result.map((rec, i) => (
                  <Card key={i} className="p-8 bg-gray-900 border-gold">
                    <h3 className="text-2xl font-bold text-gold mb-4">{rec.outfitName}</h3>
                    <p className="text-lg leading-relaxed mb-4">{rec.description}</p>

                    {rec.technicalAnalysis && (
                      <div className="mb-4 p-4 bg-white/5 rounded-lg">
                        <h4 className="text-sm uppercase tracking-wider text-gold mb-2">Análise Técnica</h4>
                        <p className="text-sm text-gray-300">{rec.technicalAnalysis}</p>
                      </div>
                    )}

                    {rec.items && rec.items.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm uppercase tracking-wider text-gold mb-2">Passos</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                          {rec.items.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                      </div>
                    )}

                    {rec.recommendedProducts && rec.recommendedProducts.length > 0 && (
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-gold mb-3">Produtos Recomendados</h4>
                        <div className="space-y-2">
                          {rec.recommendedProducts.map((product, idx) => (
                            <div key={idx} className="p-3 bg-white/5 rounded-lg">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-sm">{product.name}</span>
                                <span className="text-gold text-sm font-bold">{product.price}</span>
                              </div>
                              <p className="text-xs text-gray-400">{product.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}

                {onSchedule && (
                  <div className="text-center mt-6">
                    <Button
                      onClick={onSchedule}
                      size="lg"
                      variant="outline"
                      className="border-gold text-gold hover:bg-gold hover:text-black"
                    >
                      Agendar Profissional Agora
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
