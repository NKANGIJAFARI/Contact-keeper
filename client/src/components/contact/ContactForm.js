import React, {useState, useContext, useEffect} from 'react';
import ContactContext from "../../context/contact/ContactContext";


const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact, current, clearCurrent, updateContact } = contactContext;

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        type : "personal"
    })


    useEffect(() => {
        if(current !== null){
            setContact( current );
        }else{ 
            setContact({
                name: "",
                email: "",
                phone: "",
                type : "personal"
            })
        }
    }, [contactContext, current]);


    const { name, email, phone, type } = contact;
    
    const onChange = (e) => setContact({
        ...contact, 
        [e.target.name]: e.target.value
    });

    const clearAll = () =>{
        clearCurrent()
    }


    const onSubmit = (e) =>{
        e.preventDefault();

        if(current === null){
            if(contact.name !== "" || contact.email !== ""){
                addContact(contact); 
            }
        }else{
            updateContact(contact);
        }

        clearCurrent()
        console.log("Process finished");
    } 

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
               {current ? "Edit Contact": "Add Contact"}</h2>
            <input type="text" name="name" placeholder="Name" value={name} onChange={onChange} required/>
            <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required/>
            <input type="text" name="phone" placeholder="Phone" value={phone} onChange={onChange} required/>
            <h5>Contact type</h5>
            <input type='radio' name='type' value='personal' 
                checked={type === 'personal'} onChange={onChange}/>
                Personal {'  '}
            <input type='radio' name='type' value='professional' 
                checked={type === 'professional'} onChange={onChange}/> 
                Profesional
            
            <div>
                <input type="submit" value={current ? "Update Contact" : "Add Contact"} className="btn btn-primary btn-block"/>
            </div>
            
                {current && <div>
                    <button className="btn btn-light btn-block" onClick={clearAll}>Cancel edits</button>
                </div>
                }
        </form>
    )
}

export default ContactForm;