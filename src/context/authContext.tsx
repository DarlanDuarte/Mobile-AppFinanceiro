import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  child,
  onValue,
  update,
} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

type IUser = {
  nome: string;
  uid: string;
  email: string | null;
};

interface IAuthContext {
  signed: boolean;
  user: IUser | undefined | null;
  SignUp: (email: string, password: string, nome: string) => Promise<void>;
  SignIn: (email: string, password: string) => Promise<void>;
  loading: boolean;
  SignOut: () => Promise<void>;
  authLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null | undefined>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    async function loadingStorage() {
      const storage: any = await AsyncStorage.getItem("auth_User");

      if (storage) {
        setUser(JSON.parse(storage));
        setLoading(false);
      }
      setLoading(false);
    }
    loadingStorage();
  }, []);

  //Cadastrar
  async function SignUp(email: string, password: string, nome: string) {
    setAuthLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(
      async (value) => {
        let uid = value.user.uid;

        const db = getDatabase();
        const dbRef = ref(db, "users");
        const dbChild = child(dbRef, uid);
        set(dbChild, {
          saldo: 0,
          nome: nome,
        })
          .then(() => {
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
            };
            setUser(data);
            userStorage(data);
            setAuthLoading(false);
          })
          .catch((e) => {
            console.warn(e.message);
            setAuthLoading(false);
          });
      }
    );
  }

  //Login
  async function SignIn(email: string, password: string) {
    setAuthLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        let uid = value.user.uid;

        const db = getDatabase();
        const dbRef = ref(db, "users");
        const dbChild = child(dbRef, uid);
        onValue(dbChild, (snapshot) => {
          let data = {
            uid: uid,
            nome: snapshot.val().nome,
            email: value.user.email,
          };
          setUser(data);
          userStorage(data);
          setAuthLoading(false);
        });
      })
      .catch((e) => {
        console.warn(e.message);
        setAuthLoading(false);
      });
  }

  async function userStorage(data: IUser) {
    AsyncStorage.setItem("auth_User", JSON.stringify(data));
  }

  async function SignOut() {
    const auth = getAuth();
    await signOut(auth);
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        SignUp,
        SignIn,
        loading,
        SignOut,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
