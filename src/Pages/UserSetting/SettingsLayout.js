import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Components/DashboardLayout";

function SettingsLayout(props) {
  const navStyle = {
    padding: ["5px 10px", "5px 10px", "10px 20px"],
    borderRadius: ["5px", "5px", "none"],
    borderBottom: ["none", "none", "1px solid #144CB8"],
    width: ["auto", "auto", "100%"],
    background: ["#103d96", "#103d96", "transparent"],
    color: ["#fff", "#fff", "#103d96"],
  };
  return (
    <DashboardLayout>
      <Flex
        width={"full"}
        display={"flex"}
        flexDir={["column", "column", "row"]}
      >
        <Flex
          color={"brand.600"}
          background={["none", "none", "brand.50"]}
          alignItems={["center", "center", "flex-start"]}
          flex={1}
          flexDir={["row", "row", "column"]}
          borderRadius={["none", "none", "10px"]}
          gap={["16px", "6px", "auto"]}
          justifyContent={["center", "center", "center"]}
          flexWrap={["wrap", "wrap", "none"]}
        >
          <Box sx={navStyle}>
            <Link to="">
              <Text>Profile</Text>
            </Link>
          </Box>
          <Box sx={navStyle}>
            <Link to="">
              <Text>Security</Text>
            </Link>
          </Box>
          <Box sx={navStyle}>
            <Link to="">
              <Text>Payout</Text>
            </Link>
          </Box>
          <Box sx={navStyle}>
            <Link to="">
              <Text>Logout</Text>
            </Link>
          </Box>
          <Box sx={navStyle}>
            <Link to="">
              <Text>Delete Account</Text>
            </Link>
          </Box>
        </Flex>
        <VStack gap={10} flex={2} width={"full"}>
          {props.children}
        </VStack>
      </Flex>
    </DashboardLayout>
  );
}

export default SettingsLayout;
