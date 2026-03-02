#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repositoryRoot = path.join(__dirname, '..', '..');

const envMappings = [
  {
    source: 'Infrastructure/env/frontend/.env.example',
    target: 'frontend/.env'
  },
  {
    source: 'Infrastructure/env/backend/appsettings.Development.template.json',
    target: 'backend/appsettings.Development.json'
  },
];

console.log('Setting up environment files...\n');

envMappings.forEach(({ source, target }) => {
  const sourcePath = path.join(repositoryRoot, source);
  const targetPath = path.join(repositoryRoot, target);

  if (!fs.existsSync(sourcePath)) {
    console.log(`WARN  Source not found: ${source}`);
    return;
  }

  if (fs.existsSync(targetPath)) {
    console.log(`OK    Already exists: ${target}`);
    return;
  }

  try {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`OK    Created: ${target}`);
  } catch (error) {
    console.log(`ERROR Failed to create: ${target}`);
    console.error(error.message);
  }
});

console.log('\nSetup complete.');
console.log('\nNext steps:');
console.log('  1. Update frontend/.env and backend/appsettings.Development.json');
console.log('  2. Run: npm run dev:up');
