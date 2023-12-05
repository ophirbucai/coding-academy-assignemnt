import { storageService } from "./async-storage.service.js";
import { randomColorUtil } from "../utils/random-color.util.js";

export const watcherService = {
    initWatchers,
    deleteWatcher,
    updateWatcher,
    createWatcher
}

const WATCHERS_KEY = "watchers";

async function getWatchers() {
    return await storageService.query(WATCHERS_KEY);
}

async function initWatchers() {
    let existingWatchers = await getWatchers();
    if (!existingWatchers.length) {
        await createWatcher({ name: "Puki Ba", movies: ["The Matrix", "The Lord of the Rings"] })
        await createWatcher({ name: "Muki Da", movies: ["The WatcherCard", "Shutter Island"] })
        await createWatcher({ name: "Shuki Sa", movies: ["The Matrix", "The Lord of the Rings"] })
        existingWatchers = await getWatchers();
    }
    return existingWatchers;
}

async function deleteWatcher(watcherId) {
    try {
        await storageService.remove(WATCHERS_KEY, watcherId);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function updateWatcher(watcher) {
    try {
        await storageService.put(WATCHERS_KEY, watcher);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function createWatcher(watcher) {
    try {
        watcher = { ...watcher, color: randomColorUtil(), movies: [...new Set(watcher.movies)] };
        return await storageService.post(WATCHERS_KEY, watcher);
    } catch (err) {
        console.log(err);
    }
}