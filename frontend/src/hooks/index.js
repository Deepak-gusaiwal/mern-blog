import { useDispatch } from "react-redux";
import { lookInSession, clearSession } from "../utils/session";
import { Axios } from "../utils";
import { storeLogin, storeLogout } from "../redux/userSlice";
import { tokenName } from "../utils/env";
import { toggleIsLoading } from "../redux/basicSlice";
import { useNavigate } from "react-router-dom";
//1. fetch and store user
export const useFetchAndStoreUser = () => {
  const dispatch = useDispatch();
  const fetchAndStoreUser = async () => {
    dispatch(toggleIsLoading(true));
    try {
      // now fetch and store user
      const token = lookInSession(tokenName);
      const {
        data: { result, success },
      } = await Axios.get("/user/get", {
        headers: {
          Authorization: token,
        },
      });
      success && dispatch(storeLogin({ ...result }));
    } catch (error) {
      console.log("F - Failed to fetch and store user ::", error.message);
      return;
    } finally {
      dispatch(toggleIsLoading(false));
    }
  };
  return fetchAndStoreUser;
};
//2. store logout user
export const useStoreLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(toggleIsLoading(true));
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      clearSession(); // Clear the session
      dispatch(storeLogout()); // Dispatch the logout action
      navigate("/login"); // Navigate to the login page
    } catch (error) {
      console.error("F - Logout failed::", error);
    } finally {
      dispatch(toggleIsLoading(false));
    }
  };

  return handleLogout;
};
