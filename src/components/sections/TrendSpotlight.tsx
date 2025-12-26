import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Flame, TrendingUp, Eye, Heart } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/motion-variants'

// TODO: Replace with real trends data from Supabase or AI recommendations
const trends = [
    {
        id: 1,
        title: 'Neon Cyberpunk Make',
        category: 'Makeup',
        views: '2.4M',
        growth: '+124%',
        image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
        tags: ['#CyberMake', '#NeonVibes'],
    },
    {
        id: 2,
        title: 'Glass Skin Routine',
        category: 'Skincare',
        views: '1.8M',
        growth: '+85%',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
        tags: ['#GlassSkin', '#KBeauty'],
    },
    {
        id: 3,
        title: 'Minimalist Nail Art',
        category: 'Nails',
        views: '950K',
        growth: '+45%',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
        tags: ['#NailArt', '#Minimal'],
    },
    {
        id: 4,
        title: 'Clean Girl Aesthetic',
        category: 'Lifestyle',
        views: '3.1M',
        growth: '+210%',
        image: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=800&q=80',
        tags: ['#CleanGirl', '#Aesthetic'],
    },
]

interface TrendSpotlightProps {
    onSelectTrend?: (trend: any) => void;
}

export default function TrendSpotlight({ onSelectTrend }: TrendSpotlightProps) {
    return (
        <div className="w-full relative overflow-hidden rounded-2xl">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-obsidian-900/50 via-obsidian-950/80 to-obsidian-950 z-0" />

            <div className="relative z-10 p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-sovereign-gold-500" />
                            <span className="text-sovereign-gold-500 font-display uppercase tracking-widest text-sm">
                                Global Intelligence
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display text-white">
                            Tendências em Ascensão
                        </h3>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="gold" className="animate-pulse">
                            Live Updates
                        </Badge>
                        <Badge variant="outline">
                            Global Feed
                        </Badge>
                    </div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {trends.map((trend) => (
                        <motion.div key={trend.id} variants={fadeInUp} onClick={() => onSelectTrend?.(trend)} className="cursor-pointer group">
                            <Card className="h-full overflow-hidden border-white/5 bg-white/5 hover:border-sovereign-gold-500/50 transition-all duration-500 group-hover:transform group-hover:-translate-y-2">
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img
                                        src={trend.image}
                                        alt={trend.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                    <div className="absolute top-3 left-3">
                                        <Badge className="bg-black/50 backdrop-blur border-white/10 text-xs">
                                            {trend.category}
                                        </Badge>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h4 className="font-display text-lg text-white mb-1 group-hover:text-sovereign-gold-400 transition-colors">
                                            {trend.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-xs text-white/60">
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3 h-3" /> {trend.views}
                                            </span>
                                            <span className="flex items-center gap-1 text-emerald-400">
                                                <Flame className="w-3 h-3" /> {trend.growth}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-8 flex justify-center">
                    <Button variant="outline" className="gap-2 text-white/60 hover:text-sovereign-gold-400">
                        Ver Relatório Completo <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
