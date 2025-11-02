// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface AuthContextType {
//   user: any;
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   token: null,
//   login: async () => {},
//   logout: async () => {},
// });

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<any>(null);
//   const [token, setToken] = useState<string | null>(null);

//   // Load stored token on app startup
//   useEffect(() => {
//     const loadStoredAuth = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('authToken');
//         const storedUser = await AsyncStorage.getItem('user');
//         if (storedToken) setToken(storedToken);
//         if (storedUser) setUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error('Error loading stored auth:', error);
//       }
//     };
//     loadStoredAuth();
//   }, []);

//   // Simulated login function — replace with your API call
//   const login = async (email: string, password: string) => {
//     try {
//       // Example login call
//       const response = await fetch('https://api.example.com/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (data?.token) {
//         await AsyncStorage.setItem('authToken', data.token);
//         await AsyncStorage.setItem('user', JSON.stringify(data.user || { email }));
//         setToken(data.token);
//         setUser(data.user || { email });
//       } else {
//         throw new Error('Invalid login response');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem('authToken');
//       await AsyncStorage.removeItem('user');
//       setUser(null);
//       setToken(null);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
