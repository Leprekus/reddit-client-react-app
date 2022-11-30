import { rest } from 'msw';

export const handlers = [

    rest.post('login', null),
    
    rest.get('/user', null),
];
// Search subreddits by title and description.
// https://www.reddit.com/dev/api/#GET_subreddits_search