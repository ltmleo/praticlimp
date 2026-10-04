import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests', testMatch:'site.spec.ts', fullyParallel:false,
 snapshotPathTemplate:'{testDir}/visual/{platform}/{arg}{ext}',
 use:{baseURL:`http://localhost:4173${process.env.VITE_BASE_PATH || '/'}`,browserName:'chromium'},
 webServer:{command:'npm run build && npm run preview -- --port 4173 --strictPort',url:`http://localhost:4173${process.env.VITE_BASE_PATH || '/'}`,reuseExistingServer:false,timeout:120000},
});
