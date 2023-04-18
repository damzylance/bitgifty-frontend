import React, { useState } from "react";
import {
  Button,
  Flex,
  VStack,
  Image,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Box,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";

function Create() {
  const wallets = JSON.parse(localStorage.getItem("wallets"));
  const [walletIndex, setWalletIndex] = useState(0);
  const [amountMin, setAmountMin] = useState(0.0003);
  const [balance, setBalance] = useState(
    wallets[0].info.incoming - wallets[walletIndex].info.outgoing
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleCurrencyChange = (e) => {
    const network = `${e.target.value
      .slice(0, 1)
      .toUpperCase()}${e.target.value.slice(1, e.target.value.length)}`;
    console.log(network);
    for (let index = 0; index < wallets.length; index++) {
      if (wallets[index].network === network) {
        if (wallets[index].network === "Bitcoin") {
          setBalance(
            wallets[index].info.incoming - wallets[index].info.outgoing
          );
          setAmountMin(0.0003);
        } else if (wallets[index].network === "Celo") {
          setBalance(wallets[index].info.celo);
          setAmountMin(5);
        } else if (wallets[index].network === "Ethereum") {
          setAmountMin(0.003);
          setBalance(wallets[index].info.balance);
        } else if (wallets[index].network === "Tron") {
          setBalance(wallets[index].info.balance / 1000000);
          setAmountMin(5);
        }
      }
    }
  };
  const onSubmit = async (data) => {
    data.fees = 0.02 * data.amount;
    console.log(data);
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}gift_cards/`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        toast({ title: "Registration Successful", status: "success" });
      })
      .catch(function (error) {
        if (error.response?.status === 400) {
          console.log(error.response.status);

          toast({ title: "Error", status: "error" });
        }

        console.log(error);
        setIsLoading(false);
      });
  };
  return (
    <Flex
      width={"full"}
      my={10}
      gap={["20px", "20px", 0]}
      flexWrap={["wrap", "wrap", "nowrap"]}
    >
      <VStack width={"full"} alignItems={"flex-start"} gap={"5"}>
        <Box
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition="1s"
        >
          <Image
            src="/assets/images/giftcard-2.jpg"
            width={["full", "full", "300px"]}
            height={"300px"}
            objectFit={"cover"}
            borderRadius={"10px"}
          />
        </Box>

        <Text color={"brand.700"} fontSize={"lg"} fontWeight={700}>
          Giftcard Designs
        </Text>
        <SimpleGrid columns={3} spacing="4">
          <Image
            src="/assets/images/giftcard-1.png"
            style={{
              width: "127px",
              height: "117px",
              borderRadius: "16px",
              objectFit: "cover",
            }}
          />
          <Image
            src="/assets/images/giftcard-2.jpg"
            style={{
              width: "127px",
              height: "117px",
              borderRadius: "16px",
              objectFit: "cover",
            }}
          />
          <Image
            src="/assets/images/giftcard-1.png"
            style={{ width: "127px", height: "117px", borderRadius: "16px" }}
          />
          <Image
            src="/assets/images/giftcard-3.jpg"
            style={{
              width: "127px",
              height: "117px",
              borderRadius: "16px",
              objectFit: "cover",
            }}
          />
          <Image
            src="/assets/images/giftcard-4.jpg"
            style={{
              width: "127px",
              height: "117px",
              borderRadius: "16px",
              objectFit: "cover",
            }}
          />
          <Image
            src="/assets/images/giftcard-1.png"
            sx={{ width: "127px", height: "117px", borderRadius: "16px" }}
          />
        </SimpleGrid>
      </VStack>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%" }}
      >
        <VStack
          color={"brand.600"}
          gap="10"
          width={["full", "full", "80%"]}
          alignItems={"flex-start"}
        >
          <FormControl>
            <FormLabel>Select Currency</FormLabel>
            <Select
              required
              name="currency"
              {...register("currency", { onChange: handleCurrencyChange })}
            >
              {wallets.map((wallet, index) => {
                return (
                  <option value={wallet.network.toLowerCase()} key={index}>
                    {wallet.network}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <VStack gap={"2"} width="full" alignItems="flex-start">
            <FormControl isInvalid={errors.amount}>
              <FormLabel>Enter Amount</FormLabel>
              <Input
                required
                type={"number"}
                {...register("amount", {
                  max: { value: balance, message: "Insufficient funds" },
                  min: {
                    value: amountMin,
                    message: `Minimum amount is ${amountMin}`,
                  },
                })}
              />
              <FormErrorMessage>
                {errors.amount && errors.amount.message}
              </FormErrorMessage>
            </FormControl>
            <Flex
              justifyContent={"space-between"}
              width="full"
              color={"brand.tx1"}
            >
              <Box
                sx={{
                  py: "12px",
                  px: "24px",
                  textAlign: "center",
                  bg: "brand.200",
                  borderRadius: "4px",
                }}
              >
                25%
              </Box>
              <Box
                sx={{
                  py: "12px",
                  px: "24px",
                  textAlign: "center",
                  bg: "brand.200",
                  borderRadius: "4px",
                }}
              >
                50%
              </Box>
              <Box
                sx={{
                  py: "12px",
                  px: "24px",
                  textAlign: "center",
                  bg: "brand.200",
                  borderRadius: "4px",
                }}
              >
                75%
              </Box>
              <Box
                sx={{
                  py: "12px",
                  px: "24px",
                  textAlign: "center",
                  bg: "brand.200",
                  borderRadius: "4px",
                }}
              >
                100%
              </Box>
            </Flex>
            <Flex color="brand.300" gap={2}>
              <Text>Wallet Balance:</Text>
              <Text>{balance}</Text>
            </Flex>
          </VStack>
          <FormControl>
            <FormLabel>Enter Quantity</FormLabel>
            <Input
              type={"number"}
              name={"quantity"}
              min={1}
              required
              {...register("quantity")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Note (optional)</FormLabel>
            <Textarea
              name="note"
              background={"brand.50"}
              {...register("note")}
            />
          </FormControl>
          <Flex width={"full"} justifyContent="space-between">
            <VStack width={"full"} alignItems="flex-start">
              <Flex width={"full"} justifyContent={"space-between"}>
                <Text fontSize={"xs"}>Fees</Text>
                <Text fontSize={"xs"}>0</Text>
              </Flex>
              <Flex width={"full"} justifyContent={"space-between"}>
                <Text fontSize={"s"}>Total Amount</Text>
                <Text fontSize={"s"}>0.12</Text>
              </Flex>
            </VStack>
            <Box textAlign={"right"} width={"full"}>
              <Button
                isLoading={isLoading}
                type="submit"
                size={"lg"}
                colorScheme={"brand"}
              >
                Buy
              </Button>
            </Box>
          </Flex>
        </VStack>
      </form>
    </Flex>
  );
}

export default Create;
