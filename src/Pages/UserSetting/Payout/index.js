import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import SettingsLayout from "../SettingsLayout";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { AiFillPlusSquare } from "react-icons/ai";
import axios from "axios";
const Payout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const closeModal = () => {
    onClose();
    fetchBankAccounts();
  };
  const [bankAccount, setBankAccount] = useState(null);

  const fetchBankAccounts = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}wallets/naira/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBankAccount(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchBankAccounts();
  }, []);

  return (
    <SettingsLayout>
      <VStack width={"full"} gap={"20px"}>
        <Text fontSize={"xl"} fontWeight={"bold"} mt={5}>
          Payment/Withdrawal Methods
        </Text>
        <Container width={["full", "full", "80%", "70%"]}>
          <VStack gap={2} alignItems={"flex-start"}>
            <Text fontSize={"md"} color={"gray.700"}>
              Add Payment Method
            </Text>
            {loading ? (
              <Spinner />
            ) : bankAccount ? (
              <VStack
                width="full"
                gap={"10px"}
                p={"20px"}
                borderRadius={"lg"}
                border={"1px solid #90d4e4"}
                alignItems={"flex-start"}
              >
                <Text
                  pl={"10px"}
                  lineHeight={"100%"}
                  color={"gray.600"}
                  fontWeight={"semibold"}
                  borderLeft={"2px solid #477FEB "}
                >
                  {bankAccount.bank_name}
                </Text>
                <HStack
                  width={"full"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Text color={"gray.500"}>{bankAccount.account_name}</Text>
                  <Text color={"gray.500"}>{bankAccount.account_number}</Text>
                </HStack>
              </VStack>
            ) : (
              <Text fontSize={"md"} color={"gray.700"}>
                You don't have a payment method. Please set one
              </Text>
            )}
            {}

            <HStack
              width={"full"}
              border={"1px solid"}
              borderColor={"gray.300"}
              justifyContent={"space-between"}
              alignItems={"center"}
              padding={"20px"}
              borderRadius={"xl"}
            >
              <Text
                pl={"10px"}
                lineHeight={"100%"}
                color={"gray.600"}
                fontWeight={"semibold"}
                borderLeft={"2px solid #477FEB "}
              >
                Bank Transfer
              </Text>
              <AiFillPlusSquare
                color={"#103D96"}
                fontSize={"24px"}
                onClick={() => {
                  onOpen();
                }}
              />
            </HStack>
          </VStack>
        </Container>
        <PayoutModal isOpen={isOpen} onClose={closeModal} />
      </VStack>
    </SettingsLayout>
  );
};

const PayoutModal = (props) => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const [isloading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}wallets/naira/`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        toast({
          title: "Bank added successfully",
          status: "success",
        });
      })
      .catch(function (error) {
        if (error.response?.status === 400) {
          if (error.response?.data?.email) {
            toast({ title: "An error occured", status: "error" });
          }
        }

        console.log(error);
        setIsLoading(false);
      });
    console.log(data);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent py={"40px"}>
        <ModalHeader textAlign={"center"}>Set Payment Method</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack width={"full"} alignItems={"flex-start"} gap={"20px"}>
            <Text
              pl={"10px"}
              lineHeight={"100%"}
              color={"gray.600"}
              fontWeight={"semibold"}
              borderLeft={"2px solid #477FEB "}
            >
              Bank Transfer
            </Text>
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <VStack width={"full"} gap={"10px"} color={"gray.600"}>
                <FormControl>
                  <FormLabel>Account Name</FormLabel>
                  <Input
                    name="account_name"
                    {...register("account_name")}
                    required
                    placeholder={"John Doe"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Account Number</FormLabel>
                  <Input
                    name="number"
                    {...register("account_number")}
                    required
                    type="number"
                    minLength={"10"}
                    maxLength={"10"}
                    placeholder={"Account Number"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Bank name</FormLabel>
                  <Input
                    name="bank_name"
                    {...register("bank_name")}
                    required
                    placeholder={"Bank Name"}
                  />
                </FormControl>
              </VStack>
              <HStack width={"full"} mt={"40px"}>
                <Button
                  background={"gray.400"}
                  width={"full"}
                  size={"lg"}
                  _hover={{ bg: "gray.600" }}
                  onClick={props.onClose}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isloading}
                  width={"full"}
                  size={"lg"}
                  type="submit"
                >
                  Confirm
                </Button>
              </HStack>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Payout;
