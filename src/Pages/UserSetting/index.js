import SettingsLayout from "./SettingsLayout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  Button,
  HStack,
  Input,
  Text,
  VStack,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";

function UserSetting() {
  const navigate = useNavigate();
  const toast = useToast();
  const inputStyle = {
    border: 0,
    borderBottom: "1px solid #144CB8",
    background: "#F5FCFE",
    borderRadius: 0,
  };
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}auth/user/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (error?.response?.status === 500) {
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
        }
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <SettingsLayout>
      <Text fontSize={"xl"} fontWeight={"bold"} mt={5}>
        Update Profile
      </Text>

      <Container width={"full"}>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            setIsLoading(true);
            axios
              .put(`${process.env.REACT_APP_BASE_URL}auth/user/`, data, {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              })
              .then(function (response) {
                setIsLoading(false);
                console.log(response);
              })
              .catch(function (error) {
                setIsLoading(false);
                console.log(error);
              });
          })}
        >
          <VStack gap={6} bg="">
            <HStack width={"full"}>
              <Input
                style={inputStyle}
                type="text"
                name={"first_name"}
                placeholder="First Name"
                {...register("first_name")}
                defaultValue={user?.first_name ? user.first_name : ""}
              />
              <Input
                style={inputStyle}
                type="text"
                name={"last_name"}
                {...register("last_name")}
                placeholder="Last Name"
                defaultValue={user?.last_name ? user.last_name : ""}
              />
            </HStack>
            <Input
              style={inputStyle}
              type="text"
              placeholder="Username"
              value={user?.username ? user.username : ""}
              disabled
            />
            <Input
              style={inputStyle}
              disabled={true}
              type="email"
              placeholder="Email Address"
              value={user?.email ? user.email : ""}
            />
            <Input
              style={inputStyle}
              type="tel"
              name={"phone_number"}
              placeholder="Phone Number"
              defaultValue={user?.phone_number ? user.phone_number : ""}
              {...register("phone_number")}
            />
            <Button
              justifyContent={"space-between"}
              rightIcon={<ArrowForwardIcon />}
              width={"full"}
              type="submit"
              isLoading={isLoading}
            >
              Update
            </Button>
          </VStack>
        </form>
      </Container>
    </SettingsLayout>
  );
}

export default UserSetting;
