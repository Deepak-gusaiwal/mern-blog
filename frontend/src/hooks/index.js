import { useDispatch } from "react-redux";

export const useFetchAndStorUser = () => {
  const dispatch = useDispatch();
  const fetchAndStoreUser = async () => {
     // now fetch and store user
     const {
        data: { result },
      } = await Axios.get("/user/get", {
        headers: {
          Authorization: data.result,
        },
      });
      dispatch(storeLogin({ ...result }));
      console.log("fetched data", result);
  };
};
