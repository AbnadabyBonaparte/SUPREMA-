"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Camera, Upload, Sparkles } from "lucide-react";
import { getAIRecommendation } from "@/services/ai/openaiService";

export default function SmartConsultation() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
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
    try {
      const res = await getAIRecommendation(prompt || "Me dê 3 recomendações de beleza personalizadas", "makeup_artist_x0", images);
      setResult(res.recommendations || res);
    } catch (err) {
      alert("Erro: verifique sua chave VITE_OPENAI_API_KEY no .env.local");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <Card className="max-w-6xl mx-auto p-12 bg-gradient-to-br from-black to-gray-900 border-2 border-gold rounded-3xl">
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
              <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-2xl border-4 border-gold" width={400} height={400} />
              <div className="space-y-4">
                <Button onClick={capture} size="lg" className="w-full bg-gold hover:bg-amber-500 text-black font-bold">
                  <Camera className="mr-3" /> Tirar Foto
                </Button>
                <label>
                  <Button asChild size="lg" variant="outline" className="w-full border-gold text-white">
                    <span><Upload className="mr-3" /> Upload Fotos</span>
                    <input type="file" multiple accept="image/*" onChange={handleFile} className="hidden" />
                  </Button>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {images.map((img, i) => (
                <img key={i} src={img} alt="upload" className="w-32 h-32 object-cover rounded-xl border-2 border-gold" />
              ))}
            </div>

            <Button
              onClick={submit}
              disabled={loading}
              size="lg"
              className="w-full py-8 text-2xl font-bold bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold"
            >
              {loading ? <Loader2 className="animate-spin mr-4" /> : <Sparkles className="mr-4" />}
              {loading ? "GPT-4o Vision pensando..." : "Consultar Especialista"}
            </Button>
          </div>

          <div>
            {result && (
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gold mb-8">Suas Recomendações</h2>
                {(Array.isArray(result) ? result : [result]).map((r: any, i: number) => (
                  <Card key={i} className="p-8 bg-gray-900 border-gold">
                    <h3 className="text-2xl font-bold text-gold mb-4">{r.title || `Recomendação ${i + 1}`}</h3>
                    <p className="text-lg leading-relaxed">{r.description || JSON.stringify(r)}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
