import { useQuery, gql } from "@apollo/client";

import "./App.css";
import ClientsList from "./components/ClientsList";
import { CLIENTS } from "./apollo/queries";

function App() {
  const { loading, error, data } = useQuery(CLIENTS);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <div className="container">
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.clients.map((client) => (
            <ClientsList key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
