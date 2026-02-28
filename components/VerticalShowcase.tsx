
import React from 'react';

const TEMPLATE_IMAGES = [
    "/templates/template 1.png",
    "/templates/template 2.png",
    "/templates/template 3.png",
    "/templates/template 4.png",
    "/templates/template 5.png",
    "/templates/template 6.png",
    "/templates/template 7.png",
    "/templates/template 8.png",
    "/templates/template 9.png",
];

const Column = ({ images, speed, direction }: { images: string[], speed: string, direction: 'up' | 'down' }) => {
    return (
        <div className="flex flex-col gap-4 w-full h-full relative">
            <div
                className={`flex flex-col gap-4 shrink-0 ${direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'}`}
                style={{ animationDuration: speed }}
            >
                {/* Double the images to ensure perfect seamless loop with 0 to -50% translation */}
                {[...images, ...images].map((src, i) => (
                    <div key={i} className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-brand-gray shrink-0">
                        <img
                            src={src}
                            alt={`Template ${i}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const VerticalShowcase: React.FC = () => {
    // Distribute images into 5 columns
    const col1 = [TEMPLATE_IMAGES[0], TEMPLATE_IMAGES[1], TEMPLATE_IMAGES[2]];
    const col2 = [TEMPLATE_IMAGES[3], TEMPLATE_IMAGES[4], TEMPLATE_IMAGES[5]];
    const col3 = [TEMPLATE_IMAGES[6], TEMPLATE_IMAGES[7], TEMPLATE_IMAGES[8]];
    const col4 = [TEMPLATE_IMAGES[1], TEMPLATE_IMAGES[4], TEMPLATE_IMAGES[7]];
    const col5 = [TEMPLATE_IMAGES[2], TEMPLATE_IMAGES[5], TEMPLATE_IMAGES[8]];

    return (
        <section className="bg-black overflow-hidden relative h-[800px] -mt-20 mb-10">
            {/* Sharp Gradient Overlays for smooth fade */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/90 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent z-20 pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 h-[800px] overflow-hidden">
                    <Column images={col1} speed="40s" direction="up" />
                    <Column images={col2} speed="35s" direction="down" />
                    <Column images={col3} speed="45s" direction="up" />
                    <div className="hidden md:block">
                        <Column images={col4} speed="38s" direction="down" />
                    </div>
                    <div className="hidden lg:block">
                        <Column images={col5} speed="42s" direction="up" />
                    </div>
                </div>
            </div>
        </section>
    );
};
