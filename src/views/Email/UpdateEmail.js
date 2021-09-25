import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, Input, Label, Row } from 'reactstrap'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { UPDATE_MESSAGE } from '../../Queries'

const UpdateEmail = (props) => {

  const { location } = props
  const emailData = location.state.emailData
  const history = useHistory();
  const [id, setId] = useState('')
  const [Message, setMessage] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [Error, setError] = useState('')
  const [ updateMessage ] = useMutation(UPDATE_MESSAGE);

  useEffect(() => {
    if(emailData){
      setId(emailData.id);
      setMessage(emailData.message);
    }
  }, [emailData])
  
  function handleOnChange(e, type) {
    switch (type) {
      case 'Message':
        setMessage(e.target.value)
        break;
      default:
        break;
    }
  }
  
  function onSubmit() {
    if(Message){
      updateMessage({variables: {updateMessageId: id, updateMessage: Message}})
      .then(({data})=> {
        if(data){
          history.push('/email-list', {message: 'Message updated successfully'})
        }
      }).catch(error=>{
        if(error){ 
          setError('Error Occurred')
        }
      })
    } else {
      setErrMessage('Required field')
    }
  }

  return (
    <div>
    {Error && 
      <Alert color='warning'>{Error}</Alert>}
      <h2 className="text-center">Edit Message</h2>
      <Row>
        <Col xl='4'></Col>
        <Col xl='4'>
          <Row>
            <Col md='12' className='mt-3'>
              <Label for='Message'>Edit Message</Label>
              <Input Message='Message' value={Message} onChange={(e)=> handleOnChange(e, 'Message')}></Input>
              <p className="error-text">{errMessage}</p>
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

UpdateEmail.propTypes = {
    location: PropTypes.object
}

export default UpdateEmail
