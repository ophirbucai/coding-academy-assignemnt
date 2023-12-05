import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { AnimalList } from './components/AnimalList/AnimalList';
import { SeasonClock } from "./components/SeasonClock/SeasonClock.jsx";
import { CountDown } from "./components/CountDown/CountDown.jsx";
import { WatcherApp } from "./components/WatcherApp/WatcherApp.jsx";
import { SelectApp } from "./components/SelectApp/SelectApp.jsx";
import { apps } from "./constants/apps.js";
import { animalService } from "./services/animal.service.js";
import { getSearchParam, setUrlSearchParam } from "./utils/url.util.js";
import { MouseMonitor } from "./components/MouseMonitor/MouseMonitor.jsx";
import { LucideGithub } from "lucide-react";

function App() {
    const [status, setStatus] = useState("loading"); // "loading" | "error" | "success"
    const [animalData, setAnimalData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedAppIndex, setSelectedAppIndex] = useState(() => {
        return apps?.[getSearchParam("app")] ? +getSearchParam("app") : 0;
    });
    const selectedApp = apps.at(selectedAppIndex);

    async function getAnimalInfo() {
        try {
            const { status, data, error } = await animalService.getAnimals();
            setStatus(status);
            setAnimalData(data || null);
            setError(error || null);
        } catch (error) {
            setError(error.message);
            setStatus("error");
        }
    }

    function selectApp(idx) {
        setStatus("loading");
        const maxIndex = apps.length - 1;
        if (idx < 0) {
            idx = maxIndex;
        } else if (idx > maxIndex) {
            idx = 0;
        }
        setUrlSearchParam("app", idx);
        setSelectedAppIndex(idx);
    }

    useEffect(() => {
        if (selectedApp.name === "animal-list" && status !== "success") {
            getAnimalInfo();
        }

    }, [selectedAppIndex])
    return (
        <>
            <header className={styles.header}>
                <div className={styles.header_logo}>
                    <a href="https://github.com/ophirbucai" className={styles.github}><LucideGithub fill="black" strokeWidth={0} /><span className={styles.moon_sun}></span></a>
                    <h1>React Basics</h1>
                </div>
                <SelectApp selectApp={selectApp} selectedAppIndex={selectedAppIndex} />
            </header>
            <main className={styles.container}>
                {selectedApp.name === "animal-list" && <AnimalList
                    animalInfos={animalData}
                    status={status}
                    error={error}
                    refetch={() => {
                        setStatus("loading");
                        getAnimalInfo();
                    }}
                />}
                {selectedApp.name === "season-clock" && <SeasonClock />}
                {selectedApp.name === "count-down" && <CountDown
                    startFrom={10}
                    onDone={console.log}
                    toTime={Date.now() + 3 * 1000}
                />}
                {selectedApp.name === "count-down" && <CountDown
                    startFrom={10}
                    onDone={console.log}
                />}
                {selectedApp.name === "watcher-app" && <WatcherApp />}
                {selectedApp.name === "mouse-monitor" && <MouseMonitor />}
            </main>
        </>
    )
}


export default App
