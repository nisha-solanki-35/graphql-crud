import { gql } from "@apollo/client"


export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`
export const GET_USERS = gql`
  query Query {
    users {
      id
      name
      email
    }
  }
`
export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $userName: String) {
    updateUser(id: $userId, name: $userName) {
      id
      name
      email
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($userEmail: String!) {
    deleteUser(email: $userEmail)
  }
`
export const NEW_USER = gql`
  subscription newUser {
    newUser {
      id
      name
      email
    }
  }
`

export const MESSAGES = gql`
  query Query($messagesId: String!) {
    messages(id: $messagesId) {
      id
      message
      senderMail
      receiverMail
      iUserId
    }
  }
`

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($messageSenderMail: String!, $messageReceiverMail: String!, $message: String!) {
    createMessage(senderMail: $messageSenderMail, receiverMail: $messageReceiverMail, message: $message) {
      id
      message
      senderMail
      receiverMail
      iUserId
    }
  }
`

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($updateMessageId: ID!, $updateMessage: String!){
    updateMessage(id: $updateMessageId, message: $updateMessage) {
      id
      message
      senderMail
      receiverMail
      iUserId 
   }
  }
`

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($messageId: String!) {
    deleteMessage(id: $messageId)
  }
`

export const NEW_MESSAGE = gql`
  subscription newMessage($newMessageReceiverMail: String!) {
    newMessage(receiverMail: $newMessageReceiverMail) {
      id
      message
      senderMail
      receiverMail
      iUserId
    }
  }
`