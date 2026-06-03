export const CTABanner = ({
    title = "Stay current. The future is moving fast."
}) => {
    return (
        <section className="w-full bg-[#212121] py-24">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                {/* Left: editorial heading */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white/95 tracking-tight leading-[1.1] max-w-2xl">
                        {title}
                    </h2>
                </div>

            </div>
        </section>
    );
};

