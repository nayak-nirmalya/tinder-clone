import { WEB_CLIENT_ID } from "@env";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

interface AuthProps {
  children?: React.ReactNode;
}

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  error: string | null;
  loading: boolean;
  signOut: () => void;
  onGoogleButtonPress: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  error: null,
  loading: false,
  signOut: () => {},
  onGoogleButtonPress: () => {}
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID
  });

  // Set an initializing state whilst Firebase connects
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  const onAuthStateChanged = (user: FirebaseAuthTypes.User) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const onGoogleButtonPress = async () => {
    try {
      setLoading(true);

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      setError(error as string);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);

      await GoogleSignin.revokeAccess();
      await auth().signOut();

      setUser(null);
    } catch (error) {
      setError(error as string);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      loading,
      signOut,
      onGoogleButtonPress
    }),
    [user, error, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
