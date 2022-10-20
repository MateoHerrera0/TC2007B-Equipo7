/*
Code to test rendering of register form taking context into account

Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import { UserContext } from "../app";
import Register from "./register";
import {BrowserRouter} from 'react-router-dom'

// Reset DOM
afterEach(() => {
    cleanup();
});

// Test for renderer 
describe('Register form', () => {
    test('Render register form using context', () => {
        render(
            <UserContext.Provider value={{usuario: 'admin@gmail.com'}}>
                <BrowserRouter>
                <Register />
                </BrowserRouter>
            </ UserContext.Provider>
        )
    })
})