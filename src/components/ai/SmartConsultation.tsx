"use client";

import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Camera, Upload, Sparkles } from 'lucide-react';
import { getAIRecommendation } from '@/services/ai/openaiService';

export default function SmartConsultation() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) setImages(prev => [...prev, screenshot]);
  };

  const handleFile = (e: any) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onloadend = () => setImages(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const submit = async () => {
    if (!prompt && images.length === 0) return;
    setLoading(true);
    getAIRecommendation(prompt || "Analise minhas fotos e me dê 3 recomendações de beleza", "makeup_artist_x0", images)
      .then(res => setResult(res.recommendations || res))
      .catch(() => alert("Erro na IA — verifique sua chave OpenAI"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Card className="max-w-5xl mx-auto p-10 bg-gradient-to-br from-black via-gray-900 to-black border-gold">
        <h1 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
          Alsham Suprema Beleza 5.0
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <Textarea placeholder="Descreva seu desejo ou deixe vazio para análise automática..." value={prompt} onChange={e => setPrompt(e.target.value)} className="mb-6 bg-gray-900 border-gold" rows={4} />

            <div className="flex gap-6 items-center mb-6">
              <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-xl w-80 h-80 object-cover border-4 border-gold" />
              <div className="space-y-4">
                <Button onClick={capture} size="lg" className="w-full bg-gold hover:bg-amber-500 text-black">
                  <Camera className="mr-2" /> Tirar Foto
                </Button>
                <label className="block">
                  <Button asChild size="lg" variant="outline" className="w-full border-gold">
                    <span><Upload className="mr-2" /> Upload Fotos</span>
                    <input type="file" multiple accept="image/*" onChange={handleFile} className="hidden" />
                  </Button>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {images.map((img, i) => (
                <img key={i} src={img} className="w-32 h-32 object-cover rounded-lg border-2 border-gold" />
              ))}
            </div>

            <Button onClick={submit} disabled={loading} size="lg" className="w-full py-8 text-xl font-bold bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold">
              {loading ? <Loader2 className="animate-spin mr-3" /> : <Sparkles className="mr-3" />}
              {loading ? "Processando com GPT-4o Vision..." : "Consultar Especialista"}
            </Button>
          </div>

          <div>
            {result && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gold">Suas Recomendações Premium</h2>
                {result.map((r: any, i: number) => (
                  <Card key={i} className="p-6 bg-gray-900 border-gold">
                    <h3 className="text-2xl font-bold text-gold mb-3">{r.title || `Recomendação ${i+1}`}</h3>
                    <p className="text-lg leading-relaxed">{r.description || r}</p>
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
