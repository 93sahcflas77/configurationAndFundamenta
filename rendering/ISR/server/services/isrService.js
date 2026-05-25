import fs from "fs/promises";
import axios from "axios";

const CACHE_FILE = "./cache/posts.json";
const REVALIDATE_TIME = 60 * 1000; // 1 minute

let lastGenerated = 0;

export async function getCachedPosts() {
    try {
        const data = await fs.readFile(CACHE_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return null
    }
}

export async function generatePosts() {
    console.log("Generating cache...");

    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = response.data;

    await fs.writeFile(CACHE_FILE, JSON.stringify(posts), null, 2);

    lastGenerated = Date.now();
    return posts;
}

export async function getPostsISR() {
    const now = Date.now();
    const cache = getCachedPosts();

    if (!cache) {
        return await generatePosts();
    }

    const expired = now - lastGenerated > REVALIDATE_TIME;

    if (expired) {
        generatePosts(); // Regenerate in the background
        console.log(
      "Background regeneration started"
    );
    }

    return cache;
}