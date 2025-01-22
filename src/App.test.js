import { render, screen, fireEvent  } from '@testing-library/react';
import App from './App';

test('Cambiar tema a claro', () => {

  // Mock matchMedia para simular "dark mode"
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === "(prefers-color-scheme: dark)",
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
  
  const { contenedor } = render(<App />);
  const botonTemas = contenedor.querySelector('.theme-switcher');
  fireEvent.click(botonTemas);
  const linkElement = screen.getByText(/Dark Mode/i);
  expect(linkElement).toBeInTheDocument();
});

/*
test('Estan los link bien', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('Los datos estan Bien', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
