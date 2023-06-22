import { Box, Flex, HStack, Text, VStack, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const mobileStyle = {
  boxShadow: "0px 5px 7px rgb(234, 234, 234)",
  borderRadius: "10px",
};

const Wallet = () => {
  const navigate = useNavigate();
  const buttonStyle = {
    borderRadius: "10px",
    background: "#e2e8f0",

    backgroundSize: "200%",
  };

  const [page, setPage] = useState("deposits");
  const { currency } = useParams();
  const currencies = [
    "bitcoin",
    "usdt",
    "bnb",
    "celo",
    "cusd",
    "tron",
    "ethereum",
  ];
  const wallets = JSON.parse(localStorage.getItem("wallets"));
  const paramsMatch = currencies.includes(currency);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(wallets);

  useEffect(() => {
    if (!paramsMatch) {
      navigate("/wallet");
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}transactions/${currency}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data) {
          setIsLoading(false);

          setTransactions(response.data);
        }
      })
      .catch(function (error) {
        console.log(error.tron);
      });
  }, []);
  return (
    <>
      <DashboardLayout>
        <VStack>
          <VStack alignItems={"flex-start"} width="full" gap={"2"}>
            <Box
              width={"full"}
              visibility={["visible", "visible", "visible", "hidden"]}
            >
              <Text textAlign={"center"}> {currency} Transaction History</Text>
            </Box>

            <Flex
              justifyContent={"space-between"}
              width={"full"}
              bg={"brand.600"}
              py="2"
              px={"2"}
              color={"brand.bg1"}
              borderRadius={"md"}
              display={["none", "none", "none", "flex"]}
            >
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
                Time
              </Text>
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
                Type
              </Text>
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
                Asset
              </Text>
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
                Amount
              </Text>
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
                Wallet
              </Text>
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
                TxID
              </Text>
              <Text
                textAlign={"right"}
                fontSize={["xs", "xs", "sm", "sm"]}
                flex={2}
              >
                Status
              </Text>
            </Flex>

            <VStack
              width={"full"}
              alignContent="flex-start"
              gap={"2"}
              borderBottom={["none", "none", "none", "1px solid #A3BFF5"]}
              boxShadow={[
                mobileStyle.boxShadow,
                mobileStyle.boxShadow,
                mobileStyle.boxShadow,
                "none",
              ]}
              borderRadius={[
                mobileStyle.borderRadius,
                mobileStyle.borderRadius,
                mobileStyle.borderRadius,
                "none",
              ]}
              pb="4"
            >
              <VStack width={"full"} gap={"2"} alignContent="flex-start">
                {isLoading ? (
                  <Spinner />
                ) : currency === "bitcoin" ||
                  currency === "celo" ||
                  currency === "eth" ? (
                  transactions.length > 0 ? (
                    transactions.map((transaction, index) => {
                      let txid;
                      let amount = 0;
                      let wallet;
                      let date;
                      let type;
                      let day;
                      let time;
                      let coin;
                      let scanner;

                      if (currency === "bitcoin") {
                        scanner =
                          "https://live.blockcypher.com/btc-testnet/tx/";
                        if (
                          transaction.inputs[0].coin.address ===
                          wallets[1][1].address
                        ) {
                          type = "Withdrawal";
                          for (let i = 0; i < transaction.inputs.length; i++) {
                            amount +=
                              transaction.inputs[i].coin.value / 100000000;
                          }
                          wallet = `${transaction.outputs[0].address.slice(
                            0,
                            6
                          )}...`;
                        } else {
                          type = "Deposit";
                          let walletDeposits = transaction.outputs.filter(
                            (deposit) => {
                              return deposit.address === wallets[0].address;
                            }
                          );

                          for (let i = 0; i < walletDeposits.length; i++) {
                            amount += walletDeposits[i].value / 100000000;
                          }
                          wallet = `${transaction.inputs[0].coin.address.slice(
                            0,
                            6
                          )}...`;
                        }

                        txid = `${transaction.hash}`;
                        coin = "BTC";
                        date = new Date(transaction.time);
                        day = date
                          .toLocaleDateString("en-NG")
                          .toString()
                          .replaceAll("/", "-");
                        time = date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        date = `${day} ${time}`;
                      }
                      if (currency === "celo") {
                        scanner = "https://alfajores.celoscan.io/tx/";
                        coin = "CELO";
                        if (transaction.from === wallets[2][1].address) {
                          type = "Withdrawal";
                          wallet = `${transaction.to.slice(
                            0,
                            6
                          )}...${transaction.to.slice(39, 42)}`;
                        } else {
                          type = "Deposit";
                          wallet = `${transaction.from.slice(
                            0,
                            6
                          )}...${transaction.from.slice(39, 42)}`;
                        }
                        txid = transaction.hash;
                        amount = transaction.value / 1000000000000000000;
                        date = new Date(transaction.timestamp);
                        day = date
                          .toLocaleDateString("en-NG")
                          .toString()
                          .replaceAll("/", "-");
                        time = date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        date = `${day} ${time}`;
                      }

                      return (
                        <Box width={"full"} key={index}>
                          {" "}
                          <TransactionRow
                            scanner={scanner}
                            time={date.toString()}
                            type={type}
                            asset={coin}
                            amount={amount}
                            wallet={wallet}
                            txid={txid}
                            status="Completed"
                          />
                          <MobileTransactionRow
                            scanner={scanner}
                            time={date.toString()}
                            type={type}
                            amount={amount}
                            wallet={wallet}
                            txid={txid}
                            status="Completed"
                          />
                        </Box>
                      );
                    })
                  ) : (
                    <Text>No recent Transaction</Text>
                  )
                ) : currency === "tron" ? (
                  transactions.transactions.length > 0 ? (
                    transactions.transactions.map((transaction, id) => {
                      let txid = transaction.txID;
                      let amount =
                        transaction.rawData.contract[0].parameter.value.amount /
                        1000000;
                      let date = new Date(transaction.rawData.timestamp);
                      let scanner =
                        "https://shasta.tronscan.org/#/transaction/";
                      let day = date
                        .toLocaleDateString("en-NG")
                        .toString()
                        .replaceAll("/", "-");
                      let time = date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      date = `${day} ${time}`;
                      let coin = "USDT";
                      let type;
                      let wallet;
                      let viewWallet;

                      if (
                        transaction.rawData.contract[0].parameter.value
                          .ownerAddressBase58 === wallets[4][1].address
                      ) {
                        type = "Withdrawal";
                        viewWallet =
                          transaction.rawData.contract[0].parameter.value
                            .toAddressBase58;
                      } else {
                        type = "Deposit";
                        viewWallet =
                          transaction.rawData.contract[0].parameter.value
                            .ownerAddressBase58;
                      }
                      wallet = `${viewWallet.slice(0, 6)}...${viewWallet.slice(
                        30,
                        34
                      )}`;

                      return (
                        <Box width={"full"} key={id}>
                          {" "}
                          <TransactionRow
                            time={date}
                            type={type}
                            asset={coin}
                            amount={amount}
                            wallet={wallet}
                            txid={txid}
                            scanner={scanner}
                          />
                          <MobileTransactionRow
                            time={date}
                            type={type}
                            amount={amount}
                            wallet={wallet}
                            txid={txid}
                            scanner={scanner}
                          />
                        </Box>
                      );
                    })
                  ) : (
                    <Text>No recent Transaction</Text>
                  )
                ) : (
                  <Text>No recent Transaction</Text>
                )}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </DashboardLayout>
    </>
  );
};
function TransactionRow(props) {
  return (
    <Flex
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="1s"
      width={"full"}
      gap="2"
      justifyContent={"space-between"}
      alignItems={"center"}
      wrap="wrap"
      display={["none", "none", "none", "flex"]}
      sx={{
        animation: "drop-in 1200ms ease 500ms backwards",
      }}
    >
      <Text fontSize={["xx-small", "xs", "sm", "sm"]} flex={2}>
        {props.time}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
        {props.type}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
        {props.asset}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
        {props.amount}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
        {props.wallet}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2} color={"brand.600"}>
        <a href={`${props.scanner}${props.txid}`} target="_">
          {`${props.txid.slice(0, 6)} ...`}
        </a>
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2} textAlign="right">
        {props.status}
      </Text>
    </Flex>
  );
}
const MobileTransactionRow = (props) => {
  return (
    <>
      <VStack
        width={"full"}
        fontSize={"xs"}
        display={["flex", "flex", "flex", "none"]}
        px={"10px"}
      >
        <HStack fontSize={"xs"} width={"full"} justifyContent={"space-between"}>
          <Text>{props.time}</Text>
          <Text>{props.amount}</Text>
        </HStack>
        <HStack width={"full"} justifyContent={"space-between"}>
          <Text>Type: {props.type}</Text>
          <Text>{props.wallet}</Text>
        </HStack>
        <HStack
          width={"full"}
          justifyContent={"space-between"}
          py={"4px"}
          borderBottom={"1px solid #e5dede"}
        >
          <Text color={"green.500"} fontWeight="bold">
            <a href={`${props.scanner}${props.txid}`} target="_">
              {`${props.txid.slice(0, 6)} ...`}
            </a>
          </Text>
          <Text>{props.status}</Text>
        </HStack>
      </VStack>
    </>
  );
};
export default Wallet;
