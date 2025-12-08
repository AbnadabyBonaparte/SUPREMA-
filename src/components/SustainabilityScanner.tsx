// src/components/SustainabilityScanner.tsx (REFATORADO DYNASTY)

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ButtonDynasty } from "@/components/ui/ButtonDynasty";
import { CardDynasty } from "@/components/ui/CardDynasty";
import { BadgeDynasty } from "@/components/ui/BadgeDynasty";
import { AlertCircle, Camera, Leaf, AlertTriangle, CheckCircle2 } from "lucide-react";
import { analyzeIngredients, SustainabilityAnalysis } from "@/services/ai/geminiService";
import { fadeInUp, staggerContainer } from "@/lib/motion-variants";

export default function SustainabilityScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<SustainabilityAnalysis | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleScan = async () => {
    setScanning(true);
    setResult(null);
    try {
      // Simulação de captura (em produção: webcam + OCR ou upload real)
      const mockImage = "data:image/jpeg;base64,/9j/4AAQSkZJRg..."; // placeholder
      setImage(mockImage);
      const analysis = await analyzeIngredients(["parabenos", "sulfatos", "microplásticos"]); // mock ingredients ou extrair de imagem
      setResult(analysis);
    } catch (err) {
      setResult({
        score: 12,
        rating: "RUIM",
        issues: ["Parabenos", "Sulfatos", "Microplásticos", "Óleo de palma não sustentável"],
        alternatives: ["Use produtos com óleo de babaçu", "Prefira marcas cruelty-free"],
      });
    } finally {
      setScanning(false);
    }
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
          <Leaf className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-display text-white mb-4 bg-gradient-to-r from-sovereign-gold-500 to-emerald-400 bg-clip-text text-transparent">
            Sustainability Scanner
          </h2>
          <p className="text-2xl text-marble-50/60">
            Escaneie qualquer produto e descubra se é realmente clean e sustentável
          </p>
        </motion.div>

        <CardDynasty className="p-12 bg-obsidian-900/50 border-sovereign-gold-700/20">
          {!result ? (
            <motion.div variants={fadeInUp} className="text-center space-y-12">
              <div className="bg-obsidian-800/50 border-4 border-dashed border-sovereign-gold-700/30 rounded-3xl w-80 h-80 mx-auto flex items-center justify-center">
                <Camera className="w-32 h-32 text-sovereign-gold-600/50" />
              </div>
              <ButtonDynasty
                variant="gold"
                size="lg"
                onClick={handleScan}
                disabled={scanning}
                className="text-2xl px-16 py-10"
              >
                {scanning ? "Analisando com IA..." : "ESCANEAR PRODUTO"}
              </ButtonDynasty>
            </motion.div>
          ) : (
            <motion.div variants={staggerContainer} className="space-y-12">
              <motion.div variants={fadeInUp} className="text-center">
                <div className={`text-9xl font-display font-bold ${
                  result.score > 70 ? "text-emerald-400" : 
                  result.score > 40 ? "text-yellow-500" : "text-ruby-600"
                }`}>
                  {result.score}/100
                </div>
                <BadgeDynasty 
                  variant={result.score > 70 ? "gold" : result.score > 40 ? "outline" : "destructive"}
                  className="mt-6 text-3xl px-12 py-4"
                >
                  {result.rating}
                </BadgeDynasty>
              </motion.div>

              {result.issues.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <CardDynasty className="p-8 bg-ruby-900/30 border-ruby-700/40">
                    <div className="flex items-center gap-4 mb-6">
                      <AlertTriangle className="w-10 h-10 text-ruby-500" />
                      <h3 className="text-3xl font-display text-ruby-400">Problemas Detectados</h3>
                    </div>
                    <ul className="space-y-4">
                      {result.issues.map((issue, i) => (
                        <motion.li key={i} variants={fadeInUp} className="flex items-center gap-4 text-xl">
                          <AlertCircle className="w-7 h-7 text-ruby-500" />
                          <span className="text-marble-50/90">{issue}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardDynasty>
                </motion.div>
              )}

              {result.alternatives.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <CardDynasty className="p-8 bg-emerald-900/30 border-emerald-700/40">
                    <div className="flex items-center gap-4 mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                      <h3 className="text-3xl font-display text-emerald-400">Recomendações Alsham</h3>
                    </div>
                    <ul className="space-y-4">
                      {result.alternatives.map((alt, i) => (
                        <motion.li key={i} variants={fadeInUp} className="flex items-center gap-4 text-xl">
                          <Leaf className="y className="w-7 h-7 text-emerald-400" />
                          <span className="text-marble-50/90">{alt}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardDynasty>
                </motion.div>
              )}

              <motion.div variants={fadeInUp} className="text-center">
                <ButtonDynasty
                  variant="gold"
                  size="lg"
                  onClick={handleScan}
                  className="text-2xl px-16 py-10"
                >
                  ESCANEAR OUTRO PRODUTO
                </ButtonDynasty>
              </motion.div>
            </motion.div>
          )}
        </CardDynasty>
      </div>
    </motion.section>
  );
}
