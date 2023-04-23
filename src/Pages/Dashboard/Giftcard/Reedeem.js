import React, { useState } from "react";
import {
  Container,
  VStack,
  Text,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Reedeem() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleRedeem = async (data) => {
    console.log(data);
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}gift_cards/redeem/`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        toast({ title: "Giftcard Redeemed", status: "success" });
      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response?.status === 400) {
          toast({ title: "Error", status: "error" });
        }
        setIsLoading(false);
      });
  };

  return (
    <Container
      py="52px"
      px="32px"
      color={"brand.700"}
      borderRadius={"2xl"}
      bg={"brand.50"}
      my="10"
    >
      <VStack gap={"5"} alignItems="flex-start">
        <Text>Enter Your Gift Card Code</Text>
        <form onSubmit={handleSubmit(handleRedeem)} style={{ width: "100%" }}>
          <VStack width={"full"} gap={"5"} alignItems="center">
            <Input
              type={"text"}
              borderColor={"brand.700"}
              width="80%"
              placeholder={"6 digit character"}
              size={"lg"}
              bg="bg1"
              required
              minLength={6}
              name="code"
              {...register("code")}
            />
            <Button
              size={"lg"}
              type="submit"
              colorScheme="brand"
              isLoading={isLoading}
            >
              Reedem
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
}

export default Reedeem;
