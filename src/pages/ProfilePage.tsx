// src/pages/ProfilePage.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ProfilePage() {
    const [formData, setFormData] = useState({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-9999',
        birthdate: '1990-05-15',
        gender: 'male',
        skinType: 'normal',
        hairType: 'wavy',
        preferences: {
            notifications: true,
            newsletter: true,
            recommendations: true
        }
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsEditing(false);
            alert('Perfil atualizado com sucesso!');
        }, 1000);
    };

    return (
        <div className="py-10 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-serif text-foreground mb-2">Meu Perfil</h1>
                    <p className="text-gray-500">Gerencie suas informações pessoais e preferências</p>
                </div>
                {!isEditing && (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#D4AF37] text-black hover:bg-[#F2D06B]"
                    >
                        Editar Perfil
                    </Button>
                )}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Avatar & Stats */}
                <div className="space-y-6">
                    <Card className="bg-[#1A1A1A] border-[#333] p-6 text-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F2D06B] mx-auto mb-4 flex items-center justify-center text-6xl">
                            👤
                        </div>
                        <h3 className="text-white font-bold text-xl mb-1">{formData.name}</h3>
                        <p className="text-gray-500 text-sm mb-4">{formData.email}</p>

                        {isEditing && (
                            <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-sm">
                                Alterar Foto
                            </Button>
                        )}
                    </Card>

                    <Card className="bg-[#1A1A1A] border-[#333] p-6">
                        <h4 className="text-white font-bold mb-4">Estatísticas</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Membro desde</span>
                                <span className="text-white text-sm font-medium">Jan 2024</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Agendamentos</span>
                                <span className="text-white text-sm font-medium">24</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Consultorias IA</span>
                                <span className="text-white text-sm font-medium">47</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Nível</span>
                                <span className="text-[#D4AF37] text-sm font-bold">Black Member</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-[#1A1A1A] border-[#333] p-8">
                        <h3 className="text-white font-bold text-xl mb-6">Informações Pessoais</h3>

                        <div className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Nome Completo</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 disabled:opacity-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                                    <input
                                        type="email"
                                        disabled={!isEditing}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Telefone</label>
                                    <input
                                        type="tel"
                                        disabled={!isEditing}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 disabled:opacity-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        disabled={!isEditing}
                                        value={formData.birthdate}
                                        onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Gênero</label>
                                <select
                                    disabled={!isEditing}
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 disabled:opacity-50"
                                >
                                    <option value="male">Masculino</option>
                                    <option value="female">Feminino</option>
                                    <option value="other">Outro</option>
                                    <option value="prefer-not">Prefiro não informar</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-[#1A1A1A] border-[#333] p-8">
                        <h3 className="text-white font-bold text-xl mb-6">Preferências de Beleza</h3>

                        <div className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Tipo de Pele</label>
                                    <select
                                        disabled={!isEditing}
                                        value={formData.skinType}
                                        onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 disabled:opacity-50"
                                    >
                                        <option value="oily">Oleosa</option>
                                        <option value="dry">Seca</option>
                                        <option value="normal">Normal</option>
                                        <option value="combination">Mista</option>
                                        <option value="sensitive">Sensível</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Tipo de Cabelo</label>
                                    <select
                                        disabled={!isEditing}
                                        value={formData.hairType}
                                        onChange={(e) => setFormData({ ...formData, hairType: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 disabled:opacity-50"
                                    >
                                        <option value="straight">Liso</option>
                                        <option value="wavy">Ondulado</option>
                                        <option value="curly">Cacheado</option>
                                        <option value="coily">Crespo</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-[#1A1A1A] border-[#333] p-8">
                        <h3 className="text-white font-bold text-xl mb-6">Notificações</h3>

                        <div className="space-y-4">
                            {[
                                { key: 'notifications', label: 'Notificações Push', desc: 'Receba alertas sobre agendamentos' },
                                { key: 'newsletter', label: 'Newsletter', desc: 'Tendências e novidades semanais' },
                                { key: 'recommendations', label: 'Recomendações IA', desc: 'Sugestões personalizadas de produtos' }
                            ].map(pref => (
                                <div key={pref.key} className="flex items-center justify-between py-3 border-b border-[#333] last:border-0">
                                    <div>
                                        <p className="text-white font-medium">{pref.label}</p>
                                        <p className="text-gray-500 text-sm">{pref.desc}</p>
                                    </div>
                                    <button
                                        disabled={!isEditing}
                                        onClick={() => setFormData({
                                            ...formData,
                                            preferences: {
                                                ...formData.preferences,
                                                [pref.key]: !formData.preferences[pref.key as keyof typeof formData.preferences]
                                            }
                                        })}
                                        className={`w-12 h-6 rounded-full transition-colors ${formData.preferences[pref.key as keyof typeof formData.preferences]
                                                ? 'bg-[#D4AF37]'
                                                : 'bg-gray-700'
                                            } ${!isEditing && 'opacity-50'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${formData.preferences[pref.key as keyof typeof formData.preferences]
                                                ? 'translate-x-6'
                                                : 'translate-x-1'
                                            }`}></div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {isEditing && (
                        <div className="flex gap-4">
                            <Button
                                onClick={() => setIsEditing(false)}
                                variant="outline"
                                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex-1 bg-[#D4AF37] text-black hover:bg-[#F2D06B]"
                            >
                                {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
