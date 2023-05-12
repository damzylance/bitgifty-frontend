import {
  Container,
  VStack,
  Text,
  Input,
  Select,
  Button,
  Flex,
  InputGroup,
  InputLeftAddon,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import AuthLayout from "../../Components/AuthLayout";
import React, { useRef, useState } from "react";

function PasswordResetConFirm() {
  const params = useParams();
  const uid = params.uid;
  const token = params.token;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const toast = useToast();
  const onSubmit = async (data) => {
    data.token = token;
    data.uid = uid;
    console.log(data);
    setIsLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}auth/password/reset/confirm/`,
        data
      )
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        toast({ title: "Password reset successful", status: "success" });
        navigate("/login");
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
        if (error.response.status === 400) {
          toast({ title: "Invalid credentials", status: "error" });
        } else {
          toast({ title: "An error occured", status: "error" });
        }
      });
  };
  const new_password1 = useRef({});
  new_password1.current = watch("new_password1", "");
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
              Change Password
            </Text>
            <VStack w={"full"} gap={"2"}>
              <Box width={"full"}>
                <Input
                  size={"md"}
                  name="new_password1"
                  placeholder="New Password"
                  {...register("new_password1", {
                    minLength: "8",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                      message:
                        "Password must contain, one uppercase, number and a special character",
                    },
                  })}
                  type={"password"}
                  required
                  error={errors.new_password1}
                />
                <Text fontSize={"xs"}>{errors.new_password1?.message}</Text>
              </Box>
              <Box width={"full"}>
                <Input
                  name="new_password2"
                  size={"md"}
                  placeholder="Confirm New Password"
                  {...register("new_password2", {
                    validate: (value) =>
                      value === new_password1.current ||
                      "The passwords do not match",
                  })}
                  error={errors.new_password2}
                  required
                  type={"password"}
                />
                <Text fontSize={"xs"}>{errors.new_password2?.message}</Text>
              </Box>
            </VStack>
            <VStack width={"full"}>
              <Button
                isLoading={isLoading}
                loadingText={"Submitting"}
                type="submit"
                w={"full"}
                rightIcon={<ArrowForwardIcon />}
                size="md"
                colorScheme="brand"
                justifyContent={"space-between"}
                variant="solid"
              >
                Change Password
              </Button>
            </VStack>
          </VStack>
        </form>
      </Container>
    </AuthLayout>
  );
}

export default PasswordResetConFirm;
