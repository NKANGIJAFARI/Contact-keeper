import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from "../../context/contact/ContactContext"

const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext);

    //Destructuring taking place below
    const {name, _id, type, email, phone} = contact;
    const {deleteContact, setCurrent, clearCurrent } = contactContext;

    const onDelete = () =>{
        deleteContact(_id);
        clearCurrent() 
    }

    const editContact = () =>{
        setCurrent(contact)
    }

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">{name} {" "} 
                <span style={{ float : "right"}} className={"badge " + (type === "professional" ? 
                                "badge-success" : "badge-primary")}>
                    {type /* {type.charAt(0).toUpperCase() + type.slice(1)} */}
                </span>
            </h3>
            <ul className="list">
                {email && ( 
                    <li><i className="fa fa-envelope"> {email}</i></li>
                )}
                {phone && (
                    <li><i className="fa fa-phone"> {phone}</i></li>
                )}
            </ul>

            <p>
                <button className="btn btn-dark btn-sm" onClick= {editContact} >Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}
ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem
