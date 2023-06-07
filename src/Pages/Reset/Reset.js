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
import { Link, useNavigate } from "react-router-dom";
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
      .post(`${process.env.REACT_APP_BASE_URL}auth/password/reset/`, data)

      .then(function (response) {
        setIsLoading(false);
        toast({
          title: "Check your email to reset your password",
          status: "success",
        });
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        if (error.response?.status === 400) {
          toast({
            title: "Enter a valid email address",
            status: "error",
          });
        } else {
          toast({
            title: "An error occured",
            status: "error",
          });
        }
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
                  type={"email"}
                  required
                  {...register("email", {})}
                />
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
              <Box width={"full"} textAlign={"center"}>
                <Link to={-1}>
                  <Text fontSize={"sm"} color={"brand.700"}>
                    Go back
                  </Text>
                </Link>
              </Box>
            </VStack>
          </VStack>
        </form>
      </Container>
    </AuthLayout>
  );
}

export default Reset;
