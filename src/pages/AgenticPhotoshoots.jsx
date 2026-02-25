import { Helmet } from 'react-helmet-async';

export const AgenticPhotoshoots = () => {
    return (
        <main className="min-h-screen bg-cloud-dancer text-charcoal pt-32 pb-24 relative overflow-hidden">
            <Helmet>
                <title>The Synthetic Field Team | Ai Velocity Foundry</title>
                <meta name="description" content="Pioneering image-first discovery models and Agentic AI studio production." />
            </Helmet>

            {/* The Biological Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-dew-mint blur-[120px] rounded-full animate-breathe-mint pointer-events-none -z-10"></div>

            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-6xl md:text-8xl font-serif italic text-charcoal text-center mb-16">
                        Agentic Photoshoots
                    </h1>
                    <p className="font-mono text-sm leading-relaxed max-w-2xl opacity-80">
                        The intersection of sovereign visual intelligence and high-fidelity studio production.
                        Zero-friction deployment across global markets.
                    </p>
                </div>

                {/* Image Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="rounded-card shadow-xl overflow-hidden aspect-[4/5] cursor-pointer bg-charcoal/5">
                        <img src="/images/ai-model-1.webp" alt="Agentic AI Model 1" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="rounded-card shadow-xl overflow-hidden aspect-[4/5] cursor-pointer bg-charcoal/5">
                        <img src="/images/ai-model-2.webp" alt="Agentic AI Model 2" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="rounded-card shadow-xl overflow-hidden aspect-[4/5] cursor-pointer bg-charcoal/5">
                        <img src="/images/ai-model-3.webp" alt="Agentic AI Model 3" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="rounded-card shadow-xl overflow-hidden aspect-[4/5] cursor-pointer lg:col-start-1 lg:col-end-2 bg-charcoal/5">
                        <img src="/images/ai-model-4.webp" alt="Agentic AI Model 4" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="rounded-card shadow-xl overflow-hidden aspect-[4/5] cursor-pointer lg:col-start-2 lg:col-end-3 bg-charcoal/5">
                        <img src="/images/ai-model-5.webp" alt="Agentic AI Model 5" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                </div>
            </div>
        </main>
    );
};
