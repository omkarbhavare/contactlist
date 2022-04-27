import React, { useEffect, useState } from 'react'
import { Link ,useParams} from 'react-router-dom'
import Spinner from '../../Spinner/Spinner';
import './viewcontact.css'
import { ContactService } from '../../../assistance/AssistContact';

export default function ViewContact() {
  

  let {contactId} = useParams();

  let [state,setState]=useState({
    loading:false,
    contact:{},
    errorMessage:''
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

  let{loading,contact,errorMessage}=state;

  return (
    <>
{/* Fetching user specific info to display  */}
    <section className='view-contact p-3'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <p className='h2 text-dark fw-bold'>View Contact</p>
          </div>
        </div>
      </div>
    </section>
    {
      loading ? <Spinner /> :<>
      {
        Object.keys(contact).length >0 &&
      <section className='view-contact mt-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
          <img src={contact.photo ? contact.photo :"https://cdn.icon-icons.com/icons2/2120/PNG/512/user_account_person_avatar_icon_131248.png"} className='contact-img-view' />
          </div>
          <div className='col-md-8'>
            <ul>
              <li className='list-group-item list-group-item-action'>
                Name: <span className='fw-bold'>{contact.name}</span>
              </li>
              <li className='list-group-item list-group-item-action'>
                Mobile: <span className='fw-bold'>{contact.phone}</span>
              </li>
              <li className='list-group-item list-group-item-action'>
                Email: <span className='fw-bold'>{contact.email}</span>
              </li>
              <li className='list-group-item list-group-item-action'>
                Company: <span className='fw-bold'>{contact.company.name }</span>
              </li>
              <li className='list-group-item list-group-item-action'>
                Address:  <span className='fw-bold'>{contact.address.suite + " " + contact.address.city}</span>
              </li>
              <li className='list-group-item list-group-item-action'>
                Website: <span className='fw-bold'>{contact.website}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Link to={'/contacts/list'} className='btn btn-secondary my-5'>Back</Link>

          </div>
        </div>
      </div>
    </section>
}
    </>
    }
    
    </>
  )
}
