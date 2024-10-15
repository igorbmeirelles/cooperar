"use client";
import { auth, fireSignIn, onChange } from "@/lib/adapters/firebase/config";
import { User } from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

interface IAuthContext {
  user: User | null;
  signIn: (user: IUserSignIn) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface IUserSignIn {
  email: string;
  password: string;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  signIn: async (user: IUserSignIn) => {},
  signOut: async () => {},
});

interface IProps extends PropsWithChildren<{}> {}

export const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { push } = useRouter();

  const { set: setCookie, remove } = useCookies();

  const saveUserState = useCallback(
    (user: User) => {
      setCookie("auth", "true", {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
      });

      setUser(user);
    },
    [setCookie]
  );

  const clearState = useCallback(() => {
    remove("auth");
    setUser(null);
  }, [remove]);

  const signIn = useCallback(async ({ email, password }: IUserSignIn) => {
    try {
      const credentials = await fireSignIn(auth, email, password);

      if (!credentials.user) {
        throw new Error("Credenciais inválidas");
      }
    } catch (ex: any) {
      if (ex.code === "auth/invalid-credential") {
        throw new Error("Credenciais inválidas");
      }

      throw new Error(
        "Ocorreu um erro ao tentar autenticar, por favor, tente mais tarde."
      );
    }
  }, []);

  const signOut = useCallback(async () => {
    await auth.signOut();
    clearState();
  }, [clearState]);

  useEffect(() => {
    onChange(auth, (user) => {
      if (user) {
        saveUserState(user);
        push("/");
        return;
      }
      clearState();
      push("/login");
    });
  }, [push, saveUserState, clearState]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
