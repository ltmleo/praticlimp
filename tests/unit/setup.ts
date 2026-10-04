import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);
Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn((query: string) => ({
  matches: query.includes('prefers-reduced-motion'), media: query,
  onchange: null, addListener() {}, removeListener() {},
  addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false,
})) });
class Observer {
  observe() {} unobserve() {} disconnect() {}
}
vi.stubGlobal('IntersectionObserver', Observer);
