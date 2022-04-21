import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../../../assistance/AssistContact';
import Spinner from '../../Spinner/Spinner';
import './editcontact.css'

export default function EditContact() {

  let { contactId } = useParams(); {/* Receiving contactId from ContactList when clicked i=on edit button*/ }

  {/* Setting up usestate function to update user information*/ }
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      email: '',
      mobile: '',
      photo: '',
      address: '',
      company: ''
    }
  })

  useEffect(() => {
    (async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);

        setState({
          ...state,
          loading: false,
          contact: response.data
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
  }, [contactId]);

{/* Update the Input in the event */}
  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    })
  }

  {/* Submit Form */}

  let submitForm = async (event) => {
    event.preventDefault()
    try {
      let response = await ContactService.updateContact(state.contact, contactId);

    }
    catch (error) {
      setState({ ...state, errorMessage: error.message });

    }
  }

  let { loading, contact, errorMessage } = state;



  return (
    <>
     {
       loading ? <Spinner/>:
       <>
       <section className='add-contact '>
        {/* SettingUp Add Contact Section*/}
        <div className='container '>
          <div className='row ' >
            <div className='col '>
              <p className='h3 text-primary fw-bold my-2 align-items-center justify-content-center'>Edit Contact</p>
              <p >Select the information you want to Edit.</p>
              <Link to={'/contacts/list'} className="btn btn-warning ms-2 mb-2">Back</Link>
            </div>
          </div>
          
          {/* View Earlier Details of User & Update it by calling Event */}
          <div className='row align-items-center justify-content-center'>
          <div className='col-md-6 mb-2  '>
          <img src={contact.photo ? contact.photo :"https://cdn.icon-icons.com/icons2/2120/PNG/512/user_account_person_avatar_icon_131248.png"} className='edit-contact-img' />
          </div>
            <div className='col-md-4'>
              <form onSubmit={submitForm}>
                <div className='mb-2'>
                  <input 
                  name="name" 
                  value={contact.name}
                  onChange={updateInput}
                  required={true}
                  type='text' className='form-control' placeholder='Name' />
                </div>
                <div className='mb-2'>
                  <input
                  name="mobile" 
                  value={contact.mobile}
                  onChange={updateInput}
                  required={true} 
                  type='number' className='form-control' placeholder='Mobile' />
                </div>
                <div className='mb-2'>
                  <input
                  name="email" 
                  value={contact.email}
                  onChange={updateInput}
                  required={true} 
                  type='email' className='form-control' placeholder='Email' />
                </div>
                <div className='mb-2'>
                  <input
                  name="company" 
                  value={contact.company}
                  onChange={updateInput}
                  required={true} 
                  type='text' className='form-control' placeholder='Company' />
                </div>
                <div className='mb-2'>
                  <input
                  name="address" 
                  value={contact.address}
                  onChange={updateInput}
                  required={true} 
                  type='text' className='form-control' placeholder='Address' />
                </div>
                <div className='mb-2'>
                  <input
                  name="photo" 
                  value={contact.photo}
                  onChange={updateInput}
                  required={true}
                   
                  type='text' className='form-control' placeholder='Photo Url' />
                </div>
                <div className='mb-2'>
                  <input type='submit' className='btn btn-primary' value='Update' />
                  <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
       </>
     }

    </>
  )
}
