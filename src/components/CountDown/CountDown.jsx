import styles from './CountDown.module.css';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { LucideRotateCw, LucideVolume2, LucideVolumeX } from "lucide-react";
import { getAssetUrl } from "../../utils/url.util.js";
import clsx from "clsx";


/**
 * @param startFrom - number of seconds to start from
 * @param onDone - callback function to run when count down is done
 * @param toTime - timestamp to count up to (if not provided, will count down to 0)
 */
export function CountDown({ startFrom, onDone, toTime = 0 }) {
    const [count, setCount] = useState(toTime ? Date.now() : startFrom);
    const intervalId = useRef(0);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const finished = toTime ? count >= toTime : count === 0;

    useEffect(() => {
        intervalId.current = setInterval(() => {
            setCount(count => toTime ? count + 1000 : count - 1);
        }, 1000);
        checkIfDone();

        return () => clearInterval(intervalId.current);
    }, [count])

    function checkIfDone() {
        if (finished) {
            clearInterval(intervalId.current);
            onDone("Count down is done!");
            if (soundEnabled) {
                new Audio(getAssetUrl("sound/mixkit-cartoon-positive-sound-2255.wav"))?.play()
            }
        }
    }

    function resetCount() {
        // if reset was less than a second ago, ignore
        if (Date.now() - count < 1000) return;
        // only works with count down of seconds since the to time is fixed (not counting up)
        setCount(startFrom);
    }

    return (
        <section>
            <h2>Count Down</h2>
            <div style={{ height: 20 }}>{JSON.stringify({ props: { startFrom, onDone, toTime } })}</div>

            <Counter count={count} finished={finished} resetCount={!toTime ? resetCount : null}/>
            <button className={styles.sound_button} onClick={() => setSoundEnabled(!soundEnabled)}>
                {!soundEnabled ? <LucideVolumeX/> : <LucideVolume2/>}
            </button>
        </section>
    );
};

function Counter({ count, resetCount, finished }) {
    const warn = !finished && count <= 6;
    return (
        <div className={clsx({ [styles.finished]: finished, [styles.warn]: warn }, styles.countdown)}>
            <h4 className={styles.count}>{count}</h4>

            {resetCount && (
                <button onClick={resetCount} className={styles.reset_button}>
                    <LucideRotateCw/>Restart counter
                </button>
            )}
            <p className={styles.message}>
                {finished ? "= Congrats! =" : warn ? "Gonna end soon!" : null}
            </p>
        </div>
    )
}

CountDown.propTypes = {
    startFrom: PropTypes.number.isRequired,
    onDone: PropTypes.func.isRequired,
    toTime: PropTypes.number, // timestamp
};
