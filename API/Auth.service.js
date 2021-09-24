import { Auth, Storage, API, graphqlOperation } from "aws-amplify";
import * as mutations from "../src/graphql/mutations";
import * as queries from "../src/graphql/queries";

export function login(email, password) {
  return new Promise((resolve, reject) => {
    Auth.signIn(email, password)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function signUp(name, email, password) {
  return new Promise((resolve, reject) => {
    Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        name: name,
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function uploadImage(filename, file) {
  return new Promise((resolve, reject) => {
    Storage.put(filename, file)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getImage(key) {
  return new Promise((resolve, reject) => {
    Storage.get(key)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createCategory(category) {
  return new Promise((resolve, reject) => {
    const result = API.graphql(
      graphqlOperation(mutations.createCategory, { input: category })
    );
    result.then((res) => resolve(res));
  });
}

export function createUser(user) {
  return new Promise((resolve, reject) => {
    const result = API.graphql(
      graphqlOperation(mutations.createUser, { input: user })
    );
    result
      .then((res) => resolve(res.data.createUser))
      .catch((err) => reject(err));
  });
}

export function getCategories() {
  return new Promise((resolve, reject) => {
    const result = API.graphql(graphqlOperation(queries.listCategories));
    result
      .then((res) => resolve(res.data.listCategories))
      .catch((err) => reject(err));
  });
}

export function setUserCategory(userid, categories) {
  return new Promise((resolve, reject) => {
    const result = API.graphql(
      graphqlOperation(mutations.updateUser, {
        input: { id: userid, categories: categories },
      })
    );
    result.then((res) => resolve(res)).catch((err) => reject(err));
  });
}

export function followFriend(userid, friendid) {
  return new Promise((resolve, reject) => {
    const result = API.graphql(
      graphqlOperation(mutations.createFriend, {
        input: { userID: userid, friendID: friendid },
      })
    );
    result
      .then((res) => resolve(res.data.createFriend))
      .catch((err) => reject(err.errors[0]));
  });
}

export function unfollowFriend(id) {
  return new Promise((resolve, reject) => {
    const result = API.graphql(
      graphqlOperation(mutations.deleteFriend, {
        input: { id: id },
      })
    );
    result
      .then((res) => resolve(res.data.deleteFriend))
      .catch((err) => reject(err.errors[0]));
  });
}

export function getUsers() {
  return new Promise((resolve, reject) => {
    const result = API.graphql(graphqlOperation(queries.listUsers));
    result
      .then((res) => resolve(res.data.listUsers))
      .catch((err) => reject(err));
  });
}

export function getFollowers(userid) {
  return new Promise((resolve, reject) => {
    const result = API.graphql(
      graphqlOperation(queries.listFriends, {
        filter: { userID: { eq: userid } },
      })
    );
    result
      .then((res) => resolve(res.data.listFriends))
      .catch((err) => reject(err));
  });
}
