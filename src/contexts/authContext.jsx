import { createContext, useEffect, useReducer } from "react";

const getLocalStorageItem = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Failed to parse localStorage item "${key}":`, error);
    return defaultValue;
  }
};

const INITIAL_STATE = {
  user: getLocalStorageItem("user", null),
  isAdmin: getLocalStorageItem("isAdmin", false),
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isAdmin: action.payload.isAdmin,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isAdmin: false,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isAdmin: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("isAdmin", JSON.stringify(state.isAdmin));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [state.user, state.isAdmin]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAdmin: state.isAdmin,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
