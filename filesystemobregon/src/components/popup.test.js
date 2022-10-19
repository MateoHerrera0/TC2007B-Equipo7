/*
Code to test rendering of popup

Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import Popup from './popup'

// Reset DOM
afterEach(() => {
    cleanup();
});

// Test for renderer
describe('Popup render', () => {

    // Component render --> mock screen 
    render(<Popup visible={true} popupTitle = {"Favor de confirmar lo siguiente:"}
    popupBody = {<p>¿Estás seguro de que quieres cambiar la contraseña del usuario?</p>}/>);
    // save into variable
    const popupTest = screen.getByTestId("popup");

    // Test that table is in document
    test('Popup Render', () => {
        expect(popupTest).toBeInTheDocument();
    });
})
