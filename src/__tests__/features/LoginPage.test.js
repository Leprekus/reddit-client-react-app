import React from 'react';
import { getByText, render, screen, prettyDOM, fireEvent, debug, waitFor, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom';
import { AuthProvider } from '../../hooks/useAuth';
import { LoginPage } from '../../features/login/LoginPage'
import { HomeLayout } from '../../components/HomeLayout';
import { useFetchToken } from '../../hooks/useFetchToken';
describe('Root Component', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            value: {
              href: 'http://localhost:3000/login',
            }
          });

        
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
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        jest.spyOn(window.localStorage.__proto__, 'getItem');
        Object.defineProperty(window, 'location', {
            value: {
                href: 'http://localhost:3000/login?state=IH18NhEADrRHrZmrmNZHddlNTx51gXQj&code=wFtt02vy7XDMwsfl5mrzl49AJhviiw#_',
            }
        });
        render(      
            <MemoryRouter>
            <AuthProvider>
                <LoginPage/>
            </AuthProvider>
        </MemoryRouter>
    )
    localStorage.setItem('RANDOM_STRING', JSON.stringify('IH18NhEADrRHrZmrmNZHddlNTx51gXQj'))
    await waitFor(() => {
        
        expect(window.location.href).toBe('http://localhost:3000/homePage');
        
    })
})

    it('should open reddit auth window when login is clicked', async () => {
        render(      
        <MemoryRouter>
            <AuthProvider>
                <LoginPage/>
            </AuthProvider>
        </MemoryRouter>
        )
        fireEvent.click(screen.getByText(/login/i))
        //JSON.parse() imitates the useLocalStorage hook's behavior when retrieving an item
        await waitFor(() => {
            //expect(window.location.href).toBe(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_ID}&response_type=code&state=${JSON.parse(localStorage.getItem('RANDOM_STRING'))}&redirect_uri=${process.env.REACT_APP_URI}&duration=permanent&scope=${process.env.REACT_APP_SCOPE_STRING}`);
        console.log(window.location.href)
        })
    })

})