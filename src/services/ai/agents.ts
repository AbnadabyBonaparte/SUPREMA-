// src/services/ai/agents.ts
export type ProfessionalType = 
  | 'barber_x0' | 'grooming_master' | 'beard_expert'
  | 'cabeleireira_x0' | 'colorista_x0' | 'hair_stylist_x0'
  | 'makeup_artist_x0' | 'beauty_guru' | 'skincare_expert'
  | 'bronze_master' | 'body_sculptor' | 'spa_therapist'
  | 'nail_artist_x0' | 'lash_expert' | 'brow_designer'
  | 'tattoo_artist' | 'piercing_master' | 'aesthetic_doctor';

export interface AgentConfig {
  id: ProfessionalType;
  name: string;
  title: string;
  category: 'Masculino' | 'Feminino' | 'Estética' | 'Corpo' | 'Detalhes' | 'Avançado';
  description: string;
  systemInstruction: string;
  featured: boolean;
}

export const agentConfigs: Record<ProfessionalType, AgentConfig> = {
  // MASCULINO
  barber_x0: { id: 'barber_x0', name: 'Barber Supreme', title: 'O Mestre do Corte Masculino', category: 'Masculino', description: 'Especialista em cortes modernos e degradês.', systemInstruction: `You are Barber Supreme X.0. Analyze face shape, hair density and lifestyle from images. Return exactly 3 distinct haircut recommendations in valid JSON array.`, featured: true },
  grooming_master: { id: 'grooming_master', name: 'Grooming Master', title: 'Cuidados Masculinos Avançados', category: 'Masculino', description: 'Rotinas de skincare e grooming masculino.', systemInstruction: `You are Grooming Master X.0. Analyze skin type and concerns. Return 3 personalized skincare routines in valid JSON.`, featured: false },
  beard_expert: { id: 'beard_expert', name: 'Beard Expert', title: 'Arquiteto de Barbas', category: 'Masculino', description: 'Design de barba perfeito para cada rosto.', systemInstruction: `You are Beard Expert X.0. Analyze jawline and face shape. Return 3 beard styles with trimming guide in valid JSON.`, featured: false },

  // FEMININO
  cabeleireira_x0: { id: 'cabeleireira_x0', name: 'Cabeleireira X.0', title: 'Design de Cabelos Feminino', category: 'Feminino', description: 'Cortes, tratamentos e styling feminino.', systemInstruction: `You are Cabeleireira X.0. Analyze hair texture and face shape. Return 3 hairstyle suggestions in valid JSON.`, featured: true },
  colorista_x0: { id: 'colorista_x0', name: 'Colorista X.0', title: 'Mestre da Colorimetria', category: 'Feminino', description: 'Coloração personalizada por tom de pele.', systemInstruction: `You are Colorista X.0. Analyze skin undertone and eye color. Return 3 color transformations in valid JSON.`, featured: false },
  hair_stylist_x0: { id: 'hair_stylist_x0', name: 'Hair Stylist X.0', title: 'Penteados de Alta Costura', category: 'Feminino', description: 'Updos e styling para eventos.', systemInstruction: `You are Hair Stylist X.0. Return 3 event-ready hairstyles with tutorials in valid JSON.`, featured: false },

  // ESTÉTICA
  makeup_artist_x0: { id: 'makeup_artist_x0', name: 'Makeup Artist X.0', title: 'Visagismo & Maquiagem', category: 'Estética', description: 'Maquiagem sob medida para cada rosto.', systemInstruction: `You are Makeup Artist X.0. Analyze features for contouring. Return 3 complete looks in valid JSON.`, featured: true },
  beauty_guru: { id: 'beauty_guru', name: 'Beauty Guru', title: 'Beleza Holística', category: 'Estética', description: 'Beleza integrando corpo, mente e pele.', systemInstruction: `You are Beauty Guru X.0. Return 3 holistic beauty rituals in valid JSON.`, featured: false },
  skincare_expert: { id: 'skincare_expert', name: 'Skincare Expert', title: 'Dermatologia Estética AI', category: 'Estética', description: 'Rotinas dermatológicas personalizadas.', systemInstruction: `You are Skincare Expert X.0. Analyze skin concerns from images. Return 3 routines with actives in valid JSON.`, featured: false },

  // CORPO
  bronze_master: { id: 'bronze_master', name: 'Bronze Master', title: 'Tanning & Skin Glow', category: 'Corpo', description: 'Bronzeamento perfeito sem sol.', systemInstruction: `You are Bronze Master X.0. Return 3 tanning methods with application map in valid JSON.`, featured: false },
  body_sculptor: { id: 'body_sculptor', name: 'Body Sculptor', title: 'Modelagem Corporal', category: 'Corpo', description: 'Escultura corporal sem cirurgia.', systemInstruction: `You are Body Sculptor X.0. Return 3 non-invasive sculpting plans in valid JSON.`, featured: false },
  spa_therapist: { id: 'spa_therapist', name: 'Spa Therapist', title: 'Terapias de Relaxamento', category: 'Corpo', description: 'Massagens e tratamentos relaxantes.', systemInstruction: `You are Spa Therapist X.0. Return 3 spa treatments with benefits in valid JSON.`, featured: false },

  // DETALHES
  nail_artist_x0: { id: 'nail_artist_x0', name: 'Nail Artist X.0', title: 'Design de Unhas', category: 'Detalhes', description: 'Nail art criativa e duradoura.', systemInstruction: `You are Nail Artist X.0. Return 3 nail designs with technique in valid JSON.`, featured: true },
  lash_expert: { id: 'lash_expert', name: 'Lash Expert', title: 'Extensão de Cílios', category: 'Detalhes', description: 'Olhar marcante com cílios perfeitos.', systemInstruction: `You are Lash Expert X.0. Return 3 lash styles with mapping in valid JSON.`, featured: false },
  brow_designer: { id: 'brow_designer', name: 'Brow Designer', title: 'Arquitetura Facial', category: 'Detalhes', description: 'Sobrancelhas que transformam o rosto.', systemInstruction: `You are Brow Designer X.0. Return 3 brow shapes with guide in valid JSON.`, featured: false },

  // AVANÇADO
  tattoo_artist: { id: 'tattoo_artist', name: 'Tattoo Artist', title: 'Body Art Design', category: 'Avançado', description: 'Tatuagens personalizadas e seguras.', systemInstruction: `You are Tattoo Artist X.0. Return 3 custom tattoo concepts in valid JSON.`, featured: false },
  piercing_master: { id: 'piercing_master', name: 'Piercing Master', title: 'Joalheria & Anatomia', category: 'Avançado', description: 'Piercings com segurança anatômica.', systemInstruction: `You are Piercing Master X.0. Include constellation styling. Return 3 piercing ideas in valid JSON.`, featured: false },
  aesthetic_doctor: { id: 'aesthetic_doctor', name: 'Aesthetic Doctor', title: 'O Médico da Estética Avançada', category: 'Avançado', description: 'Procedimentos minimamente invasivos.', systemInstruction: `You are Aesthetic Doctor X.0. Focus on safety and facial harmonization. Return 3 procedures with protocols in valid JSON.`, featured: false },
} as const;

export const getAgentById = (id: ProfessionalType) => agentConfigs[id];
export const getFeaturedAgents = () => Object.values(agentConfigs).filter(a => a.featured);