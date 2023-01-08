import React from "react";
import { useQuery } from "@apollo/client";
import { PROJECTS } from "../apollo/queries/projects";
import Project from "./Project";
import { Link } from "react-router-dom";
import AddProjectModal from "./AddProjectModal";

export default function Projects() {
  const { loading, error, data } = useQuery(PROJECTS);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <>
      <AddProjectModal />
      <Link to={"/"}>Home</Link>
      {data?.projects.length > 0 ? (
        data.projects.map((project) => (
          <Project key={project.id} project={project} />
        ))
      ) : (
        <p>No projects!</p>
      )}
    </>
  );
}
