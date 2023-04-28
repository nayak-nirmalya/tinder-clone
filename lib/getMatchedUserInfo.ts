import { Profile } from "./typesInterfaces";

import firestore from "@react-native-firebase/firestore";

// @ts-nocheck
// const getMatchedUserInfo = (users, userLoggedIn: string) => {
//   const newUsers = JSON.parse(JSON.stringify(users));
//   delete newUsers[userLoggedIn];
//   console.log(newUsers);

//   const [id, user] = Object.entries(newUsers).flat;

//   return { id, ...user };
// };

const getUserById = async (id: string): Promise<Profile> => {
  return (
    await firestore().collection("Users").doc(id).get()
  ).data() as Profile;
};

export default getUserById;
