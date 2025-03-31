import { useEffect, useState } from "react";
import { ArrowUp } from 'lucide-react';

        const ScrollUp = () => {
        const [isVisible, setIsVisible] = useState(false);

            const checkScrollPosition = () => {
                if (window.scrollY > 100) {
                setIsVisible(true);
                } else {
                setIsVisible(false);
                }
            };

            const scrollToTop = () => {
                window.scrollTo({
                top: 0,
                behavior: 'smooth',
                });
            };

            useEffect(() => {
                window.addEventListener('scroll', checkScrollPosition);
                return () => {
                window.removeEventListener('scroll', checkScrollPosition);
                };
            }, []);

        return (
                isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-3 bg-[#039AE4] text-white w-[50px] h-[50px] rounded-full shadow-lg hover:bg-[#039AE4] focus:outline-none transition-all z-50"
                >
                      <ArrowUp />
                </button>
                )
            );
        };

export default ScrollUp;
