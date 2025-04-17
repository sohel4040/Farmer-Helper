import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  type User = {
    mobile: string;
    password: string;
    city: string,
    name:string
  };
  
  type AuthContextType = {
    user: User | null;
    login: (userData: User) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  type AuthProviderProps = {
    children: ReactNode;
  };
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const checkLogin = async () => {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      };
      checkLogin();
    }, []);
  
    const login = async (userData: User) => {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    };
  
    const logout = async () => {
      await AsyncStorage.removeItem("user");
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
  