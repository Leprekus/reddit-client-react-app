import React from 'react';
import { getByText, render, screen, prettyDOM, fireEvent, debug, waitFor, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom';
import { AuthProvider } from '../../hooks/useAuth';
import { LoginPage } from '../../routes/LoginPage'
import { HomeLayout } from '../../components/HomeLayout';
import { ProtectedLayout } from '../../components/ProtectedLayout';
describe('LoginPage Component', () => {
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

    it('should render loginPage component if there is no token', async () => {
        render(      
                <MemoryRouter initialEntries={['/homepage']}>
                    <Routes>
                        <Route path ='/homepage' element={<AuthProvider><ProtectedLayout/></AuthProvider>}/>
                        <Route path ='/login' element={<AuthProvider><HomeLayout/></AuthProvider>}/>
                        {/* <Route path ='/homepage' element={<HomePage/>}/> */}
                    </Routes>
                </MemoryRouter>
            
        )
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    })

    it('should open reddit auth window when login is clicked', async () => {
        localStorage.setItem('RANDOM_STRING', JSON.stringify('sqNCwBmryP47dGEsKB7KGLvFFDtRwfal'))
        render(      
            <MemoryRouter>
            <AuthProvider>
                <HomeLayout/>
            </AuthProvider>
        </MemoryRouter>
        )
        fireEvent.click(screen.getByText(/login/i))
        // JSON.parse() imitates the useLocalStorage hook's behavior when retrieving an item
        await waitFor(() => {
            expect(window.location.href).toBe('https://www.reddit.com/api/v1/authorize?client_id=qjuHHDbFqllu2b76JMYmGQ&response_type=code&state=sqNCwBmryP47dGEsKB7KGLvFFDtRwfal&redirect_uri=http://localhost:3000/login&duration=permanent&scope=identity, edit, flair, history, modconfig, modflair, modlog, modposts, modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiedit, wikiread');
        })
    })

})