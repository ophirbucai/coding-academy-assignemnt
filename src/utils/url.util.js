/**
 *
 * @param url {string} - relative url to ./assets/*
 * @returns {string}
 */
export const getAssetUrl = (url) => new URL(url, import.meta.url.replace('utils', 'assets')).href;

export const getSearchParam = (param) => new URLSearchParams(window.location.search).get(param);

export const setUrlSearchParam = (param, value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
}