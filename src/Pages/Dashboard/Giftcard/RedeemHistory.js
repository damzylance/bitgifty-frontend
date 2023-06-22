import React, { useEffect } from "react";
import { Box, Flex, HStack, Text, VStack, Spinner } from "@chakra-ui/react";
import DashboardLayout from "../../../Components/DashboardLayout";
import axios from "axios";
function RedeemHistory() {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}gift_cards/redeem`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.tron);
      });
  }, []);
  return (
    <DashboardLayout>
      <VStack width={"full"}>
        <Text>Redeem History</Text>
      </VStack>
    </DashboardLayout>
  );
}

export default RedeemHistory;
