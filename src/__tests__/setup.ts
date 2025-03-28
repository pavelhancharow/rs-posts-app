import '@testing-library/jest-dom/vitest';
import userEventDefault from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import { server } from '../__mocks__/server.ts';

export const userEvent = userEventDefault.setup();

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
