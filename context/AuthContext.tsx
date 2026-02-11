
// This file is deprecated and unused in the static version.
import React from 'react';
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => <>{children}</>;
export const useAuth = () => ({ isAuthenticated: false, user: null, profile: null, loading: false, logout: async () => {}, refreshProfile: async () => {} });
