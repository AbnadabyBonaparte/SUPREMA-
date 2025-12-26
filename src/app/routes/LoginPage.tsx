// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

interface LoginPageProps {
    onLoginSuccess?: () => void;
    onRegisterClick?: () => void;
}

export function LoginPage({ onLoginSuccess, onRegisterClick }: LoginPageProps) {
    const navigate = useNavigate();
    const { login, isLoading: authLoading } = useApp();
    const [activeTab, setActiveTab] = useState<'client' | 'partner'>('client');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (isSignUp) {
                // Para signup, usar Supabase diretamente
                const { supabase } = await import('@/lib/supabaseClient');
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            name: name || email.split('@')[0],
                        },
                    },
                });
                if (error) throw error;
                // Mostrar mensagem de sucesso
                setError(null);
                alert('Conta criada! Verifique seu email para confirmar.');
                setIsSignUp(false);
            } else {
                await login(email, password);
                // AppContext já será atualizado automaticamente via onAuthStateChange
                if (onLoginSuccess) {
                    onLoginSuccess();
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err: any) {
            setError(err.message || 'Erro ao autenticar. Verifique suas credenciais.');
            console.error('Auth error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh] py-10">
            <Card className="w-full max-w-md bg-[#121212] border-[#333] p-10 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="font-serif text-foreground text-3xl mb-2">THE VAULT</h2>
                    <p className="text-gray-600 text-xs uppercase tracking-[2px]">Acesso Seguro Alsham</p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#333] mb-8">
                    <button
                        onClick={() => setActiveTab('client')}
                        className={`flex-1 py-4 text-sm uppercase tracking-wider font-bold transition-colors ${activeTab === 'client'
                                ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                                : 'text-gray-600 border-b-2 border-transparent'
                            }`}
                    >
                        Cliente
                    </button>
                    <button
                        onClick={() => setActiveTab('partner')}
                        className={`flex-1 py-4 text-sm uppercase tracking-wider font-bold transition-colors ${activeTab === 'partner'
                                ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                                : 'text-gray-600 border-b-2 border-transparent'
                            }`}
                    >
                        Parceiro B2B
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {isSignUp && (
                        <div>
                            <label className="block text-gray-500 text-sm mb-2">Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                placeholder="Seu nome completo"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-500 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                            placeholder="exemplo@email.com"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-gray-500 text-sm">Senha</label>
                            <span className="text-[#D4AF37] text-xs cursor-pointer hover:underline">Esqueceu?</span>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting || authLoading}
                        className="w-full bg-[#D4AF37] text-black hover:bg-[#F2D06B] font-bold uppercase tracking-wider py-4 disabled:opacity-70"
                        size="lg"
                    >
                        {isSubmitting || authLoading ? 'Autenticando...' : isSignUp ? 'Criar Conta' : 'Entrar no Sistema'}
                    </Button>
                </form>

                {/* Social Login */}
                <div className="mt-8 text-center">
                    <p className="text-gray-700 text-sm mb-4">ou entre com</p>
                    <div className="flex gap-4 justify-center">
                        <button className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#333] text-white hover:border-[#D4AF37]/50 transition-colors">
                            G
                        </button>
                        <button className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#333] text-white hover:border-[#D4AF37]/50 transition-colors">
                            f
                        </button>
                    </div>
                </div>

                {/* Register Link */}
                {activeTab === 'client' && (
                    <div className="mt-10 text-center border-t border-[#222] pt-6">
                        <p className="text-gray-500 text-sm mb-2">
                            {isSignUp ? 'Já tem uma conta?' : 'Ainda não é membro?'}
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError(null);
                            }}
                            className="text-[#D4AF37] font-bold uppercase text-sm tracking-wider hover:underline"
                        >
                            {isSignUp ? 'Fazer Login' : 'Criar Conta Premium'}
                        </button>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default LoginPage;
