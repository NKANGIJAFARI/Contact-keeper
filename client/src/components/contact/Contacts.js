import React, { useContext, Fragment, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import Spinner from "../layout/Spinner";
import ContactItem from "./ContactItem";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

const Contacts = (props)=>{
    const contactContext = useContext(ContactContext);
    

    const  {contacts, filtered, getContacts, loading} = contactContext;


    useEffect(() => {
        getContacts()

        //eslint-disable-next-line
    }, [])

    
    // Check if there is contacts added
    if(contacts !== null && contacts.length === 0 && !loading){
        return <h4>Please Add contacts </h4>
    }

    return(
        <Fragment>
            {contacts !==null && !loading ? (
                <Fragment> 
                    <TransitionGroup>
                        {filtered !== null ? 
                        (filtered.map(contact => 
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem  contact={contact}/>
                            </CSSTransition>)
                        ) :
                        ((contacts !== null && !loading) &&
                            (contacts.map(contact => 
                                <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                    <ContactItem  contact={contact}/>
                                </CSSTransition>
                                ))
                        )
                        }
                    </TransitionGroup>
                </Fragment>
            ) : <Spinner />}

        </Fragment>
    )
    
}

export default Contacts;
