/*
Code to test rendering of setup form

Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import Setup from './setup'

// Reset DOM
afterEach(() => {
    cleanup();
});

// Test for renderer
describe('Setup Form Rendering', () => {
    // Component render --> mock screen 
    render(<Setup />);
    // save into variable
    const setupForm = screen.getByTestId("setupForm");

    // Test that table is in document
    test('Setup Form Render', () => {
        expect(setupForm).toBeInTheDocument();
    });

    // Test existence of texts within form
    test('Setup form Data', () => {
        expect(setupForm).toHaveTextContent('Inicializar admin');
        expect(setupForm).toHaveTextContent('Registrar')
    })
})