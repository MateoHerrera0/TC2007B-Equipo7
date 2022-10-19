/*
Code to test rendering of user related components

Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import Login from './Login'
import Register from './register'

// Reset DOM
afterEach(() => {
    cleanup();
});

// Test for renderer
describe('Login Form Rendering', () => {
    // Component render --> mock screen 
    render(<Login />);
    // save into variable
    const loginForm = screen.getByTestId("loginForm");

    // Test that table is in document
    test('Login Form Render', () => {
        expect(loginForm).toBeInTheDocument();
    });

    // Test existence of texts within form
    test('Login form Data', () => {
        expect(loginForm).toHaveTextContent('Correo electrónico');
        expect(loginForm).toHaveTextContent('Contraseña');
    })
})
