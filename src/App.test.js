import { render, screen, fireEvent  } from '@testing-library/react';
import App from './App';
import data from "./data.json";

// Mock matchMedia para simular "dark mode"
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === "(prefers-color-scheme: dark)",
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

/*
test('Cambiar tema a claro', () => {
  const { contenedor } = render(<App />);
  const botonTemas = contenedor.querySelector('.theme-switcher');
  fireEvent.click(botonTemas);
  const linkElement = screen.getByText(/Dark Mode/i);
  expect(linkElement).toBeInTheDocument();
});
*/

test('aplicar tema por defecto', () => {
  // Mock `window.matchMedia`
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });

  render(<App />);

  const htmlElement = document.documentElement;
  const appliedTheme = htmlElement.getAttribute('data-theme');

  expect(['light', 'dark']).toContain(appliedTheme);
});

describe('Todos los datos estan en regla', () => {

  it('renderiza toda la informacion', () => {
    render(<App />);

    // Verificar que los componentes clave están presentes
    expect(screen.getByText(data.info.name)).toBeInTheDocument(); // Header
    expect(screen.getByText(data.experience[0].company)).toBeInTheDocument(); // ExperienceSection
    expect(screen.getByText(data.skills[0].name)).toBeInTheDocument(); // SkillsSection
    expect(screen.getByText(data.education[0].degree)).toBeInTheDocument(); // EducationSection
  });
});