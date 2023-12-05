import styles from './WatcherApp.module.css';
import React, { useEffect, useState } from 'react';
import { watcherService } from "../../services/watcher.service.js";
import { WatcherCard } from "./WatcherCard/WatcherCard.jsx";
import { WatcherModal } from "./WatcherModal/WatcherModal.jsx";
import { LucideRotateCw } from "lucide-react";
import { WatcherCardEmpty } from "./WatcherCard/WatcherCardEmpty.jsx";

const newWatcher = {
    name: "",
    movies: [],
}

export function WatcherApp(props) {
    const [watchers, setWatchers] = useState(null);
    const [editingWatcherIdx, setEditingWatcherIdx] = useState(null);
    const editingWatcher = editingWatcherIdx !== null ? watchers[editingWatcherIdx] : null;

    async function onDelete(id) {
        const agree = confirm("Are you sure you want to delete this watcher?");
        if (!agree) return;
        const succeed = await watcherService.deleteWatcher(id);
        if (succeed) {
            setWatchers((prev) => prev.filter(watcher => watcher.id !== id));
        } else {
            alert("Something went wrong");
        }
    }

    async function updateWatcher(id, watcher) {
        const succeed = await watcherService.updateWatcher({ ...editingWatcher, ...watcher });
        if (succeed) {
            setWatchers((prev) => prev.map(w => w.id === id ? { ...w, ...watcher } : w));
            return true;
        }
        return false;
    }
    const initWatchers = async () => {
        const watchers = await watcherService.initWatchers();
        setWatchers(watchers);
    }
    async function createWatcher() {
        const name = prompt("What is the name of the watcher?");
        if (!name?.trim()) return;
        let movies = prompt("What are the movies of the watcher? (separated by commas)");
        if (!movies?.trim()) return;
        movies = movies.split(",").map(movie => movie.trim())
        const newWatcher = await watcherService.createWatcher({ name, movies });
        setWatchers((prev) => [...prev, newWatcher]);
    }

    useEffect(() => {
        initWatchers();

    }, []);

    return (
        <>
            <h2>Watcher</h2>
            <div style={{ height: 20 }}>
                {JSON.stringify({ props })}
            </div>
            <section className={styles.watchers}>
                {watchers ? watchers.length ? <>
                    {watchers.map((watcher, idx) => (
                        <WatcherCard
                            key={watcher.id}
                            {...watcher}
                            onSelect={() => setEditingWatcherIdx(idx)}
                            onDelete={() => onDelete(watcher.id)}
                        />
                    ))}
                    <WatcherCardEmpty onSelect={() => createWatcher()} />
                </> : <div className={styles.watchers_empty_state}>
                    <h3>Oh no, there are no watchers!</h3>
                    <button onClick={initWatchers} className={styles.watchers_empty_state_button}>Reload<LucideRotateCw size={15} /></button>
                </div> : <p style={{marginTop: "4rem"}}>Loading watchers...</p>}
            </section>
            {editingWatcher && (
                <WatcherModal
                    key={editingWatcher.id}
                    {...editingWatcher}
                    onClose={() => setEditingWatcherIdx(null)}
                    updateWatcher={updateWatcher}
                />
            )}
        </>
    );
};
