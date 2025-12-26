// src/pages/CreatorSuitePage.tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import UGCUpload from '@/components/UGCUpload';
import { TrendingUp, DollarSign, Users, Video, Image, Link2, Copy, Check } from 'lucide-react';

export default function CreatorSuitePage() {
  const [showUpload, setShowUpload] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // TODO: Replace with real creator data from Supabase
  const creatorStats = {
    totalEarnings: 12450.80,
    thisMonth: 3240.50,
    totalViews: 145230,
    conversionRate: 4.2,
    followers: 28400,
    activeLinks: 12
  };

  const affiliateLink = 'https://alsham.com/ref/creator123';

  const recentContent = [
    { id: 1, type: 'video', title: 'Tutorial: Platinum Blonde', views: 45200, earnings: 890.40, status: 'approved' },
    { id: 2, type: 'image', title: 'Before & After Metal Detox', views: 32100, earnings: 642.00, status: 'approved' },
    { id: 3, type: 'video', title: 'Unboxing Alsham Box', views: 28900, earnings: 578.00, status: 'pending' }
  ];

  const topProducts = [
    { name: 'Shampoo Metal Detox', sales: 234, commission: 2340.00 },
    { name: 'Máscara Platinum', sales: 189, commission: 1890.00 },
    { name: 'Kit Coloração', sales: 156, commission: 3120.00 }
  ];

  const copyAffiliateLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white py-10">
      {/* Hero Section */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent mb-4">
          Creator Suite
        </h1>
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
          Transforme sua paixão por beleza em renda. Crie conteúdo, ganhe comissões e cresça com Alsham.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-gold/20 to-gold/5 border-gold/30 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Ganhos Totais</p>
                <p className="text-3xl font-bold text-gold">R$ {creatorStats.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">+R$ {creatorStats.thisMonth.toFixed(2)} este mês</p>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Visualizações</p>
                <p className="text-3xl font-bold text-white">{creatorStats.totalViews.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Taxa de conversão: {creatorStats.conversionRate}%</p>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Seguidores</p>
                <p className="text-3xl font-bold text-white">{creatorStats.followers.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">+1.2k esta semana</p>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Link2 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Links Ativos</p>
                <p className="text-3xl font-bold text-white">{creatorStats.activeLinks}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Todos aprovados</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Links */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Section */}
            <Card className="bg-[#1A1A1A] border-gold/30 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Seu Conteúdo</h2>
                  <p className="text-gray-400">Faça upload de fotos e vídeos para ganhar comissões</p>
                </div>
                <Button
                  onClick={() => setShowUpload(!showUpload)}
                  className="bg-gold hover:bg-gold/90 text-black font-bold"
                >
                  + Novo Upload
                </Button>
              </div>

              {showUpload && (
                <div className="mb-8">
                  <UGCUpload onClose={() => setShowUpload(false)} />
                </div>
              )}

              {/* Recent Content */}
              <div className="space-y-4">
                {recentContent.map((content) => (
                  <Card key={content.id} className="bg-[#0A0A0A] border-[#333] p-5 hover:border-gold/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gold/20 to-purple-500/20 flex items-center justify-center">
                        {content.type === 'video' ? (
                          <Video className="w-8 h-8 text-gold" />
                        ) : (
                          <Image className="w-8 h-8 text-gold" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold mb-1">{content.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{content.views.toLocaleString()} views</span>
                          <span>•</span>
                          <span className="text-gold font-bold">R$ {content.earnings.toFixed(2)}</span>
                        </div>
                      </div>
                      <Badge variant={content.status === 'approved' ? 'success' : 'warning'}>
                        {content.status === 'approved' ? '✓ Aprovado' : '⏳ Pendente'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Affiliate Link */}
            <Card className="bg-gradient-to-br from-gold/10 to-purple-500/10 border-gold/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Seu Link de Afiliado</h3>
              <p className="text-gray-300 mb-6">
                Compartilhe este link nas suas redes sociais e ganhe 10% de comissão em cada venda
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={affiliateLink}
                  readOnly
                  className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-gold"
                />
                <Button
                  onClick={copyAffiliateLink}
                  className="bg-gold hover:bg-gold/90 text-black font-bold px-6"
                >
                  {copiedLink ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
              {copiedLink && (
                <p className="text-green-400 text-sm mt-2">✓ Link copiado!</p>
              )}
            </Card>
          </div>

          {/* Right Column - Top Products & Tips */}
          <div className="space-y-8">
            {/* Top Products */}
            <Card className="bg-[#1A1A1A] border-[#333] p-6">
              <h3 className="text-xl font-bold text-white mb-4">Produtos Mais Vendidos</h3>
              <div className="space-y-4">
                {topProducts.map((product, idx) => (
                  <div key={idx} className="border-b border-[#333] pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-white font-medium">{product.name}</p>
                      <Badge variant="gold">{idx + 1}º</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{product.sales} vendas</span>
                      <span className="text-gold font-bold">R$ {product.commission.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Creator Tips */}
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 p-6">
              <h3 className="text-xl font-bold text-white mb-4">💡 Dicas para Creators</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-gold">✓</span>
                  <span>Poste conteúdo autêntico e de qualidade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✓</span>
                  <span>Use hashtags relevantes: #AlshamBeauty #MetalDetox</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✓</span>
                  <span>Mostre antes e depois dos produtos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✓</span>
                  <span>Responda comentários e engaje com sua audiência</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✓</span>
                  <span>Publique regularmente (3-5x por semana)</span>
                </li>
              </ul>
            </Card>

            {/* Commission Tiers */}
            <Card className="bg-[#1A1A1A] border-[#333] p-6">
              <h3 className="text-xl font-bold text-white mb-4">Níveis de Comissão</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[#333]">
                  <span className="text-gray-400">Bronze (0-50 vendas)</span>
                  <Badge variant="default">10%</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#333]">
                  <span className="text-gray-400">Prata (51-150 vendas)</span>
                  <Badge variant="default">15%</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Ouro (151+ vendas)</span>
                  <Badge variant="gold">20%</Badge>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Você está no nível <strong className="text-gold">Ouro</strong> 🏆
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
