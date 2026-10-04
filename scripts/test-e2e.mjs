import { spawnSync } from 'node:child_process';

// Build and test each deployment path independently; no stale preview server.
for (const base of ['/', '/praticlimp/']) {
  const result = spawnSync(process.execPath, ['node_modules/@playwright/test/cli.js', 'test', ...process.argv.slice(2)], {
    stdio: 'inherit', env: { ...process.env, VITE_BASE_PATH: base },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
