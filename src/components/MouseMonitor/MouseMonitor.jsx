import styles from './MouseMonitor.module.css';
import React from 'react';
import { useMousePosition } from "@/hooks/useMousePosition";
import { LucidePause, LucidePlay } from "lucide-react";

export function MouseMonitor() {
    const { position, isMonitoring, toggleMonitoring } = useMousePosition();
    return (
        <section>
            <h2>Mouse Monitor</h2>
            <div className={styles.mouse_monitor}>
                <div>
                    <div>
                        <span>X: </span>
                        <span>{position.x}</span>
                    </div>
                    <div>
                        <span>Y: </span>
                        <span>{position.y}</span>
                    </div>
                </div>
                <button className={styles.mouse_monitor_toggle} onClick={toggleMonitoring}>
                    {isMonitoring ? (
                        <>{"Pause"}<LucidePause fill="#cacaca" stroke="#ccc" strokeOpacity={.7} /></>
                    ) : (
                        <>{"Resume" }<LucidePlay stroke="green" fill="green" strokeOpacity={.7} /></>)
                    }
                </button>
            </div>
        </section>
    );
}
