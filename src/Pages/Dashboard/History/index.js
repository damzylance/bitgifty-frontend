// import React, { useEffect, useState } from "react";

// import { Button, Divider, Flex } from "@chakra-ui/react";
// import DashboardLayout from "../../../Components/DashboardLayout";
// import Crypto from "./Crypto";
// import Authenticate from "../../../Helpers/Auth";

// function History() {
//   const [page, setPage] = useState("giftcard");

//   return (
//     <DashboardLayout>
//       <Flex height={"50px"} gap={5}>
//         <Button
//           onClick={() => {
//             setPage("giftcard");
//           }}
//           variant={page === "giftcard" ? "solid" : "outline"}
//           size={"lg"}
//         >
//           Giftcard
//         </Button>
//         <Divider
//           borderColor="brand.700"
//           borderLeftWidth={2}
//           bg="brand.100"
//           opacity={"none"}
//           variant={"solid"}
//           orientation="vertical"
//         />
//         <Button
//           onClick={() => {
//             setPage("crypto");
//           }}
//           size="lg"
//           variant={page === "crypto" ? "solid" : "outline"}
//         >
//           Crypto
//         </Button>
//       </Flex>
//       {page === "giftcard" ? <Giftcard /> : <Crypto />}
//     </DashboardLayout>
//   );
// }

// export default History;
