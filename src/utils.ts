import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import kleur from 'kleur';
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function validateProjectName(name: string) {
    if (!name) throw new Error('Project name required');

    if (!/^[a-z0-9-_@/]+$/.test(name)) {
        throw new Error('Use lowercase letters, numbers, dashes only');
    }
}

export function getTemplatePath(template: string) {
    return path.join(__dirname, '../templates', template);
}

export async function copyTemplate(src: string, dest: string) {
    await fs.copy(src, dest, { overwrite: false, errorOnExist: true });
}

export async function patchPackageJson(projectDir: string, name: string) {
    const pkgPath = path.join(projectDir, 'package.json');

    if (!(await fs.pathExists(pkgPath))) return;

    const pkg = await fs.readJSON(pkgPath);

    pkg.name = name;
    pkg.version = '1.0.0';

    await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
}

export function runCommand(command: string, cwd: string) {
    try {
        execSync(command, {
            cwd,
            stdio: 'inherit'
        });
    } catch (e) {
        throw new Error(`Command failed: ${command}`);
    }
}
export const logger = {
    info: (msg: string) => console.log(kleur.cyan(msg)),
    success: (msg: string) => console.log(kleur.green(msg)),
    error: (msg: string) => console.log(kleur.red(msg))
};