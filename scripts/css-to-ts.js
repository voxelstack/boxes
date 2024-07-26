import watch from "node-watch";
import { resolve } from "path";
import { promises as fs } from "fs";
import { exit } from "process";

async function cssToTs(src) {
    const dst = src.replace('.lit.css', '.styles.ts');
    const css = await fs.readFile(src, { encoding: 'utf8' });
    const embed = css.replace(/\n\n\/\*#\ sourceMappingURL=[^\*]+ \*\//, "");

    console.log(`${src}->${dst}`);
    await fs.writeFile(
        dst,
        `import { css } from 'lit';\nexport const styles = css\`\n${embed}\`;`,
    );
}

async function preprocessAll(path) {
    const dir = await fs.readdir(path, { withFileTypes: true });
    await Promise.all(dir.map((ent) => {
        const src = resolve(path, ent.name);
        if (ent.isDirectory()) {
            return preprocessAll(src);
        } else if (/\.lit\.css/.test(src)) {
            return cssToTs(src);
        }
    }));
}

await preprocessAll(process.argv[2]);

if (process.argv[3] !== "--watch") {
    exit(0);
}

console.log("Watching for changes on .lit.css files...")
watch(
    "./",
    { filter: /\.lit\.css/, recursive: true },
    async (evt, src) => {
        switch (evt) {
            case "update": {
                await cssToTs(src);
                break;
            };
        }
    }
);
