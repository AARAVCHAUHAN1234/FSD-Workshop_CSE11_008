import fs from "node:fs/promises";

const filePath = "userData.json";

async function createFile(content) {
    try {
        await fs.writeFile(filePath, content, "utf-8");
        console.log("File Created Successfully");
    }
    catch (err) {
        console.log("Error found", err);
    }
}

async function readFile() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        console.log(data);
        console.log("File Read Successfully");
    }
    catch (err) {
        console.log("Error found", err);
    }
}

async function appendFile(content) {
    try {
        await fs.appendFile(filePath, content, "utf-8");
        console.log("File Appended");
    }
    catch (err) {
        console.log("Error found", err);
    }
}

async function deleteFile() {
    try {
        await fs.unlink(filePath);
        console.log("File Deleted");
    }
    catch (err) {
        console.log("Error found", err);
    }
}

async function sequence() {
    await createFile("First Line of Code\n");
    await appendFile("Second line to append");
    await readFile();
    await deleteFile();
}

sequence();