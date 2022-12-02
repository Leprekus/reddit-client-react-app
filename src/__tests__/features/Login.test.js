import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

import { LoginLandingPage } from '../../features/login/LoginLandingPage';

test('renders login component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <LoginLandingPage />
    </Provider>
  );

  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
