import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
const Authenticate = (props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const user = async () => {
    localStorage.setItem("busStop", window.location.pathname);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}auth/user/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        setIsActive(true);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response?.status === 500) {
          toast({ title: "Server error", status: "error" });
        } else if (error.response?.status === 403) {
          toast({
            title: "session expired. Please sign in again",
            status: "warning",
          });
          navigate("/login");
        } else if (error.response?.status === 401) {
          toast({
            title: "Unautorised. Please sign in again",
            status: "warning",
          });
          navigate("/login");
        } else {
          toast({
            title: "An error occured",
            status: "warning",
          });
          navigate("/login");
        }
      });
  };
  useEffect(() => {
    user();
  });

  return <Box> {isActive && props.children}</Box>;
};

export default Authenticate;
