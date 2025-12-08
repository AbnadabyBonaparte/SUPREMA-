import { BadgeDynasty } from '@/components/ui/BadgeDynasty'
import { CardDynasty } from '@/components/ui/CardDynasty'

interface MatrixHubProps {
    onSelect: (id: string) => void;
    onSelectTrend: (trend: any) => void;
}

export default function MatrixHub({ onSelect, onSelectTrend }: MatrixHubProps) {
    return (
        <CardDynasty className="p-8 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
            <BadgeDynasty variant="outline">System Offline</BadgeDynasty>
            <h3 className="text-2xl font-display text-white/40">MatrixHub Neural Interface</h3>
            <p className="text-white/20 max-w-md">
                The agentic neural network is currently initializing.
                Detailed consultation services will be available in the next system update.
            </p>
        </CardDynasty>
    )
}
