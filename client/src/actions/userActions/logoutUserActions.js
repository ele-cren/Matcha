import { LOGOUT } from "./userConsts";

// Implement log out request function
export const logOut = () => {
  return {
    type: LOGOUT
  }
}
