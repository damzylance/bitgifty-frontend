import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  Toast,
  VStack,
} from "@chakra-ui/react";

function MyCards() {
  const [cards, setCards] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [loading, setLoading] = useState(true);
  const fetchCards = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}gift_cards/create/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setCards(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchCardTemplates = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}gift_cards/images`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setTemplates(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchCards();
    fetchCardTemplates();
  }, []);
  console.log(cards);
  return (
    <Box mt={"30px"} cursor={"pointer"}>
      <SimpleGrid columns={[2, 2, 4]} spacing="4">
        {" "}
        {loading ? (
          <Container>
            <Spinner />
          </Container>
        ) : cards.length > 0 ? (
          cards.map((card, id) => {
            let link;
            for (let x = 0; x < templates.length; x++) {
              if (card.image === templates[x].id) {
                link = templates[x].link;
              }
            }
            return (
              <Card
                key={id}
                amount={card.amount}
                image={templates.length > 0 ? link : ""}
                currency={card.currency}
              />
            );
          })
        ) : (
          <Text>No Giftcard created</Text>
        )}
      </SimpleGrid>
    </Box>
  );
}
const Card = (props) => {
  return (
    <VStack
      width={"full"}
      boxShadow={
        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
      }
      borderRadius={"10px"}
      gap={"5"}
      padding={"10px"}
    >
      <Image
        src={props.image}
        width={["full", "full", "250px"]}
        height={"150px"}
        objectFit={"cover"}
        borderRadius={"10px"}
      />
      <HStack width={"full"} justifyContent={"space-between"}>
        <Text>Amount</Text>
        <Text fontWeight={"bold"} fontSize={"lg"}>
          {props.amount} {props.currency}
        </Text>
      </HStack>
    </VStack>
  );
};
export default MyCards;
