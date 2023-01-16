import React from "react";
import { Container, VStack, Text, Button, Input } from "@chakra-ui/react";

function Reedeem() {
  return (
    <Container
      py="52px"
      px="32px"
      color={"brand.700"}
      borderRadius={"2xl"}
      bg={"brand.50"}
      my="10"
    >
      <VStack gap={"5"} alignItems="flex-start">
        <Text>Enter Your Gift Card Code</Text>
        <VStack width={"full"} gap={"5"} alignItems="center">
          <Input
            type={"text"}
            borderColor={"brand.700"}
            width="80%"
            placeholder={"16 digit character"}
            size={"lg"}
            bg="bg1"
          />
          <Button size={"lg"} colorScheme="brand">
            Reedem
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}

export default Reedeem;
