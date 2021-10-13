import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Input, Label, Row, UncontrolledAlert } from 'reactstrap'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { CREATE_USER, GET_USERS, NEW_USER } from '../../Queries'
import addNotification from 'react-push-notification'

const CreateUser = () => {

  const history = useHistory();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errName, setErrName] = useState('')
  const [errEmail, setErrEmail] = useState('')
  const [Error, setError] = useState('')
  const [ createUser ] = useMutation(CREATE_USER);
  const { refetch } = useQuery(GET_USERS);
  const { data } = useSubscription(NEW_USER);

  useEffect(() => {
    if(data){
      addNotification({
        title: 'New Message',
        subtitle: 'New user added',
        message: data.newUser.name,
        theme: 'darkblue',
        native: true
      });
    }
  }, [data])

  function handleOnChange(e, type) {
    switch (type) {
      case 'name':
        if(e.target.value){
          setErrName('')
        }
        setName(e.target.value)
        break;
      case 'email':
        if(e.target.value){
          setErrEmail('')
        }
        setEmail(e.target.value)
        break;
      default:
        break;
    }
  }
  
  function onSubmit() {
    if(name && email){
      createUser({variables: {name: name, email: email}})
      .then(({data})=> {
        if(data){
          history.push('/', {message: 'User Added successfully'})
          refetch()
        }
      }).catch(error=>{
        if(error){ 
          setError(error)
        }
      })
    } else {
      if(!name){
        setErrName('Required field');
      }
      if(!email){
        setErrEmail('Required field');
      }
    }
  }

  return (
    <div>
    {Error && 
    <UncontrolledAlert color="primary">{Error}</UncontrolledAlert>}
      <h2 className="text-center">Add User</h2>
      <Row>
        <Col xl='4'></Col>
        <Col xl='4'>
          <Row>
            <Col md='12' className='mt-3'>
              <Label for='name'>Name</Label>
              <Input name='name' value={name} onChange={(e)=> handleOnChange(e, 'name')}></Input>
              <p className="error-text">{errName}</p>
            </Col>
            <Col md='12' className='mt-3'>
              <Label for='email'>Email</Label>
              <Input name='email' value={email} onChange={(e)=> handleOnChange(e, 'email')}></Input>
              <p className="error-text">{errEmail}</p>
            </Col>
            <Col md='12' className='mt-3'>
              <Button color='success' onClick={onSubmit}>Submit</Button>
              <Button className='ms-3' onClick={()=> history.goBack()}>Cancel</Button>
            </Col>
          </Row>
        </Col>
        <Col xl='4'></Col>
      </Row>
    </div>
  )
}

CreateUser.propTypes = {
    location: PropTypes.object
}

export default CreateUser