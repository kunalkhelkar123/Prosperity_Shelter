import React, { useState, useEffect, useRef } from 'react';

const AboutBounce = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [count, setCount] = useState(0); // Start count from 0
    const [isPaused, setIsPaused] = useState(false); // State to control pause
    const counterRef = useRef(null);
  
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.5, 1] // Fire when the element enters or exits the viewport
        };

        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
            if (!entry.isIntersecting) {
                setCount(0); // Reset count when the element is not visible
            }
        }, options);

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                if (!isPaused) {
                    if (count < 100) {
                        setCount(prevCount => prevCount + 1); // Increment count
                    } else {
                        setIsPaused(true); // Pause counting
                        setTimeout(() => {
                            setCount(1); // Reset count to 1 after 5 seconds
                            setIsPaused(false); // Resume counting
                        }, 5000);
                    }
                }
            }, 10); // Change the interval as needed (milliseconds)

            // Cleanup interval on component unmount or when count reaches 100
            return () => clearInterval(interval);
        }
    }, [isVisible, count, isPaused]);

    return (
        <div>
            <div className="container mx-auto mt-8 text-center" ref={counterRef}>
                {isVisible && (
                    <h1 className="text-4xl font-bold mb-4">Counting: {count}</h1>
                )}
            </div>
            {/* Other components and content here */}
        </div>
    );
};

export default AboutBounce;
