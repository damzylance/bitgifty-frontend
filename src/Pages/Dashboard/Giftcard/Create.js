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
  Checkbox,
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
    getValues,
  } = useForm();
  const toast = useToast();
  const [walletIndex, setWalletIndex] = useState(0);
  const [confetti, setConfitti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const options = {
    headers: { "x-api-key": process.env.REACT_APP_RATE_KEY },
  };

  const [fee, setFee] = useState(0);
  const [amountMin, setAmountMin] = useState(0.0003);
  const [balance, setBalance] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState();
  const [checkEmail, setCheckEmail] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
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
          const entries = Object.entries(response.data);
          console.log(entries);
          setIsLoading(false);

          if (entries[0][0] === "Celo") {
            setBalance(entries[0][1].info.celo);
            setFee(2);
          } else if (entries[0][0] === "Ethereum") {
            setBalance(entries[0][1].info.balance);
            setFee(0.0004);
          } else if (entries[0][0] === "Tron") {
            setBalance(entries[0][1].info.balance);
            setFee(2);
          } else if (entries[0][0] === "Bitcoin") {
            setBalance(
              entries[0][1].info.incoming - entries[0][1].info.outgoing
            );
            setFee(0.0008);
          } else if (entries[0][0] === "Bnb") {
            setBalance(0);
            setFee(0.0005);
          }
          setWallets(entries);
          localStorage.setItem("wallets", JSON.stringify(entries));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCurrencyChange = async (e) => {
    const network = `${e.target.value
      .slice(0, 1)
      .toUpperCase()}${e.target.value.slice(1, e.target.value.length)}`;
    for (let index = 0; index < wallets.length; index++) {
      if (wallets[index][0] === network) {
        const btcBalance =
          wallets[index][1].info.incoming - wallets[index][1].info.outgoing;
        setBalance(isNaN(btcBalance) ? 0 : btcBalance);
        if (network === "Bitcoin") {
          await axios
            .post(
              "https://api.tatum.io/v3/tatum/rate/",
              [{ batchId: "one", basePair: "USD", currency: "BTC" }],
              options
            )
            .then((response) => {
              setAmountMin(
                parseFloat(100.0 / parseFloat(response.data[0].value))
              );
              setFee(0.0008);
              setTotalAmount(parseFloat(getValues("amount")) + 0.0008);
            })
            .catch((errors) => {
              console.log(errors);
            });
        } else if (network === "Celo") {
          setBalance(wallets[index][1].info.celo);
          setFee(2);
          setAmountMin(10);
          setTotalAmount(parseFloat(getValues("amount")) + fee);
        } else if (network === "Ethereum") {
          setAmountMin(0.003);
          setBalance(wallets[index][1].info.balance);
          setFee(0.0004);
          setTotalAmount(parseFloat(getValues("amount")) + fee);
        } else if (network === "Tron") {
          const tronBalance = wallets[index][1].info.balance / 1000000;
          setFee(2);
          setBalance(isNaN(tronBalance) ? 0 : tronBalance);
          setAmountMin(5);
          setTotalAmount(parseFloat(getValues("amount")) + fee);
        } else if (network === "Bnb") {
          setBalance(0);
          setFee(0.0005);
          setAmountMin(0.02);
          setTotalAmount(parseFloat(getValues("amount")) + fee);
        }
      }
      setTotalAmount(parseFloat(getValues("amount")) + fee);
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
    data.amount = parseFloat(data.amount) + fee;
    data.quantity = 1;
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
                    <option value={wallet[0].toLowerCase()} key={index}>
                      {wallet[0]}
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
                    onChange: (e) =>
                      setTotalAmount(parseFloat(e.target.value) + fee),
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
              {/* <Flex
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
              </Flex> */}
              <Flex color="brand.300" gap={2}>
                <Text>Wallet Balance:</Text>
                <Text>{balance}</Text>
              </Flex>
            </VStack>

            <FormControl>
              <FormLabel>Note (optional)</FormLabel>
              <Textarea
                name="note"
                background={"brand.50"}
                {...register("note")}
              />
            </FormControl>

            <Checkbox onChange={() => setCheckEmail(!checkEmail)}>
              Send to receipent email
            </Checkbox>
            {checkEmail ? (
              <FormControl>
                <FormLabel>Receipent Email</FormLabel>
                <Input
                  placeholder="friend@mail.com"
                  type="email"
                  name="note"
                  required
                  background={"brand.50"}
                  {...register("receipent_email")}
                />
              </FormControl>
            ) : (
              ""
            )}

            <Flex width={"full"} justifyContent="space-between">
              <VStack width={"full"} alignItems="flex-start">
                <Flex width={"full"} justifyContent={"space-between"}>
                  <Text fontSize={"xs"}>Fees</Text>
                  <Text fontSize={"xs"}>{fee}</Text>
                </Flex>
                <Flex width={"full"} justifyContent={"space-between"}>
                  <Text fontSize={"s"}>Total Amount</Text>
                  <Text fontSize={"s"}>
                    {" "}
                    {isNaN(totalAmount) ? 0 : totalAmount}
                  </Text>
                </Flex>
              </VStack>
              <Box textAlign={"right"} width={"full"}>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  size={"lg"}
                  colorScheme={"brand"}
                >
                  Create {checkEmail && ` & Send`}
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
