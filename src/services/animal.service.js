import { sleep } from "../utils/sleep.util.js";

export const animalService = {
    getAnimals
}

async function getAnimals() {
    try {
        await sleep(1000);
        return Math.random() > 0.5 ? {
            status: "success",
            data: [
                {
                    name: "Malayan Tiger",
                    count: 200,
                    // link: "https://pubmed.ncbi.nlm.nih.gov/33917373/" even less than 200 left in the world :(
                },
                {
                    name: "Mountain Gorilla",
                    count: 150,
                },
                {
                    name: "Fin Whale",
                    count: 28,
                }
            ]
        } : {
            status: "error",
            error: "Error getting animals"
        }

    } catch(e) {
        console.log(e)
        return {
            status: "error",
            error: "Error getting animals"
        }
    }
}