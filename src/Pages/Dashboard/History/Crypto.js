import { VStack, Flex, Text, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Crypto() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getTransactions = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}transactions/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then(function (response) {
          setTransactions(response.data);
          setIsLoading(false);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getTransactions();
  }, []);
  return (
    <VStack width={"full"} my="20">
      <VStack alignItems={"flex-start"} width="full" gap={"2"}>
        <Flex
          justifyContent={"space-between"}
          width={"full"}
          bg={"brand.600"}
          py="2"
          px={"2"}
          color={"brand.bg1"}
          borderRadius={"md"}
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
          borderBottom={"1px solid #A3BFF5"}
          pb="4"
        >
          <VStack width={"full"} gap={"2"} alignContent="flex-start">
            {isLoading ? (
              <Spinner />
            ) : transactions.length > 0 ? (
              transactions.map((transaction, index) => {
                let txid = `${transaction.txID}`;
                let amount =
                  transaction.rawData.contract[0].parameter.value.amount /
                  1000000;
                let wallet = `${transaction.rawData.contract[0].parameter.value.toAddressBase58
                  .toString()
                  .slice(0, 6)}...`;
                let date = new Date(transaction.rawData.timestamp);
                let day = date
                  .toLocaleDateString("en-NG")
                  .toString()
                  .replaceAll("/", "-");
                let time = date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                date = `${day} ${time}`;
                console.log(date.toString().replaceAll("/", "-"));
                return (
                  <TransactionRow
                    key={index}
                    time={date}
                    type={transaction.netFee > 0 ? "Deposit" : "Withdrawal"}
                    asset={"USDT"}
                    amount={amount}
                    wallet={wallet}
                    txid={txid}
                    status="Completed"
                  />
                );
              })
            ) : (
              <Text>No recent Transaction</Text>
            )}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
function TransactionRow(props) {
  return (
    <Flex
      width={"full"}
      gap="2"
      justifyContent={"space-between"}
      alignItems={"center"}
      wrap="wrap"
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
        <a
          href={`https://shasta.tronscan.org/#/transaction/${props.txid}`}
          target="_"
        >
          {`${props.txid.slice(0, 6)} ...`}
        </a>
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2} textAlign="right">
        {props.status}
      </Text>
    </Flex>
  );
}

export default Crypto;
