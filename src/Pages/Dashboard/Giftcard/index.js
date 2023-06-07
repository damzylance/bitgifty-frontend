import React, { useState } from "react";

import { Button, Divider, Flex } from "@chakra-ui/react";
import DashboardLayout from "../../../Components/DashboardLayout";
import Reedeem from "./Reedeem";
import Create from "./Create";
import MyCards from "./MyCards";
import { useParams } from "react-router-dom";
function Giftcard() {
  const params = useParams();
  const [page, setPage] = useState(params.page ? params.page : "create");

  return (
    <DashboardLayout>
      <Flex height={"50px"} gap={5}>
        <Button
          onClick={() => {
            setPage("create");
          }}
          variant={page === "create" ? "solid" : "outline"}
          size={"lg"}
        >
          Create
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
            setPage("redeem");
          }}
          size="lg"
          variant={page === "redeem" ? "solid" : "outline"}
        >
          Reedeem
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
            setPage("cards");
          }}
          size="lg"
          variant={page === "cards" ? "solid" : "outline"}
        >
          My Cards
        </Button>
      </Flex>
      {page === "create" ? (
        <Create />
      ) : page === "redeem" ? (
        <Reedeem />
      ) : (
        <MyCards />
      )}
    </DashboardLayout>
  );
}

export default Giftcard;
