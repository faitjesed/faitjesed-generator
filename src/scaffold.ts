import path from 'path';
import prompts from 'prompts';
import { validateProjectName, getTemplatePath, logger, patchPackageJson, copyTemplate, runCommand } from './utils.js';

export async function createProject(projectName: string) {
    validateProjectName(projectName);

    const targetDir = path.resolve(projectName);

    const response = await prompts({
        type: 'select',
        name: 'template',
        message: 'Choose template',
        choices: [
            { title: 'Fastify API (TypeORM)', value: 'fastify' },
        ]
    });

    const templateDir = getTemplatePath(response.template);

    await copyTemplate(templateDir, targetDir);

    logger.info(`\nCreating project in: ${targetDir}`);

    await patchPackageJson(targetDir, projectName);

    logger.info('Initializing git...');
    runCommand('git init', targetDir);

    logger.success(`\n✔ Project created: ${projectName}`);
    logger.info(`\nNext: cd ${projectName} && npm install`);
}