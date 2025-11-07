
import React, { useState, useEffect, RefObject } from 'react';

interface ScrollProgressBarProps {
    targetRef?: RefObject<HTMLElement>;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ targetRef }) => {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleScroll = () => {
        const targetEl = targetRef?.current;

        if (targetEl) {
            const elTop = targetEl.offsetTop;
            const elHeight = targetEl.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;

            // The progress bar is only meaningful for elements taller than the viewport.
            if (elHeight <= viewportHeight) {
                setScrollPercentage(0);
                return;
            }

            // This is the total distance the user can scroll while the element is in view.
            const totalScrollableDistance = elHeight - viewportHeight;
            // This is how far the user has scrolled past the top of the element.
            const scrolledDistance = scrollY - elTop;

            if (scrolledDistance < 0) {
                setScrollPercentage(0);
                return;
            }

            if (scrolledDistance > totalScrollableDistance) {
                setScrollPercentage(100);
                return;
            }
            
            const percentage = (scrolledDistance / totalScrollableDistance) * 100;
            setScrollPercentage(percentage);
        } else {
            // Fallback to document scroll if no targetRef is provided
            const element = document.documentElement;
            const scrollTop = element.scrollTop || document.body.scrollTop;
            const scrollHeight = element.scrollHeight || document.body.scrollHeight;
            const clientHeight = element.clientHeight || window.innerHeight;

            const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
            
            if (scrolled >= 0 && scrolled <= 100) {
                setScrollPercentage(scrolled);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Recalculate on mount or when targetRef changes
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [targetRef]);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
            <div
                className="h-full bg-primary transition-all duration-150 ease-out"
                style={{ width: `${scrollPercentage}%` }}
            />
        </div>
    );
};
