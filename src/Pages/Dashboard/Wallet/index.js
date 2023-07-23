import {
  Button,
  Container,
  Flex,
  Input,
  Text,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  useToast,
  Spinner,
  HStack,
  Image,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/DashboardLayout";
import Authenticate from "../../../Helpers/Auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

function Wallet() {
  const [rates, setRates] = useState([]);
  const balances = [];
  // const [walletBalances, setWalletBalances] = useState([]);
  // let urls = [
  //   `https://api.tatum.io/v3/tatum/rate/BTC`,
  //   `https://api.tatum.io/v3/tatum/rate/CELO`,
  //   `https://api.tatum.io/v3/tatum/rate/USDT`,
  // ];
  // const options = {
  //   headers: { "x-api-key": "b04e15d2-f32b-4c6b-a4d5-20c203c7cf80" },
  // };
  // const fetchRates = async () => {
  //   await axios
  //     .all([
  //       axios.get(
  //         "https://api.tatum.io/v3/tatum/rate/BTC?basePair=USD",
  //         options
  //       ),
  //       axios.get(
  //         "https://api.tatum.io/v3/tatum/rate/CELO?basePair=USD",
  //         options
  //       ),
  //       axios.get(
  //         "https://api.tatum.io/v3/tatum/rate/USDT?basePair=USD",
  //         options
  //       ),
  //     ])
  //     .then(
  //       axios.spread(async (data1, data2, data3) => {
  //         const toFloat = (item) => {
  //           parseFloat(item);
  //         };
  //         // output of req.
  //         setRates([data1.data.value, data2.data.value, data3.data.value]);
  //       })
  //     );
  // };

  // const dollarBalance = async (coin) => {
  //   await axios
  //     .get(`https://api.tatum.io/v3/tatum/rate/${coin}`, options)
  //     .then((response) => {
  //       const usdValue = response.data.value;
  //       setRates(...rates, usdValue);
  //     });
  // };
  const data = {
    labels: ["BTC", "ETH", "BNB", "CELO", "USDT", "CUSD"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 255, 251, 0.8)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [wallets, setWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}wallets/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        const entries = Object.entries(response.data);

        if (response.data) {
          setIsLoading(false);
          setWallets(entries);

          for (let index = 0; index < entries.length; index++) {
            const coinWallet = entries[index];
            if (coinWallet[0] === "Bitcoin") {
              balances.push({
                btc: coinWallet[1].info.incoming - coinWallet[1].info.outgoing,
              });
            } else if (coinWallet[0] === "Bnb") {
              balances.push({ bnb: 0 });
            } else if (coinWallet[0] === "Celo") {
              balances.push({ celo: coinWallet[1].info.celo });
            } else if (coinWallet[0] === "Ethereum") {
              balances.push({ eth: coinWallet[1].info.balance });
            } else if (coinWallet[0] === "Tron") {
              balances.push({ tron: coinWallet[1].info.balance / 1000000 });
            }
          }
          console.log(balances);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // fetchRates();
  }, []);
  console.table(rates);
  return (
    <DashboardLayout>
      <VStack gap={"10"} width="full" scrollBehavior={"smooth"}>
        <Container
          background={"brand.600"}
          py={"4"}
          border={"1px solid #A3BFF5"}
          borderRadius={"12px"}
          maxWidth="400px"
          position={"relative"}
          backgroundImage={"assets/images/waves.svg"}
          bgSize={"cover"}
        >
          <VStack
            position={"relative"}
            alignItems={"flex-start"}
            gap={0}
            justifyContent={"flex-start"}
            width={"full"}
          >
            <Text
              fontStyle={"italic"}
              color={"whiteAlpha.900"}
              fontSize={"lg"}
              fontWeight={"600"}
            >
              Total Balance
            </Text>

            <HStack
              width={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <VStack gap={"4"} alignItems={"flex-start"}>
                <Text
                  fontSize={"2xl"}
                  fontWeight={"900"}
                  color={"whiteAlpha.900"}
                >
                  0 CUSD
                </Text>
                <Text
                  color={"whiteAlpha.800"}
                  fontSize={"2xl"}
                  fontWeight={"900"}
                >
                  $0
                </Text>
              </VStack>
              <Box width={"150px"}>
                {" "}
                <Doughnut options={chartOptions} data={data} />
              </Box>
            </HStack>
          </VStack>
        </Container>
        <VStack
          alignItems={"flex-start"}
          width="full"
          gap={"10"}
          px={["10px", "10px", "none"]}
        >
          <VStack alignItems={"flex-start"} width="full" gap={"2"}>
            <Flex
              justifyContent={"space-between"}
              display={["none", "none", "flex", "flex"]}
              width={"full"}
              bg={"brand.600"}
              py="2"
              px={"2"}
              color={"brand.bg1"}
              borderRadius={"md"}
            >
              <Text>Assets</Text>
              <Text>Balance</Text>
              <Text>Action</Text>
            </Flex>
            {/* <VStack
              width={"full"}
              alignContent="flex-start"
              gap={"2"}
              borderBottom={"1px solid #A3BFF5"}
              pb="4"
            >
              <Text
                borderBottom={"1px solid #A3BFF5"}
                border
                width={"full"}
                py={"1"}
                color={"brand.700"}
                fontWeight="bold"
              >
                Fiat
              </Text>
              <VStack width={"full"} gap={"2"} alignContent="flex-start">
                <CoinRow currency={"NGN"} amount={5000} />
                <CoinRow currency={"GHC"} amount={5000} />
              </VStack>
            </VStack> */}
            <VStack
              width={"full"}
              alignContent="flex-start"
              gap={"2"}
              borderBottom={"1px solid #A3BFF5"}
              pb="4"
            >
              <Text
                borderBottom={"1px solid #A3BFF5"}
                border
                width={"full"}
                py={"1"}
                color={"brand.700"}
                fontWeight="bold"
              >
                Coins
              </Text>
              <VStack width={"full"} gap={"2"} alignContent="flex-start">
                {isLoading ? (
                  <Spinner />
                ) : (
                  wallets.map((wallet, index) => {
                    // const { address, network } = wallet;
                    const coinWallet = wallet;
                    let balance;
                    if (coinWallet[0] === "Bitcoin") {
                      balance =
                        coinWallet[1].info.incoming -
                        coinWallet[1].info.outgoing;
                      balances.push({ bitcoin: balance });
                    } else if (coinWallet[0] === "Bnb") {
                      balance = 0;
                    } else if (coinWallet[0] === "Celo") {
                      balance = coinWallet[1].info.celo;
                    } else if (coinWallet[0] === "Ethereum") {
                      balance = coinWallet[1].info.balance;
                    } else if (coinWallet[0] === "Tron") {
                      balance = coinWallet[1].info.balance / 1000000;
                    }
                    return (
                      <CoinRow
                        key={index}
                        currency={coinWallet[0].toUpperCase()}
                        address={coinWallet[1].address}
                        amount={isNaN(balance) ? 0 : balance}
                        network={coinWallet[0]}
                        qr={coinWallet[1].qrcode}
                      />
                    );
                  })
                )}
              </VStack>
            </VStack>
          </VStack>

          {/* <WithdrawModal isOpen={isOpen} onClose={onClose} /> */}
        </VStack>
      </VStack>
    </DashboardLayout>
  );
}

function CoinRow(props) {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState("deposit");
  return (
    <Flex
      width={"full"}
      gap="2"
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDir={["column", "column", "row"]}
      background={"#fff"}
      padding={"20px 10px"}
      borderRadius={"10px"}
      boxShadow={"0px 2px 8px rgba(199, 199, 199, 0.6)"}
    >
      <HStack width={"full"} justifyContent="space-between">
        <Text>{props.currency}</Text>
        <Text ml={["", "", "150px"]}>{props.amount}</Text>
      </HStack>

      <HStack
        width={"full"}
        gap={["0", "0", "4"]}
        justifyContent={["space-between", "space-between", "flex-end"]}
      >
        <Button
          onClick={() => {
            setPage("withdraw");
            onOpen();
          }}
        >
          Withdraw
        </Button>
        <Button
          onClick={() => {
            setPage("deposit");
            onOpen();
          }}
          variant={"outline"}
        >
          Deposit
        </Button>
        <Button
          onClick={() => {
            setPage("swap");
            onOpen();
          }}
          variant={"outline"}
        >
          Swap
        </Button>
        <Button
          onClick={() => {
            navigate(`/coin-details/${props.currency.toLowerCase()}`);
          }}
          variant={"outline"}
        >
          History
        </Button>
      </HStack>
      <WalletModal
        isOpen={isOpen}
        onClose={onClose}
        page={page}
        address={props.address}
        network={props.network}
        qr={props.qr}
      />
    </Flex>
  );
}
const WalletModal = (props) => {
  const btnRef = React.useRef();
  const { register, handleSubmit } = useForm();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [floatAmount, setFloatAmount] = useState("");
  const [errors, setErrors] = useState([]);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      finalFocusRef={btnRef}
      size={"md"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {props.page === "deposit" && (
          <>
            {" "}
            <DrawerHeader color={"brand.700"} textAlign={"center"}>
              {props.network} Wallet Address (
              {props.network === "Celo"
                ? "Celo Network"
                : props.network === "Ethereum"
                ? "ERC 20"
                : props.network === "Tron"
                ? "TRC 20"
                : props.network === "Bnb"
                ? "Binance Chain"
                : "Bitcoin"}
              )
            </DrawerHeader>
            <DrawerBody>
              <Box textAlign={"center"} mt={"40px"}>
                <VStack>
                  <Image src={props.qr} />
                  <Text
                    fontSize={["sm", "md", "lg"]}
                    color={"brand.500"}
                    fontWeight={"bold"}
                  >
                    {props.address}
                  </Text>
                  <Text fontSize={"s"}>
                    Copy wallet address to deposit coin
                  </Text>
                </VStack>
              </Box>{" "}
            </DrawerBody>
          </>
        )}

        {props.page === "withdraw" && (
          <>
            <DrawerHeader color={"brand.700"} textAlign={"center"}>
              Withdraw {props.network}
            </DrawerHeader>
            <DrawerBody>
              <Box width={"full"} textAlign={"center"} mt={"100px"}>
                <form
                  onSubmit={handleSubmit(async (data) => {
                    data.amount = floatAmount;
                    data.network = props.network;
                    if (errors.length > 0) {
                      console.log("error");
                    } else {
                      setIsLoading(true);
                      console.log(data);
                      await axios
                        .post(
                          `${process.env.REACT_APP_BASE_URL}withdraw/`,
                          data,
                          {
                            headers: {
                              Authorization: `Token ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }
                        )
                        .then(function (response) {
                          console.log(response);
                          setIsLoading(false);
                          toast({
                            title: "Withdrawal Successful",
                            status: "success",
                          });
                        })
                        .catch(function (error) {
                          setIsLoading(false);
                          toast({
                            title: "An error occured",
                            status: "warning",
                          });
                          console.log(error);
                        });
                    }
                  })}
                  style={{ width: "100%" }}
                >
                  <VStack gap={"20px"}>
                    {/* <Input
                      name="amount"
                      type={"text"}
                      placeholder="Amount"
                      {...register("amount", {
                        onChange: (e) => {
                          console.log(e.target.value.toLocaleString("en-US"));
                        },
                      })}
                      required
                    /> */}
                    <Box width={"full"}>
                      <NumericFormat
                        value={withdrawAmount}
                        placeholder="Amount"
                        required
                        allowLeadingZeros
                        thousandSeparator=","
                        style={{
                          width: "100%",
                          outline: "2px solid transparent",
                          border: "1px solid #e2e8f0",
                          padding: "6px 14px",
                          borderRadius: "5px",
                        }}
                        onChange={(e) => {
                          let amount = e.target.value;
                          let toFloatAmount;
                          toFloatAmount = parseFloat(
                            amount.replaceAll(",", "")
                          ).toFixed(7);
                          if (props.network === "Bitcoin") {
                            let btcErrors = [];

                            console.log("error", toFloatAmount);
                            if (toFloatAmount < 0.0005) {
                              alert();
                              btcErrors.push("Minimum withdrawal is 0.0005 ");
                              setErrors(btcErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(toFloatAmount.toString());
                            }
                          } else if (props.network === "Celo") {
                            let coinErrors = [];
                            if (toFloatAmount < 2) {
                              coinErrors.push("Minimum withdrawal is 2");
                              setErrors(coinErrors);
                              console.log(coinErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(toFloatAmount.toString());
                            }
                          } else if (props.network === "Tron") {
                            let coinErrors = [];
                            if (toFloatAmount < 2) {
                              coinErrors.push("Minimum withdrawal is 2  ");
                              setErrors(coinErrors);
                              console.log(coinErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(toFloatAmount.toString());
                            }
                          } else if (props.network === "Bnb") {
                            let coinErrors = [];
                            if (toFloatAmount < 0.002) {
                              coinErrors.push("Minimum withdrawal is 0.002  ");
                              setErrors(coinErrors);
                              console.log(coinErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(toFloatAmount);
                            }
                          } else if (props.network === "Ethereum") {
                            let coinErrors = [];
                            if (toFloatAmount < 0.001) {
                              coinErrors.push("Minimum withdrawal is 0.001  ");
                              setErrors(coinErrors);
                              console.log(coinErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(toFloatAmount.toString());
                            }
                          }
                        }}
                      />
                      <Box textAlign={"left"}>
                        {errors.length > 0 && (
                          <Text my={"2"} color={"red"} fontSize={"xs"}>
                            {errors[0]}
                          </Text>
                        )}
                      </Box>
                    </Box>
                    <Input
                      name="receiver_address"
                      placeholder="Receiver address"
                      {...register("receiver_address")}
                      required
                    />

                    <Button width={"full"} isLoading={isLoading} type="Submit">
                      {" "}
                      Send
                    </Button>
                  </VStack>
                </form>
                {/* <Input
                  required
                  value={withdrawAmount}
                  onChange={(e) => {
                    let amount = e.target.value.split("");

                    for (let index = 0; index < amount.length; index++) {
                      const element = amount[index];
                      if (isNaN(element)) {
                        amount.pop(element);
                      }
                    }
                    console.log(amount);
                    let joinedAmount = amount.join("");
                    if (!isNaN(joinedAmount)) {
                      setWithdrawAmount(parseFloat(joinedAmount));
                    } else setWithdrawAmount(0);

                    console.log(withdrawAmount);
                  }}
                /> */}
              </Box>
            </DrawerBody>
          </>
        )}
        {props.page === "swap" && (
          <>
            <DrawerHeader color={"brand.700"} textAlign={"center"}>
              Swap {props.network} to NGN
            </DrawerHeader>
            <DrawerBody>
              <Box width={"full"} textAlign={"center"} mt={"100px"}>
                <form
                  onSubmit={handleSubmit(async (data) => {
                    data.swap_amount = floatAmount;
                    data.swap_to = "naira";
                    data.swap_from = props.network;
                    if (errors.length > 0) {
                      console.log("error");
                    } else {
                      setIsLoading(true);
                      console.log(data);
                      await axios
                        .post(`${process.env.REACT_APP_BASE_URL}swap/`, data, {
                          headers: {
                            Authorization: `Token ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        })
                        .then(function (response) {
                          console.log(response);
                          setIsLoading(false);
                          toast({
                            title: "Withdrawal Successful",
                            status: "success",
                          });
                        })
                        .catch(function (error) {
                          setIsLoading(false);
                          toast({
                            title: "An error occured",
                            status: "warning",
                          });
                          console.log(error);
                        });
                    }
                  })}
                  style={{ width: "100%" }}
                >
                  <VStack gap={"20px"}>
                    {/* <Input
                      name="amount"
                      type={"text"}
                      placeholder="Amount"
                      {...register("amount", {
                        onChange: (e) => {
                          console.log(e.target.value.toLocaleString("en-US"));
                        },
                      })}
                      required
                    /> */}
                    <Box width={"full"}>
                      <NumericFormat
                        value={withdrawAmount}
                        placeholder="Amount"
                        required
                        allowLeadingZeros
                        thousandSeparator=","
                        style={{
                          width: "100%",
                          outline: "2px solid transparent",
                          border: "1px solid #e2e8f0",
                          padding: "6px 14px",
                          borderRadius: "5px",
                        }}
                        onChange={(e) => {
                          let amount = e.target.value;
                          let toFloatAmount;
                          toFloatAmount = parseFloat(
                            amount.replaceAll(",", "")
                          ).toFixed(7);
                          if (props.network === "Bitcoin") {
                            let btcErrors = [];

                            console.log("error", toFloatAmount);
                            if (toFloatAmount < 0.0005) {
                              alert();
                              btcErrors.push("Minimum withdrawal is 0.0005 ");
                              setErrors(btcErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(toFloatAmount.toString());
                            }
                          } else if (props.network === "Celo") {
                            let coinErrors = [];
                            if (toFloatAmount < 2) {
                              coinErrors.push("Minimum withdrawal is 2");
                              setErrors(coinErrors);
                              console.log(coinErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(toFloatAmount.toString());
                            }
                          } else if (props.network === "Tron") {
                            let coinErrors = [];
                            if (toFloatAmount < 2) {
                              coinErrors.push("Minimum withdrawal is 2  ");
                              setErrors(coinErrors);
                              console.log(coinErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(toFloatAmount.toString());
                            }
                          } else if (props.network === "Bnb") {
                            let coinErrors = [];
                            if (toFloatAmount < 0.002) {
                              coinErrors.push("Minimum withdrawal is 0.002  ");
                              setErrors(coinErrors);
                              console.log(coinErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(toFloatAmount);
                            }
                          } else if (props.network === "Ethereum") {
                            let coinErrors = [];
                            if (toFloatAmount < 0.001) {
                              coinErrors.push("Minimum withdrawal is 0.001  ");
                              setErrors(coinErrors);
                              console.log(coinErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(toFloatAmount.toString());
                            }
                          }
                        }}
                      />
                      <Box textAlign={"left"}>
                        {errors.length > 0 && (
                          <Text my={"2"} color={"red"} fontSize={"xs"}>
                            {errors[0]}
                          </Text>
                        )}
                      </Box>
                    </Box>

                    <Input
                      name="receiver_address"
                      placeholder="You will recieve"
                      required
                      disabled
                    />

                    <Button width={"full"} isLoading={isLoading} type="Submit">
                      {" "}
                      Send
                    </Button>
                  </VStack>
                </form>
                {/* <Input
                  required
                  value={withdrawAmount}
                  onChange={(e) => {
                    let amount = e.target.value.split("");

                    for (let index = 0; index < amount.length; index++) {
                      const element = amount[index];
                      if (isNaN(element)) {
                        amount.pop(element);
                      }
                    }
                    console.log(amount);
                    let joinedAmount = amount.join("");
                    if (!isNaN(joinedAmount)) {
                      setWithdrawAmount(parseFloat(joinedAmount));
                    } else setWithdrawAmount(0);

                    console.log(withdrawAmount);
                  }}
                /> */}
              </Box>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default Wallet;
