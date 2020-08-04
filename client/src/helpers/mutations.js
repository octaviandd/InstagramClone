/** @format */

import gql from "graphql-tag";

export const NEW_USER = gql`
  mutation CreateUser($input: SignupInput!) {
    createUser(input: $input) {
      user {
        _id
        name
        username
        email
        avatar
        createdAt
        likedPosts {
          _id
        }
        posts {
          _id
        }
      }
      token
    }
  }
`;

export const NEW_POST = gql`
  mutation CreatePost($input: NewPostInput!) {
    createPost(input: $input) {
      _id
      author {
        _id
      }
      description
      createdAt
      likes {
        _id
      }
      comments {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: SigninInput!) {
    loginUser(input: $input) {
      user {
        _id
        name
        username
        email
        createdAt
        images {
          _id
        }
        posts {
          _id
        }
        likedPosts {
          _id
        }
      }
      token
    }
  }
`;

export const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      uri
    }
  }
`;

export const CHANGE_AVATAR = gql`
  mutation($file: Upload!) {
    results: changeAvatar(file: $file) {
      filename
      mimetype
      encoding
      uri
    }
  }
`;

export const NEW_COMMENT = gql`
  mutation CreateComment($input: NewCommentInput!) {
    createComment(input: $input) {
      _id
      content
      parentPost {
        _id
      }
      createdAt
      likes {
        _id
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($input: ID!) {
    followUser(input: $input) {
      _id
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($input: ID!) {
    unfollowUser(input: $input) {
      _id
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($input: ID!) {
    likePost(input: $input) {
      _id
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnlikePost($input: ID!) {
    unlikePost(input: $input) {
      _id
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation LikeComment($input: ID!) {
    likeComment(input: $input) {
      _id
    }
  }
`;

export const UNLIKE_COMMENT = gql`
  mutation unlikeComment($input: ID!) {
    unlikeComment(input: $input) {
      _id
    }
  }
`;
