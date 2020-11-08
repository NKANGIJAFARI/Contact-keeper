import React, { useReducer } from "react";
import ContactContext from "./ContactContext";
import contactReducer from "./ContactReducer";
import axios from "axios"


import {
   GET_CONTACTS,
   ADD_CONTACT,
   DELETE_CONTACT,
   DELETE_CONTACT_WHEN_FILTERED,
   UPDATE_CONTACT,
   UPDATE_FILTERED_CONTACT,
   CLEAR_CONTACTS,
   SET_CURRENT,
   CLEAR_CURRENT,
   FILTER_CONTACTS,
   CLEAR_FILTER,
   CATCH_ERROR
} from "../types";



const ContactState = props =>{
    const initialState = {
        contacts: null,
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);


      //GET CONTACTS
      const getContacts = async() =>{
   
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ 
                type: GET_CONTACTS, 
                payload: res.data 
            })

        } catch (err) {
            console.error(err.message)
            dispatch({
                type: CATCH_ERROR,
                payload: err.response.msg
            })
        }
    }


    //ADD CONTACT
    const addContact = async(contact) =>{
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({ 
                type: ADD_CONTACT, 
                payload: res.data 
            })

        } catch (err) {
            dispatch({
                type: CATCH_ERROR,
                payload: err.response.msg
            })
        }
    }

    //DELETE CONTACT
    const deleteContact = async(id) =>{
        
        try {
              await axios.delete(`api/contacts/${id}`);

              if(state.filtered !== null){
                dispatch({
                  type: DELETE_CONTACT_WHEN_FILTERED,
                  payload: id
                  })
              }else{
                  dispatch({ 
                      type: DELETE_CONTACT, 
                      payload: id
                  });
              }
        } catch (err) {
            dispatch({
                type: CATCH_ERROR,
                payload: err.response.msg
            })
        }
    }
    
    //UPDATE CONTACT
    const updateContact = async(contact) =>{
        console.log(contact)
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        try {
            const res = await axios.put(`api/contacts/${contact._id}`, contact, config);

            if(state.filtered !== null){
              dispatch({
                type: UPDATE_FILTERED_CONTACT,
                payload: res.data
                })
            }else{
                dispatch({ 
                    type: UPDATE_CONTACT, 
                    payload: res.data
                });
            }
        } catch (err) {   
            dispatch({
                type: CATCH_ERROR,
                payload: err.response.msg
            }) 
        }
    }


    //SET CURRENT
    const setCurrent = (contact) =>{
        dispatch ({ type: SET_CURRENT, payload: contact })
    }

    //REMOVE CURRENT
    const clearCurrent = () =>{
        dispatch ({ type: CLEAR_CURRENT })
    }

    //FILTER CONTACTS
    const filterContacts = text =>{
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    //CLEAR CONTACTS
    const clearContacts = () =>{
        dispatch({
            type: CLEAR_CONTACTS,
        })
    }

    //REMOVE FILTER
    const clearFilter = () =>{
        dispatch ({ type: CLEAR_FILTER })
    }

    return <ContactContext.Provider value={
        {
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }
    }>
        {props.children}
    </ContactContext.Provider>
}

export default ContactState;