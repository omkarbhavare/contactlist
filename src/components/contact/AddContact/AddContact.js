import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ContactService } from '../../../assistance/AssistContact';
import './addcontact.css'

export default function AddContact() {

  
{/* using useState hook for assigning values*/}
  let [state,setState]=useState({
    loading:false,
    contact:{
      name:'',
      photo:'',
      mobile:'',
      email:'',
      company:"",
      address:''
    }
  });

  {/*  Updating the information */}
  let updateInput=(event)=>{
    setState({
      ...state,
      contact:{
        ...state.contact,
        [event.target.name]:event.target.value
      }
    })
  }

  {/* SettingUp Create Contact Function */}
  let submitForm=async (event)=>{
    event.preventDefault();
    try{
      let response = await ContactService.createContact(state.contact);
      
    }
    catch(error){
      setState({...state,errorMessage:error.message});
      
    }
  }

  let {loading ,contact}=state;
  return (
    <>
    <section className='add-contact'>
      {/* SettingUp Add Contact Section*/}
      <div className='container '>
        <div className='row'>
          <div className='col '>
            <p className='h3 text-success fw-bold my-2 '>Create Contact</p>
            <p >Fill Following Details To Add New User in your Contact List.</p>
            <Link to={'/contacts/list'} className="btn btn-warning ms-2 mb-2">Back</Link>
          </div>
        </div>

        {/* Setting Up form to add user information */}
        <div className='row'>
        <div className='col-md-4'>
          <form onSubmit={submitForm}>
            <div className='mb-2'>
              <input 
              name="name"
              value={contact.name}
              onChange={updateInput}
              required={true}
              type='text' className='form-control' placeholder='Name'/>
            </div>
            <div className='mb-2'>
              <input 
              name="mobile"
              value={contact.mobile}
              onChange={updateInput}
              required={true}
              type='number' className='form-control' placeholder='Mobile'/>
            </div>
            <div className='mb-2'>
              <input 
              name="email"
              value={contact.email}
              onChange={updateInput}
              required={true}
              type='email' className='form-control' placeholder='Email'/>
            </div>
            <div className='mb-2'>
              <input 
              name="company"
              value={contact.company.name}
              onChange={updateInput}
              required={true}
              type='text' className='form-control' placeholder='Company'/>
            </div>
            <div className='mb-2'>
              <input 
              name="address"
              value={contact.address}
              onChange={updateInput}
              required={true}
              type='text' className='form-control' placeholder='Address'/>
            </div>
            <div className='mb-2'>
              <input 
              name="photo"
              value={contact.photo}
              onChange={updateInput}
              
              type='text' className='form-control' placeholder='Photo Url'/>
            </div>
            <div className='mb-2'>
              <input type='submit' className='btn btn-success' value='Create'/>
              <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
            </div>
          </form>
        </div>
          
        </div>
      </div>
    </section>
    </>
  )
}
