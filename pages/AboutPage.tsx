
import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    About Lade Stack
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Driving innovation through code and design.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <p className="text-lg leading-relaxed text-foreground">
                        Lade Stack is a digital platform dedicated to exploring the frontiers of technology, software development, and user interface design. Our mission is to share valuable insights, tutorials, and articles that empower developers and creators to build better digital experiences.
                    </p>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Founded by Girish Lade, a passionate software engineer with a love for clean code and elegant design, this blog serves as a hub for knowledge sharing and community building. We believe in the power of minimalism, clarity, and performance.
                    </p>
                </div>
                <div>
                    <img
                        src="https://picsum.photos/seed/about-us/600/600"
                        alt="About Lade Stack"
                        width={600}
                        height={600}
                        loading="lazy"
                        className="rounded-lg shadow-lg aspect-square object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
