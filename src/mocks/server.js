import { setupServer } from 'msw/node';
import { handlers } from './handlers';

//configures request mocking server with given request handlers
export const server = setupServer(...handlers);
