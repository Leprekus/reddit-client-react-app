import React from 'react';
import { getByText, render, screen, prettyDOM, fireEvent, debug, waitFor, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Root } from '../../routes/Root';
import { HomePage } from '../../routes/HomePage';


describe('root component', () => {
    //     const element = render(<Root />, {wrapper: MemoryRouter})
    //    console.log(prettyDOM(element.container.firstChild))
    
    test('navbar should render five elements', () => {
      render(<Root/>, { wrapper: MemoryRouter });
        expect(screen.getByText('Home Page')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Trending')).toBeInTheDocument();
        expect(screen.getByText('Notifications')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
    test('Homepage Button should render HomePage component', async () => {
      render(
      <Routes>
        <Route path='/' element={<Root/>}/>
        <Route path='homePage' element={<HomePage/>}/>
      </Routes>, { wrapper: MemoryRouter });
      const element = screen.getByText(/home page/i)
      fireEvent.click(element)
      await screen.findByText(/home page rendered/i)
      
    });
    test('Search button send query', async () => {
      
    });
    test('Trending button should fetch reddit\'s trending topics', async () => {
      
    });
    test('Notifications button should fetch user notifications', async () => {
      
    });
    test('Profile button display profile image and menu', async () => {
      
    });

    
})
