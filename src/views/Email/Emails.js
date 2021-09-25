import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import SkeletonTable from '../components/Skeleton';
import edit from '../assets/images/icons8-edit-30.png';
import deleteIcon from '../assets/images/icons8-delete-30.png';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types'
import add from '../assets/images/icons8-add-48.png'
import { DELETE_MESSAGE, MESSAGES } from '../Queries';

export const Emails = (props) => {

  const history = useHistory();
  const [Data, setData] = useState([])
  const [Error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('');
  const [modalMessage, setModalMessage] = useState(false)
  const [status, setStatus] = useState(true);

  const { data, refetch, loading, error } = useQuery(MESSAGES, {
    variables: { messagesId : '' },
    notifyOnNetworkStatusChange: true
  })
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  useEffect(() => {
    if(data) {
      setData(data.messages);
    }
  }, [data])

  useEffect(() => {
    error && setError(error.message ? error.message : 'Error Occurred');
  }, [error])

  useEffect(() => {
    if (props.location.state && props.location.state.message) {
      setSuccessMsg(props.location.state.message)
      setModalMessage(true);
      props.history.replace()
    }
  }, [props.location.state])

  useEffect(() => {
    if (modalMessage) {
      setTimeout(() => {
        setModalMessage(false)
      }, 3000)
    }
  }, [modalMessage])  

  useEffect(() => {
    if(Error){
      setStatus(false);
    }  
  }, [Error])

  function deleteEmailFun(id) {
    deleteMessage({variables: {messageId: id}})
    .then(({data})=> {
      console.log(`data`, data)
      refetch()}
    ).catch(error=> console.log(`error`, error))
  }

  return (
    <div>
    {(modalMessage && successMsg) && 
      <Alert color={status ? "success" : "warning"}>{status ? successMsg : Error}</Alert>}
      <div className='d-flex justify-content-between my-3 '>
        <h2 className='ms-1'>Emails</h2>
        <div className='me-3'>
          <img src={add} className='me-3' onClick={()=> history.push(`/create-email`)}></img>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>Sender Email</td>
            <td>Receiver Email</td>
            <td>Message</td>
            <td>Update</td>
            <td>Delete</td>
          </tr>
        </thead>
        {loading ? <SkeletonTable numberOfColumns={5} /> : <tbody>
          {Data.map((data, index) =>
            <tr key={index}>
                <td>{data.senderMail}</td>
                <td>{data.receiverMail}</td>
                <td>{data.message}</td>
                <td>
                  <img src={edit} onClick={()=> history.push(`/update-email/${data.id}`, {emailData: data})}></img>
                </td>
                <td>
                  <img src={deleteIcon} onClick={()=> deleteEmailFun(data.id)}></img>
                </td>          
            </tr>)}
        </tbody>}
      </table>
    </div>
  )
}

Emails.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}