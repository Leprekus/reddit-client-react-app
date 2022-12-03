import React from 'react';
import { getByText, render, screen, prettyDOM, fireEvent, debug, waitFor, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom';
import { Root } from '../../routes/Root';
import { HomePage } from '../../routes/HomePage';

test('it makes a get request and displays request\'s origin', () => {
 
})

