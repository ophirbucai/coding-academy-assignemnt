import { useEffect, useState } from "react";

export function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isMonitoring, setIsMonitoring] = useState(true);

    useEffect(() => {
        function handleMouseMove(event) {
            setPosition({
                x: event.pageX,
                y: event.pageY,
            });
        }

        if (isMonitoring) {
            window.addEventListener("mousemove", handleMouseMove);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (isMonitoring) {
                window.removeEventListener("mousemove", handleMouseMove);
            }
        }
    }, [isMonitoring]);


    return {
        position,
        isMonitoring,
        toggleMonitoring: () => setIsMonitoring(prev => !prev)
    };
}