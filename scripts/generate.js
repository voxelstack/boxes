import { promises as fs } from "fs";

function toSnake(str) {
    let snake = str[0].toLowerCase();
    for (const char of str.slice(1)) {
        if (char === char.toUpperCase()) {
            snake += `_${char.toLowerCase()}`;
        } else {
            snake += char;
        }
    }

    return snake;
}

function replaceNames(source, name, snakeName) {
    source = source.replace(/\{\{Name\}\}/g, name);
    source = source.replace(/\{\{name\}\}/g, snakeName);
    return source;
}

async function exists(path) {
    try {
        await fs.access(path, fs.constants.F_OK);
        return true;
    } catch (_) {
        return false;
    }
}

async function component(name) {
    const paths = [
        "{{name}}.ts",
        "{{name}}.lit.scss",
        "{{name}}.test.ts",
        "{{name}}.stories.ts",
        "{{name}}.mdx",
    ];
    const snakeName = toSnake(name);
    const dstDir = `./src/components/${snakeName}`;

    if (await exists(dstDir)) {
        console.error(`${dstDir} already exists`);
        process.exit(-1);
    }

    await fs.mkdir(dstDir, { recursive: true });

    await Promise.all(
        paths.map(async (path) => {
            const filename = replaceNames(path, name, snakeName);
            const source = await fs.readFile(
                `./templates/component/${path}`,
                "utf-8",
            );

            await fs.writeFile(
                `${dstDir}/${filename}`,
                replaceNames(source, name, snakeName),
            );
        }),
    );

    console.log(`Generated component ${name} at ${dstDir}`);
}

const help = "Usage: generate <generator> <name>";

const generator = process.argv[2];
const name = process.argv[3];

if (!generator || !name) {
    console.error(help);
    process.exit(-1);
}

switch (generator) {
    case "component":
        await component(name);
        break;
    default:
        console.error(`Valid generators are: "component"`);
}
