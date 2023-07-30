import {
  Container,
  VStack,
  Text,
  Input,
  Button,
  Flex,
  useToast,
  Box,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import AuthLayout from "../../Components/AuthLayout";
import { useForm } from "react-hook-form";
import axios from "axios";

import React, { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}auth/login/`, data)

      .then(function (response) {
        localStorage.setItem("token", response.data.key);
        console.log(response);
        setIsLoading(false);
        toast({ title: "Login Successful", status: "success" });
        const busStop = localStorage.getItem("busStop");
        navigate(busStop === "/giftcard/redeem" ? busStop : "/dashboard");
      })
      .catch(function (error) {
        if (error.response?.status === 400) {
          toast({
            title: "Incorrect email or password",
            status: "error",
          });
        }
        // if (error.response?.data?.non_field_errors) {
        //   toast({
        //     title: error.response?.data?.non_field_errors[0],
        //     status: "error",
        //   });
        //   console.log(error.response?.data?.non_field_errors[0]);
        // } else {
        //   toast({
        //     title: "An error occured",
        //     status: "error",
        //   });
        // }

        console.log(error);
        setIsLoading(false);
      });
  };
  return (
    <AuthLayout
      height={"100vh"}
      flexDir={"column"}
      bg={"brand.50"}
      justifyContent="center"
    >
      <Container
        sx={{
          background: "#FFFFFF",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "16px",
        }}
        maxW={"480px"}
        py={10}
        px={4}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={"10"} w="full" alignItems={"flex-start"}>
            <Text color={"brand.700"} fontSize={"xl"} fontWeight={"700"}>
              Login
            </Text>
            <VStack w={"full"} gap={"2"}>
              <Box width={"full"}>
                <Input
                  minLength={3}
                  name="email"
                  size={"md"}
                  placeholder={"Enter your email"}
                  type={"text"}
                  required
                  {...register("email", {})}
                />
                <Text color="red" fontSize={"xs"}>
                  {errors.email?.message}
                </Text>
              </Box>

              <Input
                minLength={8}
                size={"md"}
                required
                name={"password"}
                placeholder="Password"
                type={"password"}
                {...register("password")}
              />
            </VStack>

            <VStack width={"full"}>
              <Button
                w={"full"}
                rightIcon={<ArrowForwardIcon />}
                isLoading={isLoading}
                loadingText={"Logging in..."}
                size="md"
                colorScheme="brand"
                justifyContent={"space-between"}
                variant="solid"
                type="submit"
              >
                Login
              </Button>
              <Flex gap={1}>
                <Text fontSize={"sm"}>Don't have an account?</Text>
                <Link to="/register">
                  <Text fontSize={"sm"} color={"brand.700"}>
                    Sign Up
                  </Text>
                </Link>
              </Flex>
              <Flex gap={1}>
                <Link to="/password-reset">
                  <Text fontSize={"sm"} color={"brand.700"}>
                    Forgot password
                  </Text>
                </Link>
              </Flex>
            </VStack>
          </VStack>
        </form>
      </Container>
    </AuthLayout>
  );
}

export default Login;
