import { useMutation, useQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Col, Input, Label, Row, UncontrolledAlert } from 'reactstrap'
import { CREATE_MESSAGE, MESSAGES, NEW_MESSAGE } from '../../Queries'
import addNotification from 'react-push-notification';

const SendEmail = () => {

  const history = useHistory()
  const [senderEmail, setSenderEmail] = useState('')
  const [receiverEmail, setReceiverEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errSenderEmail, setErrSenderEmail] = useState('')
  const [errReceiverEmail, setErrReceiverEmail] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [Error, setError] = useState('')
  const [modalMessage, setModalMessage] = useState(false)

  const [ createMessage ] = useMutation(CREATE_MESSAGE)
  const { refetch } = useQuery(MESSAGES, {
    variables: { messagesId : '' },
  });
  const { data } = useSubscription(
    NEW_MESSAGE,
    { variables: { newMessageReceiverMail: receiverEmail } }
  );

  useEffect(() => {
    if (modalMessage) {
      setTimeout(() => {
        setModalMessage(false)
      }, 3000)
    }
  }, [modalMessage])

  useEffect(() => {
    if(data){
      addNotification({
        title: 'New Message',
        subtitle: data.newMessage.receiverMail,
        message: data.newMessage.message,
        theme: 'darkblue',
        native: true
      });
    }
  }, [data])

  function handleOnChange(e, type) {
    switch (type) {
      case 'SenderEmail':
        if(e.target.value){
          setErrSenderEmail('')
        }
        setSenderEmail(e.target.value)
        break;
      case 'ReceiverEmail':
        if(e.target.value){
          setErrReceiverEmail('')
        }
        setReceiverEmail(e.target.value)
        break;
      case 'Message':
        if(e.target.value){
          setErrMessage('')
        }
        setMessage(e.target.value)
        break;
      default:
        break;
    }
  }

  function onSubmit() {
    if(senderEmail && receiverEmail && message){
      createMessage({variables: {messageSenderMail: senderEmail, messageReceiverMail: receiverEmail, message: message}})
      .then(({data})=> {
        if(data){
          history.push('/email-list', {message: 'Email sent'})
          refetch()
        }
      }).catch(error => {
        if(error){ 
          setError('Error occurred')
        }
      })
    } else {
      if(!senderEmail){
        setErrSenderEmail('Required field')
      }
      if(!receiverEmail){
        setErrReceiverEmail('Required field')
      }
      if(!message){
        setErrMessage('Required field')
      }
    }
  }

  return (
    <div>
      <h2 className="text-center">Send Message</h2>
      {(modalMessage && Error) && 
        <UncontrolledAlert color="primary" className={modalMessage ? `sucess-alert ${!modalMessage ? 'alert' : 'alert-close'}` : `fail-alert ${!modalMessage ? 'alert' : 'alert-close'}`}>{Error}</UncontrolledAlert>}
        <Row>
        <Col xl='4'></Col>
        <Col xl='4'>
          <Row>
            <Col md='12' className='mt-3'>
              <Label for='SenderEmail'>Sender Email</Label>
              <Input name='SenderEmail' value={senderEmail} onChange={(e)=> handleOnChange(e, 'SenderEmail')}></Input>
              <p>{errSenderEmail}</p>
            </Col>
            <Col md='12' className='mt-3'>
              <Label for='ReceiverEmail'>Receiver Email</Label>
              <Input name='ReceiverEmail' value={receiverEmail} onChange={(e)=> handleOnChange(e, 'ReceiverEmail')}></Input>
              <p>{errReceiverEmail}</p>
            </Col>
            <Col md='12' className='mt-3'>
              <Label for='message'>Message</Label>
              <Input name='message' value={message} onChange={(e)=> handleOnChange(e, 'Message')}></Input>
              <p>{errMessage}</p>
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

// SendEmail.propTypes = {

// }

export default SendEmail
