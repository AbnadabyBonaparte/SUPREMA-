// src/components/ai/SmartConsultation.tsx
import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { agentConfigs, ProfessionalType } from '@/services/ai/agents';

import { Loader2, Camera, Upload, Sparkles } from 'lucide-react';

export default function SmartConsultation() {
  const [agentId, setAgentId] = useState<ProfessionalType>('makeup_artist_x0');
  const [prompt, setPrompt] = useState('');
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
      const res = await getAIRecommendation(prompt || "Analise minhas fotos e me dê 3 recomendações", agentId, images);
      setResult(res);
    } catch (err) {
      alert("Erro na IA — verifique sua chave Gemini no .env.local");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-8 bg-black/90 border-gold text-white">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
        Consultoria Suprema com IA
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Select value={agentId} onValueChange={(v) => setAgentId(v as ProfessionalType)}>
            <SelectTrigger className="bg-gray-900 border-gold">
              <SelectValue placeholder="Escolha seu especialista" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(agentConfigs).map(agent => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Descreva o que deseja ou deixe em branco para análise automática das fotos..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-4 bg-gray-900 border-gold min-h-32"
          />

          <div className="flex gap-4 my-6">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg w-64 h-64 object-cover"
            />
            <div className="space-y-3">
              <Button onClick={capture} className="bg-gold hover:bg-amber-600 text-black">
                <Camera className="mr-2" /> Tirar Foto
              </Button>
              <label className="block">
                <Button asChild variant="outline" className="border-gold">
                  <span><Upload className="mr-2" /> Upload</span>
                  <input type="file" multiple accept="image/*" onChange={handleFile} className="hidden" />
                </Button>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {images.map((img, i) => (
            <img key={i} src={img} alt="" className="w-24 h-24 object-cover rounded border border-gold" />
          ))}

          <Button
            onClick={submit}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-black font-bold text-lg py-6"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
            {loading ? "Processando com IA..." : "Consultar Especialista"}
          </Button>
        </div>

        <div>
          {result && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gold">Recomendações</h2>
              {result.map((rec: any, i: number) => (
                <Card key={i} className="p-6 bg-gray-900 border-gold">
                  <h3 className="text-xl font-bold text-gold">{rec.title}</h3>
                  <p className="mt-2">{rec.description}</p>
                  {rec.imagePrompt && <p className="text-sm text-gray-400 mt-4">Try-on virtual disponível</p>}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}import { getAIRecommendation } from "@/services/ai/openaiService";
