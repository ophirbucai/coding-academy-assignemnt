import styles from './SeasonClock.module.css';

import React, { useEffect, useMemo, useState } from 'react';

import { seasonService } from "../../services/season.service.js";
import { getAssetUrl } from "../../utils/url.util.js";
import clsx from "clsx";

export function SeasonClock(props) {
    const [date, setDate] = useState(new Date());
    const [isDark, setIsDark] = useState(false);
    const month = seasonService.getMonth(date);

    const season = useMemo(() => {
        const seasonName = seasonService.getSeasonName(date);
        return {
            name: seasonName,
            colors: seasonService.getSeasonColors(seasonName),
        }

    }, [month])

    useEffect(() => {
        const interval = setInterval(() => {
            setDate((date) => new Date(date.getTime() + 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section>
            <h2>Season Clock</h2>
            <div style={{ height: 20 }}>
                {JSON.stringify({ props })} <input type="date" value={date.toISOString().split('T')[0]} onChange={e => setDate(date => {
                    if (!isNaN(e.target.valueAsNumber)) {
                        const newDate = e.target.valueAsDate;
                        newDate.setHours(date.getHours());
                        newDate.setMinutes(date.getMinutes());
                        newDate.setSeconds(date.getSeconds());
                        return newDate;
                    }
                    return date;
            })} />
            </div>
            <header className={styles.season_clock_header}>
                <h2>Season Clock</h2>
                <img src={getAssetUrl("./img/seasons.png")} alt="Seasons"/>
            </header>
            <div className={clsx(styles.season_clock, { [styles.dark]: isDark })}
                 style={{ backgroundColor: isDark ? season.colors.dark : season.colors.light }}
                 onClick={() => setIsDark((prev) => !prev)}
            >
                <h3>{month && month} {season.name && `(${season.name})`}</h3>
                <div>
                    <img src={getAssetUrl(`./img/${season.name.toLowerCase()}.png`)} height={150} alt={season.name}/>
                </div>
                <p>
                    {date.toLocaleTimeString("en-US", { weekday: "long" })}
                </p>
            </div>
        </section>
    );
};
