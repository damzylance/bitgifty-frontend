import SettingsLayout from "./SettingsLayout";
import React, { useState } from "react";
import {
  Button,
  HStack,
  Input,
  Text,
  VStack,
  Container,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";

function UserSetting() {
  const inputStyle = {
    border: 0,
    borderBottom: "1px solid #144CB8",
    background: "#F5FCFE",
    borderRadius: 0,
  };
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
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
            console.log(data);
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
              />
              <Input
                style={inputStyle}
                type="text"
                name={"last_name"}
                {...register("last_name")}
                placeholder="Last Name"
              />
            </HStack>
            <Input
              style={inputStyle}
              type="text"
              placeholder="Username"
              disabled
            />
            <Input
              style={inputStyle}
              disabled={true}
              type="email"
              placeholder="Email Address"
              value={"omonla@gmail.com"}
            />
            <Input
              style={inputStyle}
              type="tel"
              name={"phone_number"}
              placeholder="Phone Number"
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
