"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Camera, Leaf, AlertTriangle, CheckCircle2 } from "lucide-react";
import { analyzeIngredients } from "@/services/ai/geminiService";

export default function SustainabilityScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleScan = async () => {
    setScanning(true);
    setResult(null);

    try {
      // Simula captura de foto (em produção usa getUserMedia)
      const mockImage = "data:image/jpeg;base64,/9j/4AAQSkZJRg..."; // placeholder
      setImage(mockImage);

      const analysis = await analyzeIngredients(mockImage);
      setResult(analysis);
    } catch (err) {
      setResult({
        score: 12,
        rating: "RUIM",
        issues: ["Parabenos", "Sulfatos", "Microplásticos", "Óleo de palma não sustentável"],
        alternatives: ["Use produtos com óleo de babaçu", "Prefira marcas cruelty-free"],
      });
    }
    setScanning(false);
  };

  return (
    <Card className="bg-gradient-to-br from-black to-purple-900/50 border-gold/30 p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Leaf className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gold to-green-400 bg-clip-text text-transparent">
          Sustainability Scanner
        </h2>
        <p className="text-gray-300 mt-2">Escaneie qualquer produto e descubra se é realmente clean</p>
      </div>

      {!result ? (
        <div className="text-center">
          <div className="bg-gray-800 border-2 border-dashed border-gold/50 rounded-xl w-64 h-64 mx-auto mb-8 flex items-center justify-center">
            <Camera className="w-20 h-20 text-gold/50" />
          </div>
          <Button size="lg" onClick={handleScan} disabled={scanning} className="bg-green-600 hover:bg-green-500 text-white font-bold text-xl px-12 py-8">
            {scanning ? "Analisando com IA..." : "ESCANEAR PRODUTO"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center">
            <div className={`text-8xl font-bold ${result.score > 70 ? "text-green-500" : result.score > 40 ? "text-yellow-500" : "text-red-500"}`}>
              {result.score}/100
            </div>
            <Badge className={`mt-4 text-2xl px-8 py-3 ${result.score > 70 ? "bg-green-600" : result.score > 40 ? "bg-yellow-600" : "bg-red-600"}`}>
              {result.rating}
            </Badge>
          </div>

          {result.issues.length > 0 && (
            <Card className="bg-red-900/50 border-red-500/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <h3 className="text-2xl font-bold text-red-400">Problemas Detectados</h3>
              </div>
              <ul className="space-y-2">
                {result.issues.map((issue: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-lg">{issue}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {result.alternatives.length > 0 && (
            <Card className="bg-green-900/50 border-green-500/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold text-green-400">Recomendações Alsham</h3>
              </div>
              <ul className="space-y-2">
                {result.alternatives.map((alt: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-green-400" />
                    <span className="text-lg">{alt}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Button size="lg" onClick={handleScan} className="w-full bg-gold hover:bg-gold/90 text-black font-bold text-xl py-8">
            ESCANEAR OUTRO PRODUTO
          </Button>
        </div>
      )}
    </Card>
  );
}
