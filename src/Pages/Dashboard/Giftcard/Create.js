import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
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
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";

function Create() {
  const [wallets, setWallets] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const [walletIndex, setWalletIndex] = useState(0);
  const [confetti, setConfitti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [amountMin, setAmountMin] = useState(0.0003);
  const [balance, setBalance] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState();
  const fetchWallets = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}wallets/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data) {
          console.log(response.data);
          setIsLoading(false);
          setBalance(
            response.data[0].info.incoming -
              response.data[walletIndex].info.outgoing
          );
          setWallets(response.data);

          localStorage.setItem("wallets", JSON.stringify(response.data));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
          setAmountMin(2);
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
  const fetchCardTemplates = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}gift_cards/images`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTemplatesLoading(false);
        setTemplates(response.data.results);
        setTemplate({
          link: response.data.results[0].link,
          id: response.data.results[0].id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSubmit = async (data) => {
    data.image = template.id;
    data.amount = parseFloat(data.amount);
    data.quantity = parseInt(data.quantity);
    console.log(data);
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}gift_cards/create/`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        toast({
          title: "Giftcard created, check `My cards to view giftcard`",
          position: "top",
          status: "success",
        });
        setConfitti(true);
        setTimeout(() => {
          setConfitti(false);
        }, 5000);
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
  const handleWindowResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    window.onresize = () => handleWindowResize();
    fetchCardTemplates();
    fetchWallets();
  }, []);
  return (
    <>
      {confetti && (
        <Box width={"full"}>
          <Confetti width={windowSize.width} height={windowSize.height} />
        </Box>
      )}
      <Flex
        width={"full"}
        my={10}
        gap={["20px", "20px", 0]}
        flexWrap={["wrap", "wrap", "nowrap"]}
      >
        <VStack width={"full"} alignItems={"flex-start"} gap={"5"}>
          {templatesLoading ? (
            <Spinner />
          ) : templates.length > 0 ? (
            <Box
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition="5s"
            >
              <Image
                src={`${template.link}`}
                width={["full", "full", "300px"]}
                height={"300px"}
                objectFit={"cover"}
                borderRadius={"10px"}
              />
            </Box>
          ) : (
            "No template"
          )}

          <Text color={"brand.700"} fontSize={"lg"} fontWeight={700}>
            Giftcard Designs
          </Text>
          <SimpleGrid columns={3} spacing="4">
            {templatesLoading ? (
              <Spinner />
            ) : templates.length > 0 ? (
              templates.map((image) => {
                return (
                  <Image
                    key={image.id}
                    src={`${image.link}`}
                    style={{
                      width: "127px",
                      height: "117px",
                      borderRadius: "16px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        image.link === template.link ? "1px solid blue" : "",
                    }}
                    _hover={{ border: "1px solid blue" }}
                    onClick={() => {
                      setTemplate({ link: image.link, id: image.id });
                    }}
                  />
                );
              })
            ) : (
              <Text>No template available</Text>
            )}
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
                  name="amount"
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
                  Create
                </Button>
              </Box>
            </Flex>
          </VStack>
        </form>
      </Flex>
    </>
  );
}

export default Create;
