import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface Match {
  id: string;
  users: Profile[];
  usersMatched: string[];
  timestamp: FirebaseFirestoreTypes.FieldValue;
}

export interface Profile {
  id: string;
  displayName: string;
  age: string;
  job: string;
  photoURL: string;
  timestamp: FirebaseFirestoreTypes.FieldValue;
}

export interface Message {}
