import React from "react";
import { useQuery } from "@apollo/client";
import { CLIENTS } from "../apollo/queries/clients";
import AddClientModal from "./AddClientModal";
import Client from "./Client";
import { Link } from "react-router-dom";

export default function Clients() {
  const { loading, error, data } = useQuery(CLIENTS);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <>
      <AddClientModal />
      <Link to={"/projects"}>Projects</Link>
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
            <Client key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </>
  );
}
