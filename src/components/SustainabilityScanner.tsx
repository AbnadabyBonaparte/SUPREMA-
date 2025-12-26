// src/components/SustainabilityScanner.tsx
// Sustainability Scanner Refinado com Análise Real de Ingredientes (Etapa 3 Completa)

"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertCircle, 
  Camera, 
  Leaf, 
  AlertTriangle, 
  CheckCircle2, 
  Upload, 
  Loader2,
  X,
  FileText,
  Sparkles
} from "lucide-react";
import { aiService, type SustainabilityAnalysis } from "@/services/ai";
import { fadeInUp, staggerContainer } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

interface ScanHistory {
  ingredients: string[];
  result: SustainabilityAnalysis;
  timestamp: number;
}

const SCAN_HISTORY_KEY = 'sustainability_scans';

export default function SustainabilityScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<SustainabilityAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [ingredientsText, setIngredientsText] = useState("");
  const [inputMode, setInputMode] = useState<'image' | 'manual'>('manual');
  const [history, setHistory] = useState<ScanHistory[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carregar histórico ao montar
  useEffect(() => {
    const savedHistory = localStorage.getItem(SCAN_HISTORY_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory) as ScanHistory[];
        setHistory(parsed.slice(0, 3)); // Últimos 3
      } catch (err) {
        console.error('Erro ao carregar histórico:', err);
      }
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
        setInputMode('image');
        extractIngredientsFromImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractIngredientsFromImage = async (imageBase64: string) => {
    setScanning(true);
    setError(null);
    
    try {
      // Extrair texto da imagem usando IA (análise de imagem)
      // Usar aiService.analyzeFace ou criar método específico
      // Por enquanto, vamos usar um prompt para extrair ingredientes
      const base64Data = imageBase64.includes(',') 
        ? imageBase64.split(',')[1] 
        : imageBase64;

      // Usar chatWithGemini para extrair ingredientes da imagem
      // Nota: Gemini pode analisar imagens diretamente
      const extractionPrompt = `Analise esta imagem de rótulo de produto de beleza e extraia APENAS a lista de ingredientes (INCI). Retorne APENAS os ingredientes separados por vírgula, sem explicações adicionais.`;
      
      // Por enquanto, vamos usar o método manual se a imagem não tiver texto extraído
      // Em produção, usaríamos um serviço de OCR ou Gemini Vision
      setError('Extração automática de texto em desenvolvimento. Por favor, digite os ingredientes manualmente.');
      setScanning(false);
    } catch (err: any) {
      console.error('Erro ao extrair ingredientes:', err);
      setError('Erro ao processar imagem. Tente digitar os ingredientes manualmente.');
      setScanning(false);
    }
  };

  const parseIngredients = (text: string): string[] => {
    // Separar por vírgula, ponto e vírgula, ou quebra de linha
    return text
      .split(/[,;\n]/)
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0)
      .map(ing => ing.replace(/^[-•*]\s*/, '')); // Remover marcadores de lista
  };

  const handleAnalyze = async () => {
    if (!ingredientsText.trim() && !image) {
      setError('Por favor, faça upload de uma imagem ou digite os ingredientes.');
      return;
    }

    setScanning(true);
    setError(null);
    setResult(null);

    try {
      let ingredients: string[] = [];

      if (inputMode === 'manual' && ingredientsText.trim()) {
        ingredients = parseIngredients(ingredientsText);
      } else if (inputMode === 'image' && image) {
        // Se tiver imagem mas não extraiu texto, pedir input manual
        if (!ingredientsText.trim()) {
          setError('Por favor, digite os ingredientes que aparecem na imagem.');
          setScanning(false);
          return;
        }
        ingredients = parseIngredients(ingredientsText);
      }

      if (ingredients.length === 0) {
        setError('Nenhum ingrediente encontrado. Verifique o texto digitado.');
        setScanning(false);
        return;
      }

      // Análise real via aiService
      const analysis = await aiService.analyzeIngredients(ingredients);
      setResult(analysis);

      // Salvar no histórico
      const newHistoryItem: ScanHistory = {
        ingredients,
        result: analysis,
        timestamp: Date.now()
      };
      const updatedHistory = [newHistoryItem, ...history].slice(0, 3);
      setHistory(updatedHistory);
      localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(updatedHistory));

    } catch (err: any) {
      console.error('Erro ao analisar ingredientes:', err);
      setError(err.message || 'Erro ao analisar ingredientes. Tente novamente.');
    } finally {
      setScanning(false);
    }
  };

  const reset = () => {
    setResult(null);
    setImage(null);
    setIngredientsText("");
    setError(null);
    setInputMode('manual');
  };

  const retry = () => {
    setError(null);
    if (ingredientsText.trim() || image) {
      handleAnalyze();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-emerald-400";
    if (score >= 40) return "text-yellow-500";
    return "text-ruby-600";
  };

  const getScoreBadgeVariant = (score: number): "gold" | "outline" | "destructive" => {
    if (score >= 70) return "gold";
    if (score >= 40) return "outline";
    return "destructive";
  };

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="py-20 px-6 bg-obsidian-950 min-h-screen"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <Leaf className="w-20 h-20 text-emerald-noir-500 mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-display text-white mb-4 bg-gradient-to-r from-sovereign-gold-500 to-emerald-noir-500 bg-clip-text text-transparent">
            Sustainability Scanner
          </h2>
          <p className="text-2xl text-marble-50/60">
            Escaneie qualquer produto e descubra se é realmente clean e sustentável
          </p>
        </motion.div>

        <Card className="p-8 md:p-12 bg-obsidian-900/50 border-sovereign-gold-700/20">
          {!result ? (
            <motion.div variants={fadeInUp} className="space-y-8">
              {/* Error State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-ruby-900/30 border border-ruby-700/40 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-ruby-500" />
                    <p className="text-ruby-400 font-semibold">Erro</p>
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

              {/* Input Mode Toggle */}
              <div className="flex gap-4 justify-center">
                <Button
                  variant={inputMode === 'manual' ? 'gold' : 'outline'}
                  onClick={() => {
                    setInputMode('manual');
                    setImage(null);
                  }}
                  className="gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Digitar Ingredientes
                </Button>
                <Button
                  variant={inputMode === 'image' ? 'gold' : 'outline'}
                  onClick={() => {
                    setInputMode('image');
                    fileInputRef.current?.click();
                  }}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload de Foto
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Image Preview */}
              {image && (
                <Card className="bg-obsidian-800/50 border-sovereign-gold-700/30 p-4">
                  <div className="relative">
                    <img src={image} alt="Rótulo do produto" className="w-full rounded-lg max-h-64 object-contain" />
                    <button
                      onClick={() => {
                        setImage(null);
                        setInputMode('manual');
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-ruby-700/90 hover:bg-ruby-700 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <p className="text-xs text-marble-50/60 mt-2 text-center">
                    Foto do rótulo carregada. Digite os ingredientes abaixo.
                  </p>
                </Card>
              )}

              {/* Ingredients Input */}
              <div className="space-y-4">
                <label className="block text-foreground font-semibold">
                  {inputMode === 'image' 
                    ? 'Digite os ingredientes que aparecem na imagem:' 
                    : 'Lista de Ingredientes (INCI):'}
                </label>
                <Textarea
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  placeholder="Exemplo: Aqua, Glycerin, Sodium Laureth Sulfate, Parfum, Methylparaben, Propylparaben..."
                  className="min-h-32 font-mono text-sm"
                  disabled={scanning}
                />
                <p className="text-xs text-muted">
                  Separe os ingredientes por vírgula, ponto e vírgula ou quebra de linha
                </p>
              </div>

              {/* Scan Button */}
              <Button
                variant="gold"
                size="lg"
                onClick={handleAnalyze}
                disabled={scanning || (!ingredientsText.trim() && !image)}
                className="w-full text-2xl px-16 py-10 font-bold"
              >
                {scanning ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Analisando ingredientes com IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mr-2" />
                    ANALISAR SUSTENTABILIDADE
                  </>
                )}
              </Button>

              {/* Instructions */}
              <Card className="bg-gradient-to-r from-emerald-noir-500/10 to-transparent border-emerald-noir-500/30 p-6">
                <h4 className="text-emerald-noir-500 font-bold mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  Como usar
                </h4>
                <ul className="space-y-2 text-foreground-secondary text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-noir-500 font-bold">1.</span>
                    <span>Faça upload de uma foto do rótulo ou digite os ingredientes manualmente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-noir-500 font-bold">2.</span>
                    <span>Nossa IA analisará sustentabilidade, segurança e impacto ambiental</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-noir-500 font-bold">3.</span>
                    <span>Receba score detalhado e recomendações de alternativas sustentáveis</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          ) : (
            <motion.div variants={staggerContainer} className="space-y-8">
              {/* Score Display */}
              <motion.div variants={fadeInUp} className="text-center">
                <div className={cn("text-9xl font-display font-bold", getScoreColor(result.score))}>
                  {result.score}/100
                </div>
                <Badge 
                  variant={getScoreBadgeVariant(result.score)}
                  className="mt-6 text-3xl px-12 py-4"
                >
                  {result.rating}
                </Badge>
              </motion.div>

              {/* Issues */}
              {result.issues.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <Card className="p-8 bg-ruby-900/30 border-ruby-700/40">
                    <div className="flex items-center gap-4 mb-6">
                      <AlertTriangle className="w-10 h-10 text-ruby-500" />
                      <h3 className="text-3xl font-display text-ruby-400">Problemas Detectados</h3>
                    </div>
                    <ul className="space-y-4">
                      {result.issues.map((issue, i) => (
                        <motion.li 
                          key={i} 
                          variants={fadeInUp} 
                          className="flex items-start gap-4 text-lg"
                        >
                          <AlertCircle className="w-6 h-6 text-ruby-500 flex-shrink-0 mt-1" />
                          <span className="text-marble-50/90">{issue}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              )}

              {/* Alternatives */}
              {result.alternatives.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <Card className="p-8 bg-emerald-noir-500/20 border-emerald-noir-500/40">
                    <div className="flex items-center gap-4 mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-noir-500" />
                      <h3 className="text-3xl font-display text-emerald-noir-500">Recomendações Alsham</h3>
                    </div>
                    <ul className="space-y-4">
                      {result.alternatives.map((alt, i) => (
                        <motion.li 
                          key={i} 
                          variants={fadeInUp} 
                          className="flex items-start gap-4 text-lg"
                        >
                          <Leaf className="w-6 h-6 text-emerald-noir-500 flex-shrink-0 mt-1" />
                          <span className="text-marble-50/90">{alt}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div variants={fadeInUp} className="flex gap-4 justify-center">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={reset}
                  className="text-xl px-12 py-6"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Escanear Outro Produto
                </Button>
              </motion.div>

              {/* History */}
              {history.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <Card className="bg-obsidian-800/50 border-sovereign-gold-700/30 p-6">
                    <h4 className="text-foreground font-semibold mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Histórico de Análises
                    </h4>
                    <div className="space-y-3">
                      {history.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-obsidian-900/50 rounded-lg cursor-pointer hover:bg-obsidian-900 transition-colors"
                          onClick={() => setResult(item.result)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                              getScoreColor(item.result.score),
                              "bg-opacity-20"
                            )}>
                              {item.result.score}
                            </div>
                            <div>
                              <p className="text-foreground font-semibold">
                                {item.ingredients.slice(0, 3).join(', ')}
                                {item.ingredients.length > 3 && '...'}
                              </p>
                              <p className="text-muted text-xs">
                                {new Date(item.timestamp).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <Badge variant={getScoreBadgeVariant(item.result.score)}>
                            {item.result.rating}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </Card>
      </div>
    </motion.section>
  );
}
