import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CLIENTS, CREATE_CLIENT } from "../apollo/queries/clients";
import { CREATE_PROJECT, PROJECTS } from "../apollo/queries/projects";
import { useEffect } from "react";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("Not Started");

  const { loading, error, data } = useQuery(CLIENTS);

  const [addProject] = useMutation(CREATE_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { createProject } }) {
      const { projects } = cache.readQuery({ query: PROJECTS });
      cache.writeQuery({
        query: PROJECTS,
        data: { projects: [...projects, createProject] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status || !clientId) {
      return alert("Please fill in all inputs!");
    }
    // console.log({ name, email, phone });
    addProject(name, description, status, clientId);

    setName("");
    setDescription("");
    setStatus("Not Started");
    setClientId("");
  };

  // useEffect(() => {
  //   return () => {
  //     setName("");
  //     setDescription("");
  //     setStatus("new");
  //     setClientId("");
  //   };
  // }, []);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add Project
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Client
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Clients</label>
                  <select
                    id="clientId"
                    className="form-select"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value={""}>Select Client</option>
                    {data?.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    id="status"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={"Not Started"}>Not Started</option>
                    <option value={"In Progress"}>In Progress</option>
                    <option value={"Completed"}>Completed</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss={
                      name && description && status && clientId && "modal"
                    }
                    // onClick={onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
