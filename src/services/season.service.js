export const seasonService = {
    getSeasonName,
    getSeasonColors,
    getMonth
}

const SEASONS = ['Winter', 'Spring', 'Summer', 'Autumn']; // Northern Hemisphere

function getMonth(date) {
    return date.toLocaleString("en-US", { month: "long" })
}
function getSeasonName(date) {
    const month = Math.floor((date.getMonth() / 12 * 4)) % 4;
    return SEASONS[month];
}

function getSeasonColors(season) {
    switch (season) {
        case 'Spring':
            return { dark: '#007c3d', light: '#b4f1cb' };
        case 'Summer':
            return { dark: '#d27601', light: '#f8dec6' };
        case 'Autumn':
            return { dark: '#143165', light: '#b4c5f1' };
        case 'Winter':
            return { dark: '#004183', light: '#bdf3ff' };
        default:
            return { dark: '#7c7c7c', light: '#c3c3c3' };
    }
}
