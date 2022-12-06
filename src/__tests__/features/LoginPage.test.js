import React from 'react';
import { getByText, render, screen, prettyDOM, fireEvent, debug, waitFor, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom';
import { AuthProvider } from '../../hooks/useAuth';
import { LoginPage } from '../../features/login/LoginPage'
import { HomeLayout } from '../../components/HomeLayout';
import { ProtectedLayout } from '../../components/ProtectedLayout';
describe('Root Component', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            value: {
              href: 'http://localhost:3000/login',
            }
          });
          jest.spyOn(window.localStorage.__proto__, 'setItem');
          jest.spyOn(window.localStorage.__proto__, 'getItem');
        
    })

    afterEach(() => {
        localStorage.clear()

    })

    it('should render LoginPage component if user is not authenticated', () => {
        render(      
        <MemoryRouter>
            <AuthProvider>
                <HomeLayout/>
            </AuthProvider>
        </MemoryRouter>
    )
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    })

    
    
    it('should redirect to Home Page after authentication', async () => {
        localStorage.setItem('token', JSON.stringify({
            "access_token": "62260682-8MIBXe7vqBtK6sjRCKsbeHS5sRIyaA",
            "token_type": "bearer",
            "expires_in": 86400,
            "refresh_token": "62260682-SFEomouZO7HMfko7QHA8mf72fMYBNQ",
            "scope": "wikiedit save wikiread modwiki edit vote mysubreddits subscribe privatemessages modconfig read modlog modposts modflair report flair submit identity history"
        }))
        window.location.href = 'http://localhost:3000/homePage'
        render(      
            <MemoryRouter>
                <AuthProvider>
                    <ProtectedLayout/>
                </AuthProvider>
            </MemoryRouter>
        )
        console.log(window.location.href)
   
        expect(screen.getByText(/home page/i)).toBeInTheDocument();
        console.log(prettyDOM)
})

    // it('should open reddit auth window when login is clicked', async () => {
    //     render(      
    //     <MemoryRouter>
    //         <AuthProvider>
    //             <LoginPage/>
    //         </AuthProvider>
    //     </MemoryRouter>
    //     )
    //     fireEvent.click(screen.getByText(/login/i))
    //     JSON.parse() imitates the useLocalStorage hook's behavior when retrieving an item
    //     await waitFor(() => {
    //         expect(window.location.href).toBe(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_ID}&response_type=code&state=${JSON.parse(localStorage.getItem('RANDOM_STRING'))}&redirect_uri=${process.env.REACT_APP_URI}&duration=permanent&scope=${process.env.REACT_APP_SCOPE_STRING}`);
    //     console.log(window.location.href)
    //     })
    // })

})