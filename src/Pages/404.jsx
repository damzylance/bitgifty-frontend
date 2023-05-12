import { Button, Container, Image, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
const Notfound = () => {
    const navigate=useNavigate()
  return (
    <VStack width={"full"} height={"100vh"} justifyContent={"center"}>
      <Container>
        <VStack width={"full"} height={"100%"}>
          <Image src={"/assets/images/404.jpg"} />
          <Button onClick={()=>navigate("/")}>Go Back</Button>
        </VStack>
      </Container>
    </VStack>
  );
};

export default Notfound;
