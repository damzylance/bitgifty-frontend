import React, { useState } from "react";

import { Button, Divider, Flex } from "@chakra-ui/react";
import DashboardLayout from "../../../Components/DashboardLayout";
import Reedeem from "./Reedeem";
import Create from "./Create";
import Authenticate from "../../../Helpers/Auth";
function Giftcard() {
  const [page, setPage] = useState("buy");

  return (
    <DashboardLayout>
      <Flex height={"50px"} gap={5}>
        <Button
          onClick={() => {
            setPage("buy");
          }}
          variant={page === "buy" ? "solid" : "outline"}
          size={"lg"}
        >
          Buy
        </Button>
        <Divider
          borderColor="brand.700"
          borderLeftWidth={2}
          bg="brand.100"
          opacity={"none"}
          variant={"solid"}
          orientation="vertical"
        />
        <Button
          onClick={() => {
            setPage("sell");
          }}
          size="lg"
          variant={page === "sell" ? "solid" : "outline"}
        >
          Reedeem
        </Button>
      </Flex>
      {page === "buy" ? <Create /> : <Reedeem />}
    </DashboardLayout>
  );
}

export default Giftcard;
