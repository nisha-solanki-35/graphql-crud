import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import SkeletonTable from '../../components/Skeleton';
import edit from '../assets/images/icons8-edit-30.png';
import { DELETE_USER, GET_USERS } from '../../Queries';
import deleteIcon from '../assets/images/icons8-delete-30.png';
// import { UncontrolledAlert } from 'reactstrap';
import PropTypes from 'prop-types'
import add from '../assets/images/icons8-add-48.png'
import email from '../assets/images/mail.png'
import { Alert } from 'reactstrap';

export const Users = (props) => {

  const history = useHistory();
  const [Data, setData] = useState([])
  const [Error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('');
  const [modalMessage, setModalMessage] = useState(false)
  const [status, setStatus] = useState(true);
  const { error, data, loading, refetch } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  useEffect(() => {
    if(data) {
      setData(data.users);
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

  function deleteUserFun(uEmail) {
    deleteUser({variables: {userEmail: uEmail}})
    .then(({data})=> {
      console.log(`data`, data)
      refetch()
    }).catch(error=> console.log(`error`, error))
  }

  return (
    <div>
    {(modalMessage && successMsg) && 
      <Alert color={status ? "success" : "warning"}>{status ? successMsg : Error}</Alert>}
      <div className='d-flex justify-content-between my-3 '>
        <h2 className='ms-1'>Users</h2>
        <div className='me-3'>
          <img src={add} className='me-3' onClick={()=> history.push(`/create-user`)}></img>
          <img src={email} onClick={()=> history.push(`/email-list`)}></img>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>Email</td>
            <td>Name</td>
            <td>Update</td>
            <td>Delete</td>
          </tr>
        </thead>
        {loading ? <SkeletonTable numberOfColumns={4} /> : <tbody>
          {Data.map((data, index) =>
            <tr key={index}>
                <td>{data.email}</td>
                <td>{data.name}</td>
                <td>
                  <img src={edit} onClick={()=> history.push(`/update-user/${data.id}`, {userData: data})}></img>
                </td>
                <td>
                  <img src={deleteIcon} onClick={()=> deleteUserFun(data.email)}></img>
                </td>          
            </tr>)}
        </tbody>}
      </table>
    </div>
  )
}

Users.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}