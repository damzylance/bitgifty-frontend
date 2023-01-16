import { Box, Flex, Image, VStack, Text, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../Components/DashboardLayout";
import Authenticate from "../../Helpers/Auth";
function Dashboard() {
  Authenticate();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const user = async () => {
  //     await axios
  //       .get(`${process.env.REACT_APP_BASE_URL}auth/user/`, {
  //         headers: {
  //           Authorization: `Token ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then(function (response) {
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         if (error.response?.status === 500) {
  //           toast({ title: "Server error", status: "error" });
  //         }
  //         if (error.response?.status === 403) {
  //           toast({
  //             title: "session expired. Please sign in again",
  //             status: "warning",
  //           });
  //           navigate("/login");
  //         }
  //         if (error.response?.status === 401) {
  //           toast({
  //             title: "Unautorised. Please sign in again",
  //             status: "warning",
  //           });
  //           navigate("/login");
  //         }
  //       });
  //   };
  //   user();
  // });
  return (
    <DashboardLayout>
      <Flex
        gap={10}
        alignItems={"center"}
        width={"full"}
        background={"brand.bg1"}
        my="20"
        flexDir={["column", "column", "row"]}
      >
        <Box w={"full"} height="full" p={2}>
          <Image width={"500px"} src="/assets/images/heroimage2.png" />
        </Box>
        <VStack
          w={"full"}
          height="full"
          gap={["10", "10", "40"]}
          alignItems={["center", "center", "flex-start"]}
        >
          <Text
            width={["300px", "300px", "250px"]}
            fontSize={"2xl"}
            fontWeight={700}
            color="brand.700"
          >
            Create your crypto gift cards here at Gifty!
          </Text>
          <VStack
            width={"full"}
            alignItems={["center", "center", "flex-start"]}
            gap="5"
          >
            <Button
              width={"80%"}
              colorScheme={"brand"}
              size="lg"
              justifyContent={"space-between"}
              variant={"solid"}
              rightIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/giftcard")}
            >
              Send Gift Card
            </Button>
            <Button
              width={"80%"}
              size="lg"
              colorScheme={"brand"}
              justifyContent={"space-between"}
              variant={"outline"}
              rightIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/giftcard")}
            >
              Redeem Gift Card
            </Button>
          </VStack>
        </VStack>
      </Flex>
    </DashboardLayout>
  );
}

export default Dashboard;
