
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    DELETE_CONTACT_WHEN_FILTERED,
    UPDATE_CONTACT,
    UPDATE_FILTERED_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CATCH_ERROR
 } from "../types";

 const contactReducer = (state, action)=>{
    switch(action.type){
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case CLEAR_CONTACTS:
            return{
                ...state,
                contacts: null,
                current: null,
                filtered: null,
                error: null
            }
        case ADD_CONTACT: return {
            ...state,
            contacts: [...state.contacts, action.payload]
        };
        case UPDATE_CONTACT: return {
            ...state,
            contacts: [...state.contacts.map(contact =>  action.payload._id === contact._id ?  action.payload:  contact )]
        }
        case UPDATE_FILTERED_CONTACT:
            return {
                ...state,
                filtered: [...state.filtered.map(contact=> contact._id === action.payload._id ? action.payload : contact)],
                contacts: [...state.contacts.map(contact => action.payload._id === contact._id ?  action.payload: contact )]
            }
        case DELETE_CONTACT: return {
            ...state,
            contacts: [...state.contacts.filter(contact => contact._id !== action.payload)]
        };

        case DELETE_CONTACT_WHEN_FILTERED: return {
            ...state,
            contacts: [...state.contacts.filter(contact => contact._id !== action.payload)],
            filtered: [...state.filtered.filter(contact => contact._id !== action.payload)]
        };

        case SET_CURRENT: return {
            ...state,
            current: action.payload
        };

        case CLEAR_CURRENT: return {
            ...state,
            current: null
        };

        case FILTER_CONTACTS: return {
            ...state,
            filtered: state.contacts.filter(contact => {
                const regex = new RegExp(`${action.payload}`, "gi");
                return contact.name.match(regex) || contact.email.match(regex);
            })
        };
        case CLEAR_FILTER: return {
            ...state,
            filtered: null
        };

        case CATCH_ERROR: 
            return {
                ...state,
                error: action.payload
            }

        default: return state
    }
 }
 
 export default contactReducer;




