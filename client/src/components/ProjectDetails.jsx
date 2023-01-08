import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { PROJECT } from "../apollo/queries/projects";

export default function ProjectDetails(props) {
  const params = useParams();

  const { loading, error, data } = useQuery(PROJECT, {
    variables: { id: params.id },
  });

  console.log(data);
  if (loading) return <div>Loading....</div>;
  if (error) return <div>Something went wrong!</div>;

  const { name, description, status, client } = data?.project;
  return (
    <div>
      <h1>ProjectDetails</h1>
      <p>{name}</p>
      <p>{description}</p>
      <p>{status}</p>
      <p>{client?.name}</p>
      <p>{client?.email}</p>
      <Link to={"/projects"}>Go back</Link>
    </div>
  );
}
