// src/components/UGCUpload.tsx
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Image, Video, FileText } from 'lucide-react';

interface UGCUploadProps {
  onClose: () => void;
}

export default function UGCUpload({ onClose }: UGCUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [productTags, setProductTags] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title) {
      alert('Por favor, selecione um arquivo e adicione um título');
      return;
    }

    setIsUploading(true);

    // Simulação de upload
    // Em produção, aqui seria o upload para Supabase Storage ou S3
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert('✅ Conteúdo enviado com sucesso! Aguarde aprovação da equipe Alsham.');
    setIsUploading(false);
    onClose();
  };

  const availableProducts = [
    'Shampoo Metal Detox',
    'Máscara Platinum',
    'Kit Coloração',
    'Sérum Reparador',
    'Condicionador Premium'
  ];

  const toggleProductTag = (product: string) => {
    if (productTags.includes(product)) {
      setProductTags(productTags.filter(p => p !== product));
    } else {
      setProductTags([...productTags, product]);
    }
  };

  return (
    <Card className="bg-[#0A0A0A] border-gold/30 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Novo Upload</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#333] hover:border-gold transition-colors flex items-center justify-center"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="space-y-6">
        {/* File Upload Area */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {!preview ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-[#333] hover:border-gold transition-colors rounded-lg p-12 flex flex-col items-center gap-4"
            >
              <Upload className="w-12 h-12 text-gray-500" />
              <div className="text-center">
                <p className="text-white font-medium mb-1">Clique para fazer upload</p>
                <p className="text-gray-500 text-sm">Imagens ou vídeos (max 50MB)</p>
              </div>
            </button>
          ) : (
            <div className="relative">
              {selectedFile?.type.startsWith('image/') ? (
                <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
              ) : (
                <video src={preview} controls className="w-full h-64 rounded-lg" />
              )}
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/80 border border-gold hover:bg-black transition-colors flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Título *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Tutorial Platinum Blonde com Alsham"
            className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-gold"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva seu conteúdo e como você usou os produtos Alsham..."
            rows={4}
            className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-gold resize-none"
          />
        </div>

        {/* Product Tags */}
        <div>
          <label className="block text-gray-400 text-sm mb-3">Produtos Mencionados</label>
          <div className="flex flex-wrap gap-2">
            {availableProducts.map((product) => (
              <button
                key={product}
                onClick={() => toggleProductTag(product)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  productTags.includes(product)
                    ? 'bg-gold text-black'
                    : 'bg-[#1A1A1A] border border-[#333] text-gray-400 hover:border-gold'
                }`}
              >
                {product}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={isUploading || !selectedFile || !title}
          className="w-full bg-gold hover:bg-gold/90 text-black font-bold text-lg py-6 disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
              Enviando...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Enviar Conteúdo
            </>
          )}
        </Button>

        {/* Info */}
        <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
          <p className="text-gold font-bold text-sm mb-2">📌 Diretrizes de Conteúdo</p>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Conteúdo original e autêntico</li>
            <li>• Mostre os produtos Alsham em uso</li>
            <li>• Evite conteúdo ofensivo ou inadequado</li>
            <li>• Aprovação em até 24h</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
