import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Components/DashboardLayout";
import Authenticate from "../../Helpers/Auth";

function SettingsLayout(props) {
  const navStyle = {
    padding: "10px 20px",
    borderBottom: "1px solid #144CB8",
    width: "100%",
  };
  Authenticate();
  return (
    <DashboardLayout>
      <Flex>
        <VStack
          color={"brand.600"}
          background={"brand.50"}
          alignItems={"flex-start"}
          flex={1}
          width="full"
          borderRadius={"10px"}
          justifyContent={"center"}
        >
          <Box style={navStyle}>
            <Link to="/setting">
              <Text>Profile</Text>
            </Link>
          </Box>
          <Box style={navStyle}>
            <Link to="/profile">
              <Text>Security</Text>
            </Link>
          </Box>
          <Box style={navStyle}>
            <Link to="/profile">
              <Text>Payout</Text>
            </Link>
          </Box>
          <Box style={navStyle}>
            <Link to="/profile">
              <Text>Logout</Text>
            </Link>
          </Box>
          <Box style={navStyle}>
            <Link to="/profile">
              <Text>Delete Account</Text>
            </Link>
          </Box>
        </VStack>
        <VStack gap={10} flex={2}>
          {props.children}
        </VStack>
      </Flex>
    </DashboardLayout>
  );
}

export default SettingsLayout;
