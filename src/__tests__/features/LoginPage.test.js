import React from 'react';
import { getByText, render, screen, prettyDOM, fireEvent, debug, waitFor, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom';
import { AuthProvider } from '../../hooks/useAuth';
import { LoginPage } from '../../features/login/LoginPage'
import { HomeLayout } from '../../components/HomeLayout';
describe('Root Component', () => {
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
    it('should change location href', () => {
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
    expect(window.location.href).toBe('som');
    })
})