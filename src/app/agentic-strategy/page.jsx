import { StrategyOption1 } from '@/components/sections/StrategyOption1';
import { StrategyOption3 } from '@/components/sections/StrategyOption3';

export const metadata = {
    title: 'Agentic Strategy | AI Velocity',
    description: 'Preparing your brand for the coming months ahead as agentic commerce transforms online retail.',
};

export default function AgenticStrategyPage() {
    return (
        <main className="min-h-screen bg-charcoal selection:bg-electric-mint selection:text-charcoal relative">
            <StrategyOption1 />
            <StrategyOption3 />
        </main>
    );
}
