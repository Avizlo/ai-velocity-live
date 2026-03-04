import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import './globals.css';

export const metadata = {
    title: 'Ai Velocity Foundry | Leading the Era of Agentic Commerce',
    description: 'Master the shift to Agentic Commerce and Marketing with Ai Velocity. We provide the tools for the next generation of commerce.',
    keywords: 'Agentic Commerce, Agentic Marketing, Sovereign Visual Intelligence, Autonomous Growth',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preload" href="/fonts/times-italic.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
            </head>
            <body>
                <div className="relative w-full min-h-screen bg-[#F0F0EC] text-[#1A1A1A]">
                    <Navbar />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
