import {
  Container,
  VStack,
  Text,
  Input,
  Button,
  useToast,
  Box,
  Flex,
  Square,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import AuthLayout from "../../Components/AuthLayout";
import { useForm } from "react-hook-form";
import axios from "axios";

import React, { useState } from "react";

function Reset() {
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
      .post(`${process.env.REACT_APP_BASE_URL}auth/password/reset`, data)

      .then(function (response) {
        localStorage.setItem("token", response.data.key);
        console.log(response);
        setIsLoading(false);
        toast({ title: "Login Successful", status: "success" });
        navigate("/change-password");
      })
      .catch(function (error) {
        if (error.response?.data?.non_field_errors) {
          toast({
            title: error.response?.data?.non_field_errors[0],
            status: "error",
          });
          console.log(error.response?.data?.non_field_errors[0]);
        }

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
              Reset Password
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
              <Box width={"full"}>
                <Input
                  minLength={3}
                  name="otp"
                  size={"md"}
                  placeholder={"0000"}
                  type={"number"}
                  required
                  {...register("otp", {})}
                />
                <Flex>
                  <Square></Square>
                  <Square></Square>
                  <Square></Square>
                  <Square></Square>
                  <Square></Square>
                  <Square></Square>
                </Flex>
                <Text color="red" fontSize={"xs"}>
                  {errors.email?.message}
                </Text>
              </Box>
            </VStack>

            <VStack width={"full"}>
              <Button
                w={"full"}
                rightIcon={<ArrowForwardIcon />}
                isLoading={isLoading}
                loadingText={"Submitting"}
                size="md"
                colorScheme="brand"
                justifyContent={"space-between"}
                variant="solid"
                type="submit"
              >
                Reset
              </Button>
            </VStack>
          </VStack>
        </form>
      </Container>
    </AuthLayout>
  );
}

export default Reset;
