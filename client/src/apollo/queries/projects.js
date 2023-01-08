import { gql } from "@apollo/client";

const PROJECT = gql`
  query ($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
const PROJECTS = gql`
  query {
    projects {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation (
    $name: String!
    $description: String!
    $clientId: ID!
    $status: ProjectStatus!
  ) {
    createProject(
      name: $name
      description: $description
      clientId: $clientId
      status: $status
    ) {
      id
      name
      description
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
const DELETE_PROJECT = gql`
  mutation ($id: ID!) {
    deleteProject(id: $id) {
      id
      email
      name
      phone
    }
  }
`;

export { PROJECT, PROJECTS, CREATE_PROJECT, DELETE_PROJECT };
