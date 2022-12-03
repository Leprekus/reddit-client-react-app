import React from 'react';
import { getByText, render, screen, prettyDOM, fireEvent, debug, waitFor, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom';
import { AuthProvider } from '../../hooks/useAuth'
describe('Root Component', () => {
    it('should render LoginPage component if user is not authenticated', () => {
        render(      
        <AuthProvider>
            <LoginPage/>
        </AuthProvider>
    )
    })
})