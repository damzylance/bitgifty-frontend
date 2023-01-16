import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const Authenticate = () => {
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const user = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}auth/user/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then(function (response) {
          console.log(response.data.wallet_address);
          localStorage.setItem("wallet", response?.data?.wallet_address);
          console.log(localStorage.getItem("wallet"));
        })
        .catch(function (error) {
          console.log(error);
          if (error.response?.status === 500) {
            toast({ title: "Server error", status: "error" });
          }
          if (error.response?.status === 403) {
            toast({
              title: "session expired. Please sign in again",
              status: "warning",
            });
            navigate("/login");
          }
          if (error.response?.status === 401) {
            toast({
              title: "Unautorised. Please sign in again",
              status: "warning",
            });
            navigate("/login");
          }
        });
    };
    user();
  });
};

export default Authenticate;
