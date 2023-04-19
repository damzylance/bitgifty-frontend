import { VStack, Flex, Text, Spinner, Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Crypto() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [asset, setAsset] = useState(0);
  const wallets = JSON.parse(localStorage.getItem("wallets"));
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
    <VStack width={"full"} my="10" alignItems={"flex-start"}>
      <HStack>
        {" "}
        <Button
          onClick={() => setAsset(0)}
          size={"sm"}
          variant={asset === 0 ? "solid" : "outline"}
        >
          BTC
        </Button>
        <Button
          onClick={() => {
            setAsset(1);
          }}
          size={"sm"}
          variant={asset === 1 ? "solid" : "outline"}
        >
          BNB
        </Button>
        <Button
          onClick={() => setAsset(2)}
          size={"sm"}
          variant={asset === 2 ? "solid" : "outline"}
        >
          CELO
        </Button>
        <Button
          onClick={() => setAsset(3)}
          size={"sm"}
          variant={asset === 3 ? "solid" : "outline"}
        >
          ETH
        </Button>
        <Button
          onClick={() => setAsset(4)}
          size={"sm"}
          variant={asset === 4 ? "solid" : "outline"}
        >
          USDT
        </Button>
      </HStack>

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
            ) : asset === 0 || asset === 2 || asset === 3 ? (
              transactions[asset].length > 0 ? (
                transactions[asset].map((transaction, index) => {
                  let txid;
                  let amount = 0;
                  let wallet;
                  let date;
                  let type;
                  let day;
                  let time;
                  let coin;
                  let scanner;

                  if (asset === 0) {
                    scanner = "https://live.blockcypher.com/btc-testnet/tx/";
                    if (
                      transaction.inputs[0].coin.address === wallets[0].address
                    ) {
                      type = "Withdrawal";
                      for (let i = 0; i < transaction.inputs.length; i++) {
                        amount += transaction.inputs[i].coin.value / 100000000;
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
                  if (asset === 2) {
                    scanner = "https://alfajores.celoscan.io/tx/";
                    coin = "CELO";
                    if (transaction.from === wallets[2].address) {
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
                    <TransactionRow
                      scanner={scanner}
                      key={index}
                      time={date.toString()}
                      type={type}
                      asset={coin}
                      amount={amount}
                      wallet={wallet}
                      txid={txid}
                      status="Completed"
                    />
                  );
                })
              ) : (
                <Text>No recent Transaction</Text>
              )
            ) : asset === 4 ? (
              transactions[asset].transactions.length > 0 ? (
                transactions[asset].transactions.map((transaction) => {
                  let txid = transaction.txID;
                  let amount =
                    transaction.rawData.contract[0].parameter.value.amount /
                    1000000;
                  let date = new Date(transaction.rawData.timestamp);
                  let scanner = "https://shasta.tronscan.org/#/transaction/";
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
                      .ownerAddressBase58 === wallets[4].address
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
                    <TransactionRow
                      key={txid}
                      time={date}
                      type={type}
                      asset={coin}
                      amount={amount}
                      wallet={wallet}
                      txid={txid}
                      scanner={scanner}
                    />
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
  );
}
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
      display={"flex"}
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

export default Crypto;
