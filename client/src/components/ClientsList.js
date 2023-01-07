import { useMutation, gql } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { CLIENTS } from "../apollo/queries";

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

export default function ClientsList({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {
      id: client.id,
    },
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: CLIENTS });
      cache.writeQuery({
        query: CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });
  return (
    <>
      <tr key={client.id}>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={deleteClient}>
            <FaTrash />
          </button>
        </td>
      </tr>
    </>
  );
}
