import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext"

const Navbar = ({tittle, icon}) => {
    const authContext = useContext(AuthContext)
    const contactContext =  useContext(ContactContext);

    const { user, isAuthenticated, logOut} = authContext;
    const { clearContacts } = contactContext;

    const onLogOut = ()=>{
        logOut();
        clearContacts();
    }

    const authLinks = (           
        <Fragment>
            <li>Hello {user && user.name}</li> {" "}{" "}
            <li>
                <a onClick={onLogOut} href="#!">
                    <i className="fa fa-sign-out" ></i>
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    )
    

    return (
        <div className="navbar bg-primary">
          <h2>
              <i className={icon}> {tittle}</i>
          </h2>  

          <ul>
              {isAuthenticated ? authLinks : guestLinks}
          </ul> 
        </div>
    )
}

Navbar.propTypes ={
    tittle: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
    tittle: "Contact keeper",
    icon: "fa fa-address-book"
}

export default Navbar
