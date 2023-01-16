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
  Input,
  Select,
  Box,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
function Create() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const onSubmit = async (data) => {
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
    console.log(data);
  };
  return (
    <Flex width={"full"} my={10}>
      <VStack width={"full"} alignItems={"flex-start"} gap={"5"}>
        <Image src="/assets/images/giftcard-1.png" width={"300px"} />

        <Text color={"brand.700"} fontSize={"lg"} fontWeight={700}>
          Similar
        </Text>
        <SimpleGrid columns={3} spacing="4">
          <Image
            src="/assets/images/giftcard-1.png"
            style={{ width: "127px", height: "117px", borderRadius: "16px" }}
          />
          <Image
            src="/assets/images/giftcard-1.png"
            style={{ width: "127px", height: "117px", borderRadius: "16px" }}
          />
          <Image
            src="/assets/images/giftcard-1.png"
            style={{ width: "127px", height: "117px", borderRadius: "16px" }}
          />
          <Image
            src="/assets/images/giftcard-1.png"
            style={{ width: "127px", height: "117px", borderRadius: "16px" }}
          />
          <Image
            src="/assets/images/giftcard-1.png"
            style={{ width: "127px", height: "117px", borderRadius: "16px" }}
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
          width={"80%"}
          alignItems={"flex-start"}
        >
          <FormControl>
            <FormLabel>Select Currency</FormLabel>
            <Select required name="currency" {...register("currency")}>
              <option value={"usdt"}>USDT</option>
              <option value="btc">BTC</option>
              <option value={"bnb"}>BNB</option>
              <option value={"eth"}>ETH</option>
            </Select>
          </FormControl>
          <VStack gap={"2"} width="full" alignItems="flex-start">
            <FormControl>
              <FormLabel>Enter Amount</FormLabel>
              <Input required type={"number"} min={0} {...register("amount")} />
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
              <Text>0.56btc</Text>
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
