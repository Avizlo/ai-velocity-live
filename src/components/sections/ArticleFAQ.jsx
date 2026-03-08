"use client";

import { useState, useRef, useEffect } from 'react';

const FAQItem = ({ faq, isOpen, onToggle, index }) => {
    const bodyRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (bodyRef.current) {
            setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <div className="border-t border-white/10 last:border-b last:border-white/10">
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`article-faq-${index}`}
                className="w-full flex items-center justify-between gap-8 py-6 text-left group cursor-pointer"
            >
                <h3 className="font-sans text-lg font-medium tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                    {faq.question}
                </h3>
                <span className="shrink-0 w-5 h-5 flex items-center justify-center">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`text-electric-mint transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                    >
                        <line x1="7" y1="0" x2="7" y2="14" />
                        <line x1="0" y1="7" x2="14" y2="7" />
                    </svg>
                </span>
            </button>

            <div
                id={`article-faq-${index}`}
                role="region"
                aria-hidden={!isOpen}
                style={{
                    height: `${height}px`,
                    overflow: 'hidden',
                    transition: 'height 0.55s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease',
                    opacity: isOpen ? 1 : 0,
                }}
            >
                <div ref={bodyRef}>
                    <p className="pb-6 text-white/60 font-sans font-light leading-relaxed max-w-2xl text-base">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const ArticleFAQ = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="mt-16 pt-16 border-t border-white/10">
            <h2 className="font-serif font-normal tracking-tight text-white text-3xl md:text-4xl mb-10">
                Frequently Asked Questions
            </h2>
            <div className="flex flex-col">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        index={index}
                        faq={faq}
                        isOpen={openIndex === index}
                        onToggle={() => toggle(index)}
                    />
                ))}
            </div>
        </section>
    );
};
