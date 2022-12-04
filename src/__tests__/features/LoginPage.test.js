import React from 'react';
import { getByText, render, screen, prettyDOM, fireEvent, debug, waitFor, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom';
import { AuthProvider } from '../../hooks/useAuth';
import { LoginPage } from '../../features/login/LoginPage'
import { HomeLayout } from '../../components/HomeLayout';
describe('Root Component', () => {
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
    it('should open reddit auth window when login is clicked', () => {
        Object.defineProperty(window, 'location', {
            value: {
              href: 'http://localhost:3000/login',
            }
          });
        render(      
        <MemoryRouter>
            <AuthProvider>
                <LoginPage/>
            </AuthProvider>
        </MemoryRouter>
    )
    fireEvent.click(screen.getByText(/login/i))
    //JSON.parse() imitates the useLocalStorage hook's behavior when retrieving an item
    expect(window.location.href).toBe(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_ID}&response_type=code&state=${JSON.parse(localStorage.getItem('RANDOM_STRING'))}&redirect_uri=${process.env.REACT_APP_URI}&duration=permanent&scope=${process.env.REACT_APP_SCOPE_STRING}`);
    })
    it('should fetch token if url state matches with RANDOM_STRING and url has a code', () => {
        Object.defineProperty(window, 'location', {
            value: {
              href: 'http://localhost:3000/login?state=IH18NhEADrRHrZmrmNZHddlNTx51gXQj&code=wFtt02vy7XDMwsfl5mrzl49AJhviiw#_',
            }
          });
        localStorage.setItem('RANDOM_STRING', 'IH18NhEADrRHrZmrmNZHddlNTx51gXQj')
        render(      
        <MemoryRouter>
            <AuthProvider>
                <LoginPage/>
            </AuthProvider>
        </MemoryRouter>
    )
    expect(localStorage.getItem	('ACCESS_TOKEN')).toBe({
        "access_token": 'Your access token',
        "token_type": "bearer",
        "expires_in": 'Unix Epoch Seconds',
        "scope": 'A scope string',
        "refresh_token": 'Your refresh token'
        })
    })
})