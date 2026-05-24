#!/usr/bin/env node

import { createProject } from './scaffold.js';

const projectName = process.argv[2];

if (!projectName) {
    console.log('Usage: create-faitjesed-generator-app <project-name>');
    process.exit(1);
}

await createProject(projectName);