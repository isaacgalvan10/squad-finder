const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Project {
    _id: ID
    title: String
    date: String
    poster: User
    edited: Boolean
    description: String
    projectImg: String
    teamSize: Int
    closed: Boolean
    members: [User]
    tags: [String]
    requests: [User]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    github: String
    picture: String
    bio: String
    posts: [Project]
    joinedProjects: [Project]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    projects: [Project]
    project(projectId: ID!): Project
    users: [User]
    user(userId: ID!): User
    me: User
    search(input: String!): [Project] 
  }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, github: String): Auth
        login(email: String!, password: String!): Auth
        checkUserExist(email: String!): Auth
        addPost(title: String!, tagsString: String!, description: String!, teamSize: Int!, projectImg: String!): Project
        removePost(postId: ID!): Project
        addMember(userId: ID!, projectId: ID!): Project
        removeMember(projectId: ID!, userId: ID!): Project
        addRequest(userId: ID!, projectId: ID!): Project
        removeRequest(projectId: ID!, userId: ID!): Project
        removeProject(userId: ID!, projectId: ID!): User
        editProfile(userId: ID!, newUsername: String!, newBio: String!): User
    }
`;

module.exports = typeDefs;             

