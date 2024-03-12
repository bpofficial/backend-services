#!/usr/bin/env node

import { program } from 'commander';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../nest-cli.json');

function checkEnvironment(env: string) {
    const allowedEnvironments = ['staging', 'live'];
    if (!allowedEnvironments.includes(env)) {
        throw new Error(
            `Environment must be one of: ${allowedEnvironments.join(', ')}`,
        );
    }
    return env;
}

program.name('Microservice Builder').version('1.0.0');

program
    .option('-h, --help', 'Show help')
    .option('-v, --verbose', 'Run with debug logging')
    .option('-n, --name <app name>', 'Name of application to build');

program.parse(process.argv);

const options = program.opts();

const apps = Object.entries(config.projects)
    .filter(([k]: any) =>
        options.name
            ? String(k).toLowerCase().trim() ===
              String(options.name).toLowerCase().trim()
            : true,
    )
    .filter(([_, v]: any) => v.type === 'application')
    .map(([k, v]: any) => ({ ...v, name: k }));

console.log('Applications:', apps);
