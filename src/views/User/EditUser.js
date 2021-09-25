import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, Input, Label, Row } from 'reactstrap'
import { useMutation } from '@apollo/client'
import { GET_USERS, UPDATE_USER } from '../../Queries'
import { useHistory } from 'react-router-dom'

const EditUser = (props) => {

  const { location } = props
  const userData = location.state.userData
  const history = useHistory();
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errName, setErrName] = useState('')
  const [Error, setError] = useState('')
  const [ updateUser ] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query : GET_USERS }]
  });

  useEffect(() => {
    if(userData){
      setId(userData.id);
      setName(userData.name);
      setEmail(userData.email);
    }
  }, [userData])
  
  function handleOnChange(e, type) {
    switch (type) {
      case 'name':
        if(e.target.value){
          setErrName('')
        }
        setName(e.target.value)
        break;
      default:
        break;
    }
  }
  
  function onSubmit() {
    if(name){
      updateUser({variables: {userId: id, userName: name}})
      .then(({data})=> {
        if(data){
          history.push('/', {message: 'User updated successfully'})
        }
      }).catch(error=>{
        if(error){ 
          setError(error ? error.message : 'Error Occurred')
        }
      })
    } else {
      setErrName('Required field')
    }
  }

  return (
    <div>
    {Error && 
      <Alert color='warning'>{Error}</Alert>}
      <h2 className="text-center">Edit User</h2>
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
              <Input name='email' disabled value={email}></Input>
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

EditUser.propTypes = {
    location: PropTypes.object
}

export default EditUser
