import React, {useRef, useContext, useEffect} from 'react';
import ContactContext from "../../context/contact/ContactContext"


const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContacts, filtered, clearFilter} = contactContext;

    useEffect(()=>{
        if(filtered === null){
            text.current.value = ""
        }
    })
    const text = useRef("");

    const onChange = (e) =>{
        if(text.current.value !== ""){
            filterContacts(text.current.value )
        }else{
            clearFilter()
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Search Contacts..." onChange={onChange}/>
        </form>
    )
}

export default ContactFilter
