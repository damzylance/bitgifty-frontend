import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Image,
  useToast,
  VStack,
  Button,
} from "@chakra-ui/react";
import { RxHamburgerMenu, RxCross1, RxCaretRight } from "react-icons/rx";
import Authenticate from "../../Helpers/Auth";

import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DashboardLayout(props) {
  const toast = useToast();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const showMobileMenu = () => {
    setOpenMenu(!openMenu);
  };
  const logOut = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}auth/logout/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        localStorage.removeItem("token");
        toast({ title: "Successfully Logged out", status: "warning" });

        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box width={"full"}>
      <Box width={"full"} bg={"brand.700"}>
        <Container px={[2, 2, 0]} py={4} maxW={["100%", "100%", "75%"]}>
          <Box
            width={"full"}
            top={0}
            left={0}
            bg={"brand.700"}
            color={"#fff"}
            py={"10px"}
            position={"sticky"}
            zIndex={1}
            display={["block", "block", "none"]}
          >
            <HStack justifyContent={"space-between"} alignItems="center">
              <Link to={"/"}>
                <Box>
                  <Image
                    src="/assets/images/logo-inline-transparent.png"
                    width={"100px"}
                  />
                </Box>
              </Link>
              {openMenu ? (
                <RxCross1 onClick={showMobileMenu} fontSize={"24px"} />
              ) : (
                <RxHamburgerMenu onClick={showMobileMenu} fontSize={"24px"} />
              )}
            </HStack>
            {openMenu && (
              <VStack
                width={"full"}
                alignItems={"flex-start"}
                mt="20px"
                justifyContent={"space-between"}
              >
                <VStack width={"full"} alignItems={"flex-start"}>
                  <Link to={"/giftcard"} style={{ width: "100%" }}>
                    <HStack
                      width={"full"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      py={"10px"}
                      borderBottom={"1px solid #eae8e8"}
                    >
                      <Text fontWeight={"500"} fontSize={"lg"}>
                        Gift Card
                      </Text>
                      <RxCaretRight fontSize={"24px"} />
                    </HStack>
                  </Link>
                  <Link to={"/wallet"} style={{ width: "100%" }}>
                    <HStack
                      width={"full"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      py={"10px"}
                      borderBottom={"1px solid #eae8e8"}
                    >
                      <Text fontWeight={"500"} fontSize={"lg"}>
                        Wallet
                      </Text>
                      <RxCaretRight fontSize={"24px"} />
                    </HStack>
                  </Link>
                  <Link to={"/setting"} style={{ width: "100%" }}>
                    <HStack
                      width={"full"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      py={"10px"}
                      borderBottom={"1px solid #eae8e8"}
                    >
                      <Text fontWeight={"500"} fontSize={"lg"}>
                        Settings
                      </Text>
                      <RxCaretRight fontSize={"24px"} />
                    </HStack>
                  </Link>
                  <Link to={"/wallet"} style={{ width: "100%" }}>
                    <HStack
                      width={"full"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      py={"10px"}
                      borderBottom={"1px solid #eae8e8"}
                    >
                      <Text fontWeight={"500"} fontSize={"lg"}>
                        Logout
                      </Text>
                      <RxCaretRight fontSize={"24px"} />
                    </HStack>
                  </Link>
                </VStack>
              </VStack>
            )}
          </Box>
          <Flex
            display={["none", "none", "flex", "flex"]}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Link to={"/"}>
              {" "}
              <Box>
                <Image
                  src="/assets/images/logo-inline-transparent.png"
                  width={"150px"}
                />
              </Box>
            </Link>

            <HStack
              gap={18}
              color={"brand.bg1"}
              fontWeight={"600"}
              fontSize="md"
            >
              <Link to="/dashboard">
                <Text>Dashboard</Text>
              </Link>
              <Link to="/giftcard">
                <Text>Giftcard</Text>
              </Link>
              <Link to="/wallet">
                <Text>Wallet</Text>
              </Link>

              <Link onClick={() => logOut()}>
                <Text>Logout</Text>
              </Link>
            </HStack>
            <HStack gap={10}>
              <Link to="/setting">
                <Box>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 0C14.7239 0 16.3772 0.684819 17.5962 1.90381C18.8152 3.12279 19.5 4.77609 19.5 6.5C19.5 8.22391 18.8152 9.87721 17.5962 11.0962C16.3772 12.3152 14.7239 13 13 13C11.2761 13 9.62279 12.3152 8.40381 11.0962C7.18482 9.87721 6.5 8.22391 6.5 6.5C6.5 4.77609 7.18482 3.12279 8.40381 1.90381C9.62279 0.684819 11.2761 0 13 0ZM13 16.25C20.1825 16.25 26 19.1588 26 22.75V26H0V22.75C0 19.1588 5.8175 16.25 13 16.25Z"
                      fill="white"
                    />
                  </svg>
                </Box>
              </Link>

              <Box>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 28 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 25.0952V26.5714H0V25.0952L3.11111 22.1429V13.2857C3.11111 8.70952 6.26889 4.67952 10.8889 3.38048C10.8889 3.23286 10.8889 3.1 10.8889 2.95238C10.8889 2.16936 11.2167 1.41841 11.8001 0.864732C12.3836 0.311053 13.1749 0 14 0C14.8251 0 15.6164 0.311053 16.1999 0.864732C16.7833 1.41841 17.1111 2.16936 17.1111 2.95238C17.1111 3.1 17.1111 3.23286 17.1111 3.38048C21.7311 4.67952 24.8889 8.70952 24.8889 13.2857V22.1429L28 25.0952ZM17.1111 28.0476C17.1111 28.8306 16.7833 29.5816 16.1999 30.1353C15.6164 30.6889 14.8251 31 14 31C13.1749 31 12.3836 30.6889 11.8001 30.1353C11.2167 29.5816 10.8889 28.8306 10.8889 28.0476"
                    fill="white"
                  />
                </svg>
              </Box>
            </HStack>
          </Flex>
        </Container>
      </Box>
      <Box width={"full"} minH={"500px"} bg={"brand.bg1"}>
        <Authenticate>
          <Container px={[2, 2, 0]} py={4} maxW={["100%", "100%", "75%"]}>
            {props.children}
          </Container>
        </Authenticate>
      </Box>
      {/* <Box mt="10" width={"full"} bg={"brand.700"}>
        <Container height={"60"} py={4} maxW={["100%", "100%", "75%"]}>
          footer
        </Container>
      </Box> */}
    </Box>
  );
}

export default DashboardLayout;
