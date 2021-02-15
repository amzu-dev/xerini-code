import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();
export const SAVE_USER = "SAVE_USER";
export const GET_USER = "GET_USER";
export const VALIDATE_USER = "VALIDATE_USER";
export const RESET_STATE = "RESET_STATE";
export const LOGOUT = "LOGOUT";
const users = [{
    id: "1",
    user_name: "jon",
    password: "password",
    first_name: "Jon",
    other_name: "Williams",
    address: {
        street: "1 Mill Street",
        town: "Northampton",
        county: "Northamponshire",
        postcode: "NU7 JK8",

    },
    mobile: "08982 92829",
    email: "jwlll@gmail.com",
    company: "Xerini",
    preferences: {
        contact: ["mail","sms"]
    }
}
]

const initialState = {
    id: null,
    loggedIn: false,
    loginError: null,
    first_name: null,
    other_name: null,
    address: {
        street: null,
        town: null,
        county: null,
        postcode: null,
    },
    mobile: null,
    email: null,
    company: null,
    preferences: {
        contact: []
    }
}

const reducer = (state, action) => {
    switch(action.type) {
        case SAVE_USER: {
            const index = users.findIndex(u=> u.id === action.payload.id);
                users[index] = action.payload;
                return {
                    ...state, ...action.payload
                }
        }
        case VALIDATE_USER: {
            const index = users.findIndex(u=>u.user_name === action.payload.user_name)
            console.log(index);
            if(index >=0 && users[index].password === action.payload.password){
                return {
                    ...state, ...users[index], loggedIn: true
                }
            }
            else {
                return {...initialState, loginError: true};
            }
        }
        case RESET_STATE: {
            return {
                ...state, loginError: null
            }
        }case LOGOUT: {
            return initialState;
        }
        case GET_USER: {
            const index = users.findIndex(u=> u.id === action.payload.id);
            if(index >=0){
                return {
                    ...state, ...users[index],loginError: false, loggedIn: true
                }
            }
            else {
                return initialState;
            }
        }
        default: 
            return state;
    }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);
