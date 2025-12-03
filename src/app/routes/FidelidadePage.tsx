// src/pages/FidelidadePage.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function FidelidadePage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setMessage("Bem-vindo ao Clube Black. Seus dados estão seguros.");
            setName('');
            setEmail('');
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="py-10">
            <h2 className="text-4xl font-light text-center text-foreground mb-2">LOYALTY SUPREME</h2>
            <p className="text-center text-gray-600 mb-12">Seu status no universo Alsham.</p>

            {/* Black Card Design */}
            <Card className="max-w-lg mx-auto bg-gradient-to-br from-[#1a1a1a] to-black border-[#333] p-10 relative overflow-hidden shadow-2xl">
                {/* Decorative circles */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-[#D4AF37]/10"></div>
                <div className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full border border-[#D4AF37]/5"></div>

                <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                        <h3 className="text-[#D4AF37] font-serif text-xl tracking-[2px] mb-1">ALSHAM</h3>
                        <span className="text-gray-700 text-[10px] uppercase tracking-[3px]">Black Member</span>
                    </div>
                    <div className="text-3xl">🦅</div>
                </div>

                <div className="mb-8 relative z-10">
                    <span className="block text-6xl font-light text-foreground mb-1">2,450</span>
                    <span className="text-xs uppercase tracking-[2px] text-[#D4AF37]">Supreme Points</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 relative z-10">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Progresso para Status Ouro</span>
                        <span>85%</span>
                    </div>
                    <div className="w-full h-1 bg-[#333] rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                    </div>
                </div>

                <p className="text-gray-700 text-xs font-mono mt-8 relative z-10">ID: 0000-8821-ALSHAM-X</p>
            </Card>

            {/* Registration Form */}
            <Card className="max-w-2xl mx-auto mt-12 bg-[#141414]/50 border-white/5 p-8">
                <h3 className="text-xl text-foreground mb-6 pb-3 border-b border-[#222] text-center">
                    {status === 'success' ? 'Cadastro Realizado com Sucesso' : 'Ativar Membership Oficial'}
                </h3>

                {status === 'success' ? (
                    <div className="text-center text-[#D4AF37] py-6">
                        <p className="text-lg">✅ {message}</p>
                    </div>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-5">
                        <div>
                            <label className="block text-gray-500 text-sm mb-2">Nome Completo</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-[#111] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-500 text-sm mb-2">Email Corporativo/Pessoal</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-[#111] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#D4AF37] text-black hover:bg-[#F2D06B] font-bold py-4 disabled:opacity-70"
                            size="lg"
                        >
                            {isSubmitting ? 'Processando...' : 'Cadastrar no Banco de Dados'}
                        </Button>
                        {status === 'error' && (
                            <p className="text-red-500 text-sm text-center mt-3">{message}</p>
                        )}
                    </form>
                )}
            </Card>

            {/* Rewards Section */}
            <div className="max-w-4xl mx-auto mt-16">
                <h3 className="text-2xl text-[#D4AF37] mb-8 text-center">Recompensas Disponíveis</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: 'Desconto 15%', points: 500, description: 'Em qualquer serviço' },
                        { title: 'Consultoria Grátis', points: 1000, description: 'Com especialista IA' },
                        { title: 'Upgrade Premium', points: 2000, description: '3 meses grátis' }
                    ].map((reward, idx) => (
                        <Card key={idx} className="bg-[#1A1A1A] border-[#333] p-6 text-center hover:border-[#D4AF37]/50 transition-colors">
                            <div className="text-4xl mb-3">🎁</div>
                            <h4 className="text-white font-bold mb-2">{reward.title}</h4>
                            <p className="text-gray-500 text-sm mb-4">{reward.description}</p>
                            <div className="text-[#D4AF37] font-bold text-lg">{reward.points} pts</div>
                            <Button
                                variant="outline"
                                className="mt-4 w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                            >
                                Resgatar
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FidelidadePage;
