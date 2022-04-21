import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactService } from '../../../assistance/AssistContact';
import Spinner from '../../Spinner/Spinner';
import './contactlist.css'

export default function ContactList() {

  


  let [state, setState] = useState({
    loading: false,
    contacts: [],
    errorMessage: ''
  });

  {/*Fetching All Contacts */}
  useEffect(() => {
    (async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data
        })
      }
      catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message
        })
      }
    })();
  }, []);

  //SettingUp delete function
  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data
        })
      }
      
    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      })
    }
  }


  let { loading, contacts, errorMessage } = state;

  return (

    <div className='contactlist-page'>
      {/* Setting Up Contact List title & Add New Contact button */}
      <section className='contact-search p-3'>
        <div className='container'>
          <div className='grid'>
            <div className='row'>
              <div className='col'>
                <p className='h1'>Contact List
                  <Link to={'/contacts/add'} className="btn btn-primary ms-3">
                    <i class="fa-solid fa-user-plus me-2 "></i>
                    New</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spinner Condition & view All contacts */}
      {
        loading ? <Spinner /> : <>

          {/*View All Contacts*/}
          <section className='contact-list'>
            <div className='container'>
              <div className='row'>

                {/* Mapping All contacts */}
                {
                  contacts.length > 0 &&
                  contacts.map(contact => {

                    return (

                      <div className='col-md-6'>

                        <div className='card my-2'>
                          <div className='card-body'>
                            <div className='row align-items-center d-flex justify-content-around'>
                              <div className='col-md-4 mb-2'>
                                <img src={contact.photo ? contact.photo : "https://cdn.icon-icons.com/icons2/2120/PNG/512/user_account_person_avatar_icon_131248.png"} className='contact-img' />
                              </div>
                              <div className='col-md-7'>
                                <ul className='list-group'>
                                  <li className='list-group-item list-group-iem-action'>
                                    Name : <span className='fw-bold'>{contact.name}</span>
                                  </li>
                                  <li className='list-group-item list-group-iem-action'>
                                    Mobile : <span className='fw-bold'>{contact.mobile}</span>
                                  </li>
                                  <li className='list-group-item list-group-iem-action mb-1'>
                                    Email : <span className='fw-bold'>{contact.email}</span>
                                  </li>
                                </ul>

                                {/*Linking Button for View , Update & Delete */}
                                <div className='col-md-1 d-flex flex-row align-items-center '>
                                  <Link to={`/contacts/view/${contact.id}`} className='btn btn-info  my-1 mx-2'>
                                    <i class="fa-regular fa-eye"></i>
                                  </Link>
                                  <Link to={`/contacts/edit/${contact.id}`} className='btn btn-warning my-1 mx-2'>
                                    <i class="fa-solid fa-pen "></i>
                                  </Link>
                                  <Link to={`/contacts/delete/${contact.id}`} className='btn btn-danger my-1 mx-2' onClick={() => clickDelete(contact.id)}>

                                    <i class="fa-solid fa-trash-can"></i>

                                  </Link>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </section>
        </>

      }


    </div>
  )
}
