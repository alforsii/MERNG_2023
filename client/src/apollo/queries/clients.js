import { gql } from "@apollo/client";

const CLIENTS = gql`
  query {
    clients {
      id
      name
      phone
      email
    }
  }
`;

const CREATE_CLIENT = gql`
  mutation ($name: String!, $email: String!, $phone: String!) {
    createClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;
const DELETE_CLIENT = gql`
  mutation ($id: ID!) {
    deleteClient(id: $id) {
      id
      email
      name
      phone
    }
  }
`;

export { CLIENTS, CREATE_CLIENT, DELETE_CLIENT };
