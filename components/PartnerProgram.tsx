
import React, { useState } from 'react';

const PartnerProgram: React.FC = () => {
    const [formData, setFormData] = useState({
        salonName: '',
        ownerName: '',
        cnpj: '',
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulação de envio para CRM
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div style={{ padding: '100px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ color: '#D4AF37', fontSize: '2.5em', marginBottom: '20px' }}>Solicitação Recebida</h2>
                <p style={{ color: '#CCC', lineHeight: '1.6' }}>
                    Nossa equipe de expansão analisará o perfil do <strong>{formData.salonName}</strong>.
                    <br/>Você receberá o kit de boas-vindas e o acesso à plataforma Alsham Business em seu email em até 24 horas.
                </p>
                <button onClick={() => setSuccess(false)} style={{ marginTop: '30px', padding: '15px 30px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', cursor: 'pointer' }}>Voltar</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '40px 0' }}>
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <span style={{ color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8em', fontWeight: 'bold' }}>Alsham for Business</span>
                <h2 style={{ color: '#F0F0F0', fontSize: '3.5em', fontFamily: 'Cinzel, serif', margin: '10px 0' }}>A REVOLUÇÃO DO SALÃO</h2>
                <p style={{ color: '#888', maxWidth: '700px', margin: '0 auto', fontSize: '1.1em' }}>
                    Junte-se ao ecossistema que está digitalizando a beleza global. Aumente seu faturamento em até 40% com nossa IA e fluxo de clientes qualificados.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', maxWidth: '1000px', margin: '0 auto 80px auto' }}>
                <div>
                    <h3 style={{ color: '#FFF', borderLeft: '3px solid #D4AF37', paddingLeft: '15px', fontSize: '1.5em' }}>Por que ser Parceiro?</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px', color: '#CCC' }}>
                        <li style={{ marginBottom: '20px' }}>
                            <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '5px' }}>Fluxo de Clientes Premium</strong>
                            Receba agendamentos de usuários do plano Alsham Prime, com ticket médio mais alto.
                        </li>
                        <li style={{ marginBottom: '20px' }}>
                            <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '5px' }}>Inteligência Artificial</strong>
                            Use nossa IA de visagismo na cadeira do cliente para vender serviços adicionais e produtos.
                        </li>
                        <li style={{ marginBottom: '20px' }}>
                            <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '5px' }}>Gestão Completa</strong>
                            Sistema financeiro, agenda inteligente e controle de estoque (Supply Chain) em um só lugar.
                        </li>
                    </ul>
                </div>

                <div style={{ background: '#121212', padding: '40px', borderRadius: '12px', border: '1px solid #333' }}>
                    <h3 style={{ color: '#F0F0F0', textAlign: 'center', marginBottom: '30px', fontSize: '1.5em' }}>Credenciamento</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', color: '#888', fontSize: '0.8em', marginBottom: '5px' }}>Nome do Estabelecimento</label>
                            <input 
                                type="text" required 
                                value={formData.salonName} onChange={e => setFormData({...formData, salonName: e.target.value})}
                                style={{ width: '100%', padding: '12px', background: '#050505', border: '1px solid #333', color: '#FFF', borderRadius: '4px' }} 
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', color: '#888', fontSize: '0.8em', marginBottom: '5px' }}>Nome do Proprietário</label>
                            <input 
                                type="text" required
                                value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})}
                                style={{ width: '100%', padding: '12px', background: '#050505', border: '1px solid #333', color: '#FFF', borderRadius: '4px' }} 
                            />
                        </div>
                         <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', color: '#888', fontSize: '0.8em', marginBottom: '5px' }}>CNPJ</label>
                            <input 
                                type="text" required
                                value={formData.cnpj} onChange={e => setFormData({...formData, cnpj: e.target.value})}
                                style={{ width: '100%', padding: '12px', background: '#050505', border: '1px solid #333', color: '#FFF', borderRadius: '4px' }} 
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', color: '#888', fontSize: '0.8em', marginBottom: '5px' }}>Email Corporativo</label>
                            <input 
                                type="email" required
                                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                style={{ width: '100%', padding: '12px', background: '#050505', border: '1px solid #333', color: '#FFF', borderRadius: '4px' }} 
                            />
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', color: '#888', fontSize: '0.8em', marginBottom: '5px' }}>Telefone / WhatsApp</label>
                            <input 
                                type="tel" required
                                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                                style={{ width: '100%', padding: '12px', background: '#050505', border: '1px solid #333', color: '#FFF', borderRadius: '4px' }} 
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            style={{ 
                                width: '100%', 
                                padding: '15px', 
                                background: '#D4AF37', 
                                color: '#000', 
                                border: 'none', 
                                borderRadius: '4px', 
                                fontWeight: 'bold', 
                                cursor: 'pointer',
                                textTransform: 'uppercase'
                            }}
                        >
                            {isSubmitting ? 'Enviando...' : 'Solicitar Credenciamento'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PartnerProgram;
