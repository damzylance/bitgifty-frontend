import {
  Button,
  Container,
  Flex,
  Input,
  Text,
  VStack,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/DashboardLayout";
import Authenticate from "../../../Helpers/Auth";
import { useForm } from "react-hook-form";
function Wallet() {
  Authenticate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}transactions/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log("Hello");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return (
    <DashboardLayout>
      <VStack gap={"10"} width="full">
        <Flex alignItems="center" width="full" justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color="brand.700">
            Wallet
          </Text>
          <ButtonGroup>
            <Button variant={"outline"}>Deposit</Button>
            <Button variant={"outline"}>Withdraw</Button>
            <Button variant={"outline"}>Transfer</Button>
            <Button variant={"outline"}>Transaction History</Button>
          </ButtonGroup>
        </Flex>
        <Container
          background={"brand.50"}
          py={"12"}
          border={"1px solid #A3BFF5"}
          borderRadius={"12px"}
          width={"md"}
        >
          <VStack gap={"12"}>
            <Text>Total Balance</Text>
            <Flex gap={"4"}>
              <Text> 0.01 BTC</Text>
              <Text> =</Text>
              <Text> #50000</Text>
            </Flex>
          </VStack>
        </Container>
        <VStack alignItems={"flex-start"} width="full" gap={"10"}>
          <Input placeholder="search coin" width={"sm"} type={"text"} />
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
              <Text>Assets</Text>
              <Text>Balance</Text>
              <Text>Action</Text>
            </Flex>
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
                Fiat
              </Text>
              <VStack width={"full"} gap={"2"} alignContent="flex-start">
                <CoinRow currency={"NGN"} amount={5000} />
                <CoinRow currency={"GHC"} amount={5000} />
              </VStack>
            </VStack>
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
                <CoinRow currency={"USDT"} amount={5000} />
                <CoinRow currency={"BTC"} amount={0.4} />
                <CoinRow currency={"ETH"} amount={1} />
                <CoinRow currency={"LTC"} amount={1000} />
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState("deposit");
  return (
    <Flex
      width={"full"}
      gap="2"
      justifyContent={"space-between"}
      alignItems={"center"}
      wrap="wrap"
    >
      <Text>{props.currency}</Text>
      <Text ml={["", "", "150px"]}>{props.amount}</Text>
      <Flex gap={"2"}>
        <Button
          onClick={() => {
            setPage("widthraw");
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
      </Flex>
      <WalletModal isOpen={isOpen} onClose={onClose} page={page} />
    </Flex>
  );
}
const WalletModal = (props) => {
  const userWallet = localStorage.getItem("wallet");
  const btnRef = React.useRef();
  const { register, handleSubmit } = useForm();

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
              USDT Wallet Address
            </DrawerHeader>
            <DrawerBody>
              <Box textAlign={"center"} mt={"100px"}>
                <VStack>
                  <Text fontSize="lg" color={"brand.500"} fontWeight={"bold"}>
                    {userWallet}
                  </Text>
                  <Text fontSize={"s"}>
                    Copy wallet address to deposit coin
                  </Text>
                </VStack>
              </Box>{" "}
            </DrawerBody>
          </>
        )}

        {props.page === "widthraw" && (
          <>
            <DrawerHeader color={"brand.700"} textAlign={"center"}>
              Widthraw USDT
            </DrawerHeader>
            <DrawerBody>
              <Box width={"full"} textAlign={"center"} mt={"100px"}>
                <form
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                  })}
                  style={{ width: "100%" }}
                >
                  <VStack gap={"20px"}>
                    <Input
                      name="amount"
                      type={"number"}
                      placeholder="Amount"
                      {...register("amount")}
                      required
                    />
                    <Input
                      name="wallet_address"
                      placeholder="Wallet address"
                      {...register("wallet_address")}
                      required
                    />
                    <Button width={"full"} type="Submit">
                      {" "}
                      Send
                    </Button>
                  </VStack>
                </form>
              </Box>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
// const WithdrawModal = (props) => {
//   const userWallet = localStorage.getItem("wallet");
//   const btnRef = React.useRef();
//   return (
//     <Drawer
//       isOpen={props.isOpen}
//       placement="right"
//       onClose={props.onClose}
//       finalFocusRef={btnRef}
//       size={"md"}
//     >
//       <DrawerOverlay />
//       <DrawerContent>
//         <DrawerCloseButton />
//         <DrawerHeader color={"brand.700"} textAlign={"center"}>
//           Widthdraw to external wallet
//         </DrawerHeader>

//         <DrawerBody>
//           <Box textAlign={"center"} mt={"100px"}>
//             <VStack>
//               <Text fontSize="lg" color={"brand.500"} fontWeight={"bold"}>
//                 {userWallet}
//               </Text>
//               <Text fontSize={"s"}></Text>
//             </VStack>
//           </Box>
//         </DrawerBody>
//       </DrawerContent>
//     </Drawer>
//   );
// };
export default Wallet;
