import { createContext, useReducer } from "react"

export const ThemeContext = createContext() //store a new context oject in the constant

//state is current uptodate state and action is the object passed in the dispatch
const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload }
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload }
        default:
            return state
    }
}

export function ThemeProvider({ children }) { //children is any component that ThemeProvider wraps around, in our case it's App component

    //state is the initial value declared in the useReducer
    const [state, dispatch] = useReducer(themeReducer, { color: 'tomato', mode: 'dark' }) //second argument is the initial state, in this case it's the color property blue

    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color })
    }

    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode })
    }

    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}