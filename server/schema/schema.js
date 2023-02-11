// Data from Store
// let { clients, projects } = require("../simpleData");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

// models
const Client = require("../models/Client.model");
const Project = require("../models/Project.model");

// types
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: async (parent, args) => {
        return await Client.findById(parent.clientId);
      },
    },
  }),
});

// queries
const query = new GraphQLObjectType({
  name: "Queries",
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => await Client.findById(args.id),
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: async () => await Client.find(),
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        return await Project.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: async () => await Project.find(),
    },
  },
});

// mutations
const mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    // Create client
    createClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        // const client = new Client({ ...args });
        // return client.save();

        return await Client.create({ ...args });
      },
    },
    // Delete client
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args) => {
        // const client = new Client({ ...args });
        // return client.save();

        return await Client.findByIdAndDelete(args.id);
      },
    },
    // Create project
    createProject: {
      type: ProjectType,
      args: {
        // id: { type: GraphQLID },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        clientId: { type: GraphQLNonNull(GraphQLID) },
        status: {
          type: GraphQLNonNull(GraphQLString),
          // type: new GraphQLEnumType({
          //   name: "ProjectStatus",
          //   values: {
          //     new: { value: "Not Started" },
          //     progress: { value: "In Progress" },
          //     completed: { value: "Completed" },
          //   },
          // }),
          // defaultValue: "Not Started",
        },
      },
      resolve: async (parent, args) => {
        // projects.push(args);
        // return { ...args };
        return await Project.create({ ...args });
      },
    },
    // Update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve: async (parent, args) => {
        return await Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
    // Delete project
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args) => {
        return await Project.findByIdAndDelete(args.id);

        // projects = projects.filter((p) => p.id !== args.id);
        // return { ...args };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});
