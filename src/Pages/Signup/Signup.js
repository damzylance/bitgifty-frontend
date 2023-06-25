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
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowForwardIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import AuthLayout from "../../Components/AuthLayout";
import React, { useRef, useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const toast = useToast();
  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}auth/registration/`, data)
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        toast({
          title:
            "Registration Successful, check your email to verify your account",
          status: "success",
        });
        setSuccess(true);

        navigate("/login");
      })
      .catch(function (error) {
        if (error.response?.status === 400) {
          if (error.response?.data?.email) {
            toast({ title: "User with email already exist", status: "error" });
          }
          if (error.response?.data?.username) {
            toast({
              title: "User with username already exist",
              status: "error",
            });
          }
        }

        console.log(error);
        setIsLoading(false);
      });
    console.log(data);
  };
  const password = useRef({});
  password.current = watch("password1", "");
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
        {success ? (
          <VStack width={"full"} justifyContent={"center"}>
            <CheckCircleIcon fontSize={"70px"} color={"brand.500"} />
            <Text textAlign={"center"}>
              Registration Successful, check your email to verify your account
            </Text>
          </VStack>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={"10"} w="full" alignItems={"flex-start"}>
              <Text color={"brand.700"} fontSize={"xl"} fontWeight={"700"}>
                Create New Account
              </Text>
              <VStack w={"full"} gap={"2"}>
                {/* <Box width={"full"}>
                <Input
                  minLength={5}
                  maxLength={150}
                  name="username"
                  size={"md"}
                  placeholder={"Enter preferred username"}
                  required
                  type={"text"}
                  {...register("username", {
                    minLength: { value: 5, message: "Minimum character is 5" },
                  })}
                />
                <Text color={"red.400"} fontSize={"xs"}>
                  {errors.username?.message}
                </Text>
              </Box> */}
                <Box width={"full"}>
                  <Input
                    name="email"
                    size={"md"}
                    placeholder={"Enter your email"}
                    required
                    type={"email"}
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Provide a valid email address",
                      },
                    })}
                  />
                  <Text color={"red.400"} fontSize={"xs"}>
                    {errors.email?.message}
                  </Text>
                </Box>
                {/* <Box width={"full"}>
                <InputGroup>
                  <InputLeftAddon children="+234" />
                  <Input
                    name="phone_number"
                    required
                    size={"md"}
                    placeholder="Phone Number "
                    type={"number"}
                    {...register("phone_number", {
                      minLength: { value: 10, message: "invalid format" },
                      maxLength: { value: 11, message: "invalid format" },
                    })}
                    error={errors.phone_number}
                  />
                </InputGroup>
                <Text fontSize={"xs"}>{errors.phone_number?.message}</Text>
              </Box> */}

                {/* <Select
                size={"md"}
                name="country"
                placeholder="Select Country"
                {...register("country")}
                required
              >
                <option value={"nigeria"}>Nigeria</option>
              </Select> */}
                <Box width={"full"}>
                  <InputGroup>
                    <Input
                      size={"md"}
                      name="password1"
                      placeholder="Password"
                      {...register("password1", {
                        minLength: {
                          value: 8,
                          message: "Must contain at least 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                          message:
                            "Password must contain, one uppercase, number and a special character",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      required
                      error={errors.password1}
                    />

                    <InputRightElement
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <RxEyeClosed color="blue" cursor={"pointer"} />
                      ) : (
                        <RxEyeOpen color="blue" cursor={"pointer"} />
                      )}
                    </InputRightElement>
                  </InputGroup>

                  <Text color={"red.400"} fontSize={"xs"}>
                    {errors.password1?.message}
                  </Text>
                </Box>
                <Box width={"full"}>
                  <InputGroup>
                    <Input
                      name="password2"
                      size={"md"}
                      placeholder="Confirm Password"
                      {...register("password2", {
                        validate: (value) =>
                          value === password.current ||
                          "The passwords do not match",
                      })}
                      error={errors.password2}
                      required
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <RxEyeClosed color="blue" cursor={"pointer"} />
                      ) : (
                        <RxEyeOpen color="blue" cursor={"pointer"} />
                      )}
                    </InputRightElement>
                  </InputGroup>

                  <Text color={"red.400"} fontSize={"xs"}>
                    {errors.password2?.message}
                  </Text>
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
                  Register
                </Button>
                <Flex gap={1}>
                  <Text fontSize={"sm"}>Already have an account?</Text>
                  <Link to="/login">
                    <Text fontSize={"sm"} color={"brand.700"}>
                      Login
                    </Text>
                  </Link>
                </Flex>
              </VStack>
            </VStack>
          </form>
        )}
      </Container>
    </AuthLayout>
  );
}

export default Signup;
