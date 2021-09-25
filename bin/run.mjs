import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import resolveConfig from 'tailwindcss/resolveConfig.js';
import tailwindConfig from '../tailwind.config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function run() {
  await writeTailwindToPublic();
}

run();

/////////////////////////////////
// helpers

async function writeTailwindToPublic() {
  const publicDir = path.join(__dirname, '../public');
  const targetFile = path.join(publicDir, 'tailwind-config.json');

  const fullConfig = resolveConfig(tailwindConfig);

  const output = JSON.stringify(fullConfig, null, 2);

  await fs.writeFile(targetFile, output);
}
