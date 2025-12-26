// src/pages/SettingsPage.tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/contexts/AppContext';
import { 
  Settings, Shield, Bell, Eye, Database, Trash2, Download, 
  Lock, Globe, Sparkles, Moon, Sun, Smartphone 
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useApp();
  const [activeTab, setActiveTab] = useState<'general' | 'privacy' | 'ai' | 'notifications'>('general');
  const isDarkMode = theme === 'dark';
  const [language, setLanguage] = useState('pt-BR');
  
  // Privacy Settings
  const [dataCollection, setDataCollection] = useState(true);
  const [personalization, setPersonalization] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [thirdPartySharing, setThirdPartySharing] = useState(false);
  
  // AI Settings
  const [aiRecommendations, setAiRecommendations] = useState(true);
  const [aiChatHistory, setAiChatHistory] = useState(true);
  const [aiImageAnalysis, setAiImageAnalysis] = useState(true);
  const [aiVoiceData, setAiVoiceData] = useState(false);
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);

  const handleSave = () => {
    alert('✅ Configurações salvas com sucesso!');
  };

  const handleExportData = () => {
    alert('📦 Seus dados serão enviados por email em até 48h (LGPD/GDPR)');
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm(
      '⚠️ ATENÇÃO: Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos. Deseja continuar?'
    );
    if (confirm) {
      alert('Conta agendada para exclusão em 30 dias. Você pode cancelar fazendo login novamente.');
    }
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: Settings },
    { id: 'privacy', label: 'Privacidade', icon: Shield },
    { id: 'ai', label: 'Inteligência Artificial', icon: Sparkles },
    { id: 'notifications', label: 'Notificações', icon: Bell }
  ];

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-14 h-7 rounded-full transition-colors ${
        enabled ? 'bg-gold' : 'bg-gray-700'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      ></div>
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <h1 className="text-5xl font-bold mb-3">Configurações</h1>
        <p className="text-gray-400 text-lg">Gerencie suas preferências e privacidade</p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Tabs */}
          <div className="lg:col-span-1">
            <Card className="bg-surface border-border p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gold text-black font-bold'
                          : 'text-muted hover:bg-background hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === 'general' && (
              <Card className="bg-surface border-border p-8">
                <h2 className="text-2xl font-bold mb-6">Configurações Gerais</h2>

                <div className="space-y-6">
                  {/* Theme */}
                  <div>
                    <label className="block text-foreground font-medium mb-3">Tema</label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setIsDarkMode(true)}
                        className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg border-2 transition-colors ${
                          isDarkMode
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Moon className="w-5 h-5" />
                        <span>Escuro</span>
                      </button>
                      <button
                        onClick={() => setTheme('light')}
                        className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg border-2 transition-colors ${
                          !isDarkMode
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Sun className="w-5 h-5" />
                        <span>Claro</span>
                      </button>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  {/* Language */}
                  <div>
                    <label className="block text-foreground font-medium mb-3">Idioma</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                      <option value="fr-FR">Français</option>
                    </select>
                  </div>

                  <Separator className="bg-border" />

                  {/* Region */}
                  <div>
                    <label className="block text-white font-medium mb-3">Região</label>
                    <div className="flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-lg">
                      <Globe className="w-5 h-5 text-muted" />
                      <span>Brasil (BRL - R$)</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <Card className="bg-surface border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-gold" />
                  <div>
                    <h2 className="text-2xl font-bold">Privacidade e Dados</h2>
                    <p className="text-gray-400 text-sm">Controle total sobre seus dados pessoais</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Data Collection */}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <p className="text-white font-medium mb-1">Coleta de Dados</p>
                      <p className="text-gray-400 text-sm">Permitir coleta de dados de uso para melhorar a experiência</p>
                    </div>
                    <ToggleSwitch enabled={dataCollection} onChange={() => setDataCollection(!dataCollection)} />
                  </div>

                  {/* Personalization */}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <p className="text-white font-medium mb-1">Personalização</p>
                      <p className="text-gray-400 text-sm">Usar dados para personalizar recomendações</p>
                    </div>
                    <ToggleSwitch enabled={personalization} onChange={() => setPersonalization(!personalization)} />
                  </div>

                  {/* Analytics */}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <p className="text-white font-medium mb-1">Analytics</p>
                      <p className="text-gray-400 text-sm">Compartilhar dados anônimos para análise</p>
                    </div>
                    <ToggleSwitch enabled={analytics} onChange={() => setAnalytics(!analytics)} />
                  </div>

                  {/* Third Party Sharing */}
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <p className="text-white font-medium mb-1">Compartilhamento com Terceiros</p>
                      <p className="text-gray-400 text-sm">Permitir compartilhamento com parceiros (desabilitado por padrão)</p>
                    </div>
                    <ToggleSwitch enabled={thirdPartySharing} onChange={() => setThirdPartySharing(!thirdPartySharing)} />
                  </div>

                  <Separator className="bg-border" />

                  {/* Data Management */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Gerenciamento de Dados</h3>
                    
                    <Button
                      onClick={handleExportData}
                      variant="outline"
                      className="w-full border-gold text-gold hover:bg-gold hover:text-black justify-start"
                    >
                      <Download className="w-5 h-5 mr-3" />
                      Exportar Meus Dados (LGPD/GDPR)
                    </Button>

                    <Button
                      onClick={handleDeleteAccount}
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white justify-start"
                    >
                      <Trash2 className="w-5 h-5 mr-3" />
                      Excluir Minha Conta
                    </Button>
                  </div>

                  {/* Privacy Badge */}
                  <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30 p-4">
                    <div className="flex items-center gap-3">
                      <Lock className="w-6 h-6 text-green-400" />
                      <div>
                        <p className="text-white font-bold text-sm">Seus dados estão protegidos</p>
                        <p className="text-gray-400 text-xs">Criptografia end-to-end e conformidade com LGPD/GDPR</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            )}

            {/* AI Settings */}
            {activeTab === 'ai' && (
              <Card className="bg-surface border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-gold" />
                  <div>
                    <h2 className="text-2xl font-bold">Inteligência Artificial</h2>
                    <p className="text-gray-400 text-sm">Configure como a IA usa seus dados</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* AI Recommendations */}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <p className="text-white font-medium mb-1">Recomendações IA</p>
                      <p className="text-gray-400 text-sm">Receber sugestões personalizadas de produtos e estilos</p>
                    </div>
                    <ToggleSwitch enabled={aiRecommendations} onChange={() => setAiRecommendations(!aiRecommendations)} />
                  </div>

                  {/* Chat History */}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <p className="text-white font-medium mb-1">Histórico de Conversas</p>
                      <p className="text-gray-400 text-sm">Salvar conversas com AURA para melhorar respostas</p>
                    </div>
                    <ToggleSwitch enabled={aiChatHistory} onChange={() => setAiChatHistory(!aiChatHistory)} />
                  </div>

                  {/* Image Analysis */}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <p className="text-white font-medium mb-1">Análise de Imagens</p>
                      <p className="text-gray-400 text-sm">Permitir IA analisar fotos para recomendações (try-on, scanner)</p>
                    </div>
                    <ToggleSwitch enabled={aiImageAnalysis} onChange={() => setAiImageAnalysis(!aiImageAnalysis)} />
                  </div>

                  {/* Voice Data */}
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <p className="text-white font-medium mb-1">Dados de Voz</p>
                      <p className="text-gray-400 text-sm">Usar comandos de voz e salvar para melhorar reconhecimento</p>
                    </div>
                    <ToggleSwitch enabled={aiVoiceData} onChange={() => setAiVoiceData(!aiVoiceData)} />
                  </div>

                  <Separator className="bg-border" />

                  {/* AI Model Info */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Modelo de IA Atual</h3>
                    <Card className="bg-background border-primary/30 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-400">Modelo:</span>
                        <Badge variant="gold">Google Gemini 2.5 Pro</Badge>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-400">Última Atualização:</span>
                        <span className="text-white">30/11/2025</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Consultas este mês:</span>
                        <span className="text-white">47</span>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <Card className="bg-surface border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-8 h-8 text-gold" />
                  <div>
                    <h2 className="text-2xl font-bold">Notificações</h2>
                    <p className="text-gray-400 text-sm">Escolha como deseja ser notificado</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <p className="text-white font-medium mb-1">Email</p>
                      <p className="text-gray-400 text-sm">Receber notificações por email</p>
                    </div>
                    <ToggleSwitch enabled={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                  </div>

                  {/* Push */}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium mb-1">Push Notifications</p>
                        <p className="text-gray-400 text-sm">Notificações no navegador/app</p>
                      </div>
                    </div>
                    <ToggleSwitch enabled={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
                  </div>

                  {/* SMS */}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <p className="text-white font-medium mb-1">SMS</p>
                      <p className="text-gray-400 text-sm">Receber SMS para pedidos e agendamentos</p>
                    </div>
                    <ToggleSwitch enabled={smsNotifications} onChange={() => setSmsNotifications(!smsNotifications)} />
                  </div>

                  {/* Marketing */}
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <p className="text-white font-medium mb-1">Emails de Marketing</p>
                      <p className="text-gray-400 text-sm">Novidades, promoções e tendências</p>
                    </div>
                    <ToggleSwitch enabled={marketingEmails} onChange={() => setMarketingEmails(!marketingEmails)} />
                  </div>
                </div>
              </Card>
            )}

            {/* Save Button */}
            <div className="mt-8 flex gap-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-gold hover:bg-gold/90 text-black font-bold text-lg py-6"
              >
                Salvar Configurações
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
