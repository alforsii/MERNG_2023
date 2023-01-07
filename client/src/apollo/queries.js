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

export { CLIENTS };
