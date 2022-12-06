import { AuthProvider, useAuth } from '../../hooks/useAuth';
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import { HomeLayout } from '../../components/HomeLayout';
import { prettyDOM, render, screen } from '@testing-library/react';
import { debug } from '@testing-library/jest-dom'
import { ProtectedLayout } from '../../components/ProtectedLayout';
import { HomePage } from '../../routes/HomePage';
import { Root } from '../../routes/Root';
describe('HomePage Component', () => {

    it('should render homePage', async () => {
        // localStorage.setItem('token', JSON.stringify({
        //     "access_token": "62260682-8MIBXe7vqBtK6sjRCKsbeHS5sRIyaA",
        //     "token_type": "bearer",
        //     "expires_in": 86400,
        //     "refresh_token": "62260682-SFEomouZO7HMfko7QHA8mf72fMYBNQ",
        //     "scope": "wikiedit save wikiread modwiki edit vote mysubreddits subscribe privatemessages modconfig read modlog modposts modflair report flair submit identity history"
        // }))
        render(      
                <MemoryRouter initialEntries={['/homepage']}>
                    <Routes>
                        <Route path ='/' element={<Root/>}/>
                        <Route path ='/homepage' element={<HomePage/>}/>
                    </Routes>
                </MemoryRouter>
                , 
        )
        expect(screen.getByText(/home page rendered/i)).toBeInTheDocument();
    })
    it('should render home page if there is a token', async () => {
        localStorage.setItem('token', JSON.stringify({
            "access_token": "62260682-8MIBXe7vqBtK6sjRCKsbeHS5sRIyaA",
            "token_type": "bearer",
            "expires_in": 86400,
            "refresh_token": "62260682-SFEomouZO7HMfko7QHA8mf72fMYBNQ",
            "scope": "wikiedit save wikiread modwiki edit vote mysubreddits subscribe privatemessages modconfig read modlog modposts modflair report flair submit identity history"
        }))
        render(      
                <MemoryRouter initialEntries={['/homepage']}>
                    <Routes>
                        <Route path ='/homepage' element={<AuthProvider><ProtectedLayout/></AuthProvider>}/>
                        <Route path ='/login' element={<AuthProvider><HomeLayout/></AuthProvider>}/>
                        {/* <Route path ='/homepage' element={<HomePage/>}/> */}
                    </Routes>
                </MemoryRouter>
            
        )
        //not rendering HomePage component because it is a shallow render
        expect(screen.getByText(/home page/i)).toBeInTheDocument();
    })
})