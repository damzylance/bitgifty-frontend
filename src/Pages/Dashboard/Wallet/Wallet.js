import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const transitionStyle = {
  borderRadius: "10px",
  transition:
    "background-position .3s cubic-bezier(.47, .1, 1, .63), .2s linear",
  backgroundPosition: "-50% 100%",
  backgroundImage:
    "linear-gradient(90deg,#f5f6f7 0%, #fff 70%,#fff 70%,#fff 70%)",
  backgroundSize: "300%",
  transitionDelay: "0.15s, 0.015s",
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
  const currencies = ["bitcoin", "usdt", "bnb", "celo", "cusd", "tron"];
  const paramsMatch = currencies.includes(currency);
  const [transactions, setTransactions] = useState([
    { amount: 0.2, date: "14/05/2022 00:32:14", status: "Processed" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  console.log(paramsMatch);

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

          localStorage.setItem("wallets", JSON.stringify(response.data));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [navigate, paramsMatch]);
  return (
    <>
      <DashboardLayout>
        <Container maxW={"500px"}>
          <VStack gap={"20px"}>
            <Container
              background={"brand.50"}
              py={"12"}
              border={"1px solid #A3BFF5"}
              borderRadius={"12px"}
              maxWidth="500px"
            >
              <VStack gap={"12"}>
                <Text>Total Balance</Text>
                <Flex gap={"4"}>
                  <Text> 10 {currency.toUpperCase()}</Text>
                  <Text> =</Text>
                  <Text> #50000</Text>
                </Flex>
              </VStack>
            </Container>
            <HStack width={"full"}>
              <Button width={"full"}>Buy Gift Card</Button>
              <Button width={"full"} variant="outline">
                Sell to fiat
              </Button>
            </HStack>
            <VStack width={"full"} gap={"20px"}>
              <HStack>
                <Text fontSize={"xl"} fontWeight={"bold"}>
                  History
                </Text>
              </HStack>
              <HStack
                justifyContent={"space-between"}
                padding={"4px"}
                width={"full"}
                background={"gray.200"}
                borderRadius={"5px"}
              >
                <Box
                  width={"full"}
                  padding={"10px"}
                  sx={page === "deposits" ? transitionStyle : buttonStyle}
                  textAlign={"center"}
                  cursor={"pointer"}
                  onClick={() => {
                    setPage("deposits");
                  }}
                >
                  Deposits
                </Box>
                <Box
                  padding={"10px"}
                  textAlign={"center"}
                  width={"full"}
                  sx={page === "withdrawals" ? transitionStyle : buttonStyle}
                  cursor={"pointer"}
                  onClick={() => {
                    setPage("withdrawals");
                  }}
                >
                  Widthrawal
                </Box>
              </HStack>
              <VStack width={"full"}>
                {transactions.map((_, index) => {
                  return <TransactionRow key={index} />;
                })}

                <Button
                  onClick={() => {
                    setTransactions([...transactions, {}]);
                  }}
                >
                  Add row +{" "}
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </Container>
      </DashboardLayout>
    </>
  );
};
const TransactionRow = (props) => {
  const { currency } = useParams();
  return (
    <>
      <VStack width={"full"}>
        <HStack width={"full"} justifyContent={"space-between"}>
          <Text>{currency}</Text>
          <Text>0.2</Text>
        </HStack>
        <HStack
          width={"full"}
          justifyContent={"space-between"}
          py={"4px"}
          borderBottom={"1px solid #e5dede"}
        >
          <Text fontSize={"sm"}>14/05/2022 00:32:14</Text>
          <Text fontSize={"sm"} color={"green.500"} fontWeight="bold">
            Processed
          </Text>
        </HStack>
      </VStack>
    </>
  );
};
export default Wallet;
