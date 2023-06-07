import "./home.css";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Img,
  Text,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxCross1, RxCaretRight } from "react-icons/rx";

const animationKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateX(80%);
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateX(0%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
`;
const animation = `${animationKeyframes} 2s ease-out `;
const navHoverStyle = {
  background: "brand.700",
  color: "#fff",
  transform: " skewX(-10deg)",
  borderBottomRightRadius: "10px",
  borderTopLeftRadius: "10px",
};
const navStyle = {
  fontSize: "16px",
  fontWeight: "500",
  padding: "10px",
  transition: "all 0.3s",
  cursor: "pointer",
};
const Home = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const showMobileMenu = () => {
    setOpenMenu(!openMenu);
  };
  const howItWorks = useRef(null);
  const about = useRef(null);
  const faq = useRef(null);
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <VStack
      width={"full"}
      background={"#FAFCFF"}
      pt={[0, 0, "0px", "0px"]}
      gap={"40px"}
    >
      <Box
        width={"full"}
        position={["relative", "relative", "sticky"]}
        zIndex={"999"}
        top={["none", "none", "0"]}
        left={["none", "none", "0"]}
        p={"10px"}
        background={"#FAFCFF"}
        boxShadow={"1px 3px 5px -1px rgba(169,170,176,0.47)"}
      >
        <Box
          width={"full"}
          bg={"brand.700"}
          color={"#fff"}
          zIndex={1}
          display={["block", "block", "none"]}
        >
          <HStack
            justifyContent={"space-between"}
            alignItems="center"
            py={"10px"}
          >
            <Link to={"/"}>
              <Box>
                <Img
                  src="/assets/images/logo-inline-transparent.png"
                  width={"100px"}
                />
              </Box>
            </Link>
            {openMenu ? (
              <RxCross1 onClick={showMobileMenu} fontSize={"24px"} />
            ) : (
              <RxHamburgerMenu onClick={showMobileMenu} fontSize={"24px"} />
            )}
          </HStack>
          {openMenu && (
            <VStack
              width={"full"}
              alignItems={"flex-start"}
              mt="20px"
              justifyContent={"space-between"}
            >
              <VStack width={"full"} alignItems={"flex-start"}>
                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                  onClick={() => {
                    scrollToSection(howItWorks);
                  }}
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    How it works
                  </Text>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>

                <HStack
                  onClick={() => {
                    scrollToSection(about);
                  }}
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    About
                  </Text>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>

                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                  onClick={() => {
                    scrollToSection(faq);
                  }}
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    FAQ
                  </Text>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>
              </VStack>
            </VStack>
          )}
        </Box>
        <Container maxWidth={["full", "full", "95%", "80%"]}>
          <VStack width={"full"}>
            <HStack
              width={"full"}
              justifyContent={"space-between"}
              display={["none", "none", "flex", "flex"]}
              alignItems={"cener"}
            >
              <Box>
                <Image
                  width={"150px"}
                  src="/assets/images/logo-inline-whitebg.png"
                />
              </Box>
              <HStack gap={"20px"} alignItems={"center"}>
                <Text
                  onClick={() => {
                    scrollToSection(about);
                  }}
                  sx={navStyle}
                  _hover={navHoverStyle}
                >
                  About
                </Text>
                <Text
                  onClick={() => {
                    scrollToSection(howItWorks);
                  }}
                  sx={navStyle}
                  _hover={navHoverStyle}
                >
                  How it works
                </Text>

                <Text
                  onClick={() => {
                    scrollToSection(faq);
                  }}
                  sx={navStyle}
                  _hover={navHoverStyle}
                >
                  FAQ
                </Text>
                <Button
                  onClick={() => navigate("/register")}
                  background={"brand.700"}
                  size={"lg"}
                >
                  Get Started
                </Button>
                {/* <Text fontSize={"64px"} fontWeight={700}>
                  SEND THE GIFT OF CRYPTO WITH EASE
                </Text>
                <Text fontSize={"24px"}>
                  Give the Gift of Choice: Create and redeem your crypto gift
                  cards here at Gifty!
                </Text> */}
              </HStack>
            </HStack>
          </VStack>
        </Container>
      </Box>
      <Box width={"full"} position={"relative"}>
        <Container
          my={"40px"}
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
        >
          <HStack
            flexDir={["column", "column", "column", "column", "row"]}
            gap={"20px"}
          >
            <VStack
              alignItems={"flex-start"}
              width={["full", "full", "full", "895px"]}
              position={"relative"}
              gap={5}
              as={motion.div}
              animation={animation}
            >
              <Text
                fontSize={["32px", "32px", "42px", "52px"]}
                maxW={"500px"}
                fontWeight={"900"}
                lineHeight={["60px", "60px", "78px", "80px"]}
              >
                CREATE AND REDEEM CRYPTO GIFT CARDS WITH EASE
              </Text>

              <Text
                fontSize={["18px", "18px", "24px", "24px"]}
                maxWidth={"500px"}
                fontWeight={"500"}
              >
                Send Crypto to your Friends and Family in Style - Create Bitcoin
                Giftcards in Seconds here at BitGifty!
              </Text>
              <Button size={"lg"} onClick={() => navigate("/register")}>
                Get Started
              </Button>
            </VStack>
            <Image
              // position={"absolute"}
              // right={"-30%"}
              // bottom={"-10%"}
              // zIndex={0}
              maxW={["auto", "auto", "580px", "580px"]}
              src="/assets/images/home-hero1.png"
            />
          </HStack>
        </Container>
      </Box>
      <Box width={"full"} py={"40px"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "300px", "300px", "200px"]}
        >
          <HStack
            width={"full"}
            justifyContent={"space-between"}
            flexDir={["column", "column", "row", "row"]}
            gap={"40px"}
          >
            <InfoCard
              title={"create crypto gift cards"}
              icon={"/assets/icons/info-icon1.png"}
              description={
                "BitGifty allows you to create your BTC, ETH, CELO, TRX... gift cards easily in just a few clicks."
              }
            />
            <InfoCard
              title={"Redeem crypto gift cards"}
              icon={"/assets/icons/info-icon2.png"}
              description={
                "BitGifty allows you to redeem your BTC, ETH, CELO, TRX... gift cards easily in just a few clicks."
              }
            />
            <InfoCard
              title={"CUSTOMISED GIFT CARD DESIGNS"}
              icon={"/assets/icons/info-icon3.png"}
              description={
                "Choose from the wide array of colorful gift card designs appropriate for the recipient"
              }
            />
          </HStack>
        </Container>
      </Box>
      <Box width={"full"} position="relative" pb={"100px"} ref={about}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
        >
          <VStack position={"relative"} width={"full"} gap={"80px"}>
            <HStack
              background={"url(/assets/images/pattern_img.png)"}
              position={[
                "relative",
                "relative",
                "absolute",
                "absolute",
                "absolute",
              ]}
              bgRepeat={"no-repeat"}
              backgroundSize={["cover", "cover", "cover", "90%"]}
              top={[null, null, "-330px", "-330px", "-100px"]}
              gap={"40px"}
              justifyContent={["center"]}
              // flexDir={["column", "column", "row", "row"]}
              wrap={"wrap"}
            >
              <ResultCard value={"100+"} text={"Gift cards created"} />
              <ResultCard value={"100+"} text={"Giftcards redeemed"} />
              <ResultCard value={"500+"} text={"Active gifters"} />
            </HStack>
            <VStack width={"full"} gap={"30px"} ref={about}>
              <VStack width={"full"} pt={[0, 0, "200px", "300px"]}>
                <Text
                  fontSize={["32px", "32px", "40px", "48px"]}
                  fontWeight={"700"}
                >
                  ABOUT US
                </Text>
                <Text
                  textAlign={"center"}
                  px={["10px", "10px", "25px", "50px"]}
                  fontSize={["16px", "16px", "16px", "24px"]}
                >
                  Bitgifty is a platform which allows users create and redeem
                  crypto gift cards easily in just few clicks
                </Text>
              </VStack>
              <VStack
                mt={"300px"}
                width={"full"}
                alignItems={"flex-start"}
                gap={["40px", "40px", "80px", "80px"]}
                position={"relative"}
              >
                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  flexDir={["column", "column", "row", "row"]}
                  alignItems={["", "", "flex-start", "flex-start"]}
                  gap={"20px"}
                >
                  <AboutCard
                    title={"For Remittance"}
                    description={
                      "Want to send some money to your friends and family in another country? Send it in style! Create a Crypto gift card specially for them. Show them how much you appreciate them."
                    }
                    icon={"/assets/icons/about-icon1.png"}
                  />
                  <AboutCard
                    title={"For Crypto Trading"}
                    description={
                      "Don't be boring! You don't have to trade your Bitcoin the same way all the time. Do it differently this time. Create a Bitcoin gift card and send it to the buyer. It is so much easier and faster."
                    }
                    icon={"/assets/icons/about-icon2.png"}
                  />
                </HStack>
                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  flexDir={["column", "column", "row", "row"]}
                  gap={"20px"}
                  alignItems={["", "", "flex-start", "flex-start"]}
                >
                  <AboutCard
                    title={"For Reward Programs"}
                    description={
                      "How do you say 'thank you' to your loyal staffs and customers? BitGifty provides a creative and seamless way for you to reward them. Get a Custom Gift card design for your company."
                    }
                    icon={"/assets/icons/about-icon2.png"}
                  />
                  <AboutCard
                    title={"For Web3 Gaming"}
                    description={
                      "Want to monetize the accessories of your Web3 game? At BitGifty, we can help create you own custom Gift card using your platform's crypto or any other crypto of your choice."
                    }
                    icon={"/assets/icons/about-icon3.png"}
                  />
                </HStack>

                <hr
                  style={{
                    borderColor: "#38C7E7",
                    width: "450px",
                    position: "absolute",
                    top: "50%",
                  }}
                />
                <hr
                  style={{
                    borderColor: "#38C7E7",

                    width: "450px",
                    position: "absolute",
                    top: "50%",
                    right: 0,
                  }}
                />
                <hr
                  style={{
                    borderColor: "#38C7E7",
                    width: "220px",
                    position: "absolute",
                    top: "20%",
                    left: "40%",

                    transform: "rotate(90deg)",
                  }}
                />
                <hr
                  style={{
                    borderColor: "#38C7E7",
                    width: "220px",
                    position: "absolute",
                    bottom: "20%",
                    left: "40%",

                    transform: "rotate(90deg)",
                  }}
                />
              </VStack>
            </VStack>
          </VStack>
        </Container>
      </Box>
      <Box width={"full"} position={"relative"}>
        <Container
          py={"70px"}
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
          px={"40px"}
          background={
            "linear-gradient(234.75deg, #7CA6F8 -8.55%, #DFF7F4 34.87%, #DCE6F9 75.49%, #F7FCFD 110.11%)"
          }
        >
          <VStack
            color={"#121212"}
            alignItems={"flex-start"}
            gap={"40px"}
            position={"relative"}
          >
            <VStack position={"relative"} alignItems={"flex-start"}>
              {" "}
              <Text
                textTransform={"uppercase"}
                fontWeight={"700"}
                fontSize={["28px", "32px", "48px", "48px"]}
              >
                Create your Gift card
              </Text>
              <Text fontSize={"24px"} maxWidth={"600px"}>
                Send Crypto to your Friends and Family in Style - Create Bitcoin
                Giftcards in Seconds here at BitGifty!
              </Text>
            </VStack>
            <Button
              _hover={{ color: "#fff", background: "brand.700" }}
              onClick={() => navigate("/register")}
            >
              Get started
            </Button>
          </VStack>
        </Container>
        <Image
          position="absolute"
          src="/assets/images/apphero.png"
          width={"450px"}
          right={190}
          bottom={0}
          display={["none", "none", "block", "block"]}
        />
      </Box>
      <Box
        width={"full"}
        position={"relative"}
        py={"40px"}
        backgroundSize={"cover"}
        backgroundPosition={"left center"}
        backgroundImage={[
          "url(/assets/images/confettibg2.png)",
          "url(/assets/images/confettibg2.png)",
          "none",
        ]}
        ref={howItWorks}
      >
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
        >
          <VStack
            alignItems={"flex-start"}
            gap={"40px"}
            width={"full"}
            position={"relative"}
          >
            <HStack
              width={"full"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              position={"relative"}
              flexDir={["column", "column", "row", "row"]}
            >
              <VStack alignItems={"flex-start"}>
                <Text
                  fontSize={["32px", "32px", "40px", "48px"]}
                  fontWeight={"700"}
                >
                  How it works
                </Text>
                <Image
                  width={"380px"}
                  src={"/assets/images/male-hero.png"}
                  display={["none", "none", "block", "block"]}
                />
              </VStack>
              <VStack
                alignItems={"flex-start"}
                gap={"20px"}
                position={"relative"}
              >
                <Text
                  fontSize={["16px", "16px", "24px", "24px"]}
                  maxW={"500px"}
                >
                  Here are 4 simple steps on how to use BitGifty
                </Text>
                <VStack
                  width={"full"}
                  alignItems={["center", "center", "flex-start", "flex-start"]}
                  gap={"30px"}
                >
                  <GuideCard
                    index={1}
                    title={"choose cryptocurrency"}
                    description={"Select the cryptocurrency you want to gift."}
                    image={"/assets/images/choosecoin.jpg"}
                  />
                  <GuideCard
                    index={2}
                    title={"Select gift card value"}
                    description={
                      "Choose the value of the gift card you want to buy.."
                    }
                    image={"/assets/images/inputamount.jpg"}
                  />
                  <GuideCard
                    index={3}
                    title={"Personalize the gift card"}
                    description={
                      "Add a personal message and choose a design for the gift card."
                    }
                    image={"/assets/images/giftcard.jpg"}
                  />
                  <GuideCard
                    index={4}
                    title={"Buy Gift Card "}
                    description={"Click on the 'create gift card' button"}
                    image={"/assets/images/giftcard.jpg"}
                  />
                  <hr
                    style={{
                      borderColor: "#38C7E7",
                      width: "50px",
                      transform: "rotate(90deg)",
                      position: "absolute",
                      top: "30%",
                      left: "0",
                    }}
                  />
                  <hr
                    style={{
                      borderColor: "#38C7E7",
                      width: "50px",
                      transform: "rotate(90deg)",
                      position: "absolute",
                      top: "53%",
                      left: "0",
                    }}
                  />
                  <hr
                    style={{
                      borderColor: "#38C7E7",
                      width: "50px",
                      transform: "rotate(90deg)",
                      position: "absolute",
                      top: "75.5%",
                      left: "0",
                    }}
                  />
                </VStack>
              </VStack>
            </HStack>
          </VStack>
          <HStack
            width={"full"}
            flexDir={["column", "column", "row", "row"]}
            background={
              "linear-gradient(234.75deg, #7CA6F8 -8.55%, #DFF7F4 34.87%, #DCE6F9 75.49%, #F7FCFD 110.11%)"
            }
            padding={"20px"}
            gap={"20px"}
            borderRadius={"30px"}
            mt={"100px"}
          >
            <Image
              src="assets/images/mobile-hero.png"
              width={["150px", "150px", "350px", "350px"]}
            />
            <VStack gap={"20px"} alignItems={"flex-start"}>
              <Text
                fontSize={["24px", "24px", "48px", "48px"]}
                textTransform={"uppercase"}
                fontWeight={700}
                maxW={"600px"}
                color={"#121212"}
              >
                Introducing Bitgifty for ios and android
              </Text>
              <Text
                color={"#121212"}
                fontSize={["14px", "14px", "24px", "24px"]}
                maxW={"500px"}
              >
                Bitgifty App will soon available for download on mobile devices
                around the world on the App & Play Stores.
              </Text>
            </VStack>
          </HStack>
        </Container>
      </Box>
      <Box
        width={"full"}
        position={"relative"}
        py={"40px"}
        bgColor={"#EDFAFD"}
        bgImg={"url(assets/images/bgstars.png)"}
        bgSize={"contain"}
        bgRepeat={"no-repeat"}
        bgPosition={"left"}
        ref={faq}
      >
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
        >
          <VStack width={"full"}>
            <Text textAlign={"center"} fontSize={"48px"} fontWeight={"700"}>
              FAQ
            </Text>
            <Accordion allowToggle width={"full"}>
              <AccordionItem
                bg={"#C6E3F5"}
                alignItems={"flex-start"}
                width={"full"}
                p={"10px"}
                border={"2px solid #103D96"}
                borderRadius={"10px"}
                my={"10px"}
              >
                <AccordionButton _hover={{ bg: "none" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize={"16px"} fontWeight={"500"}>
                      How long does it take too create and redeem gift cards?
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    Literally seconds. You can create any gIft card very quickly
                    in just a few steps.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                bg={"#C6E3F5"}
                alignItems={"flex-start"}
                width={"full"}
                p={"10px"}
                border={"2px solid #103D96"}
                borderRadius={"10px"}
                my={"10px"}
              >
                <AccordionButton _hover={{ bg: "none" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize={"16px"} fontWeight={"500"}>
                      What crypto do you support?
                    </Text>{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    At the moment, you can create gift cards with Bitcoin (BTC),
                    Ethereum (ETH), Tron (TRX) and Celo. We are currently
                    working tirelessly on adding more cryptocurrencies.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                bg={"#C6E3F5"}
                alignItems={"flex-start"}
                width={"full"}
                p={"10px"}
                border={"2px solid #103D96"}
                borderRadius={"10px"}
                my={"10px"}
              >
                <AccordionButton _hover={{ bg: "none" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize={"16px"} fontWeight={"500"}>
                      How much gift card can I create?
                    </Text>{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    You can create as many gift cards as you want in any amount
                    that you like.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                bg={"#C6E3F5"}
                alignItems={"flex-start"}
                width={"full"}
                p={"10px"}
                border={"2px solid #103D96"}
                borderRadius={"10px"}
                my={"10px"}
              >
                <AccordionButton _hover={{ bg: "none" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize={"16px"} fontWeight={"500"}>
                      I don't see the gift card design of my choice, can I
                      customise my disign?
                    </Text>{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    Definitely. You can reach out to the BitGifty team and we
                    will create a design specially for you."
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
          <Ruler />
        </Container>
      </Box>

      <Box width={"full"} py={"40px"}>
        <Container maxWidth={["full", "full", "95%", "80%"]}>
          <HStack
            flexDir={["column", "column", "row", "row"]}
            gap={"20px"}
            width={"full"}
            justifyContent={"space-between"}
          >
            <VStack width={"full"} alignItems={"flex-start"}>
              <Text
                fontSize={["24px", "24px", "32px"]}
                fontWeight={"700"}
                textTransform={"uppercase"}
              >
                Bitgifty
              </Text>
              <Text fontSize={["14px", "14px", "16px"]} fontWeight={"500"}>
                Give the Gift of Choice: Create and redeem your crypto gift
                cards here at Gifty!
              </Text>
            </VStack>
            <HStack
              flexDir={["column", "column", "row", "row"]}
              justifyContent={"space-between"}
              width={"full"}
              gap={"20px"}
            >
              <VStack width={"full"} alignItems={"flex-start"}>
                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"}>
                  Legal
                </Text>
                <Link style={{ fontSize: "14px" }}>Privacy Policy</Link>
                <Link style={{ fontSize: "14px" }}>Help Center</Link>
                <Link style={{ fontSize: "14px" }}>Terms and Condition</Link>
              </VStack>
              <VStack width={"full"} alignItems={"flex-start"}>
                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"}>
                  Company
                </Text>
                <Link>FAQ</Link>
                <Link>About Us</Link>
                <Link>Contact Us</Link>
              </VStack>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </VStack>
  );
};

export default Home;

const InfoCard = (props) => {
  return (
    <VStack alignItems={["center", "center", "flex-start", "flex-start"]}>
      <HStack
        padding={"10px"}
        background={
          "linear-gradient(234.75deg, #7CA6F8 -8.55%, #DFF7F4 34.87%, #DCE6F9 75.49%, #F7FCFD 110.11%)"
        }
        borderRadius={"50%"}
      >
        <HStack padding={"15px"} background={"brand.700"} borderRadius={"50%"}>
          <Image width={"32px"} src={props.icon} />
        </HStack>
      </HStack>
      <hr style={{ borderColor: "rgba(71, 127, 235, 1)", width: "200px" }} />
      <VStack
        alignItems={["center", "center", "flex-start", "flex-start"]}
        color={" #121212"}
        maxW={"350px"}
      >
        <Text
          textTransform={"uppercase"}
          textAlign={["center", "center", "left", "left"]}
          fontSize={["16px", "18px", "24px", "24px"]}
          fontWeight={"700"}
          as={motion.div}
          animation={animation}
        >
          {" "}
          {props.title}
        </Text>
        <VStack
          alignItems={["center", "center", "flex-start", "flex-start"]}
          gap={0}
        >
          <Text
            textAlign={["center", "center", "left", "left"]}
            fontSize={"14px"}
            as={motion.div}
            animation={animation}
          >
            {props.description}
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
};
const AboutCard = (props) => {
  return (
    <HStack
      alignItems={"flex-start"}
      gap={"20px"}
      flexDir={["column", "column", "row", "row"]}
    >
      <HStack padding={"15px"} background={"brand.700"} borderRadius={"10px"}>
        <Image width={"32px"} src={props.icon} />
      </HStack>

      <VStack alignItems={"flex-start"} color={"#000"} maxW={"350px"}>
        <Text textTransform={"uppercase"} fontSize={"24px"} fontWeight={"700"}>
          {" "}
          {props.title}
        </Text>
        <Text fontSize={["14px", "14px", "18px", "18px"]}>
          {props.description}
        </Text>
      </VStack>
    </HStack>
  );
};
const GuideCard = (props) => {
  return (
    <HStack
      alignItems={["center", "center", "flex-start"]}
      gap={"20px"}
      height={["", "", "", "", "100px"]}
      boxSizing={["", "", "", "", "border-box"]}
      flexDir={["column", "column", "row", "row"]}
    >
      <HStack
        width={"50px"}
        height={"50px"}
        border={"1px solid #38C7E7"}
        borderRadius={"50%"}
        justifyContent={"center"}
      >
        <Text fontSize={"24px"} fontWeight={"400"}>
          {" "}
          {props.index}
        </Text>
      </HStack>

      <VStack
        alignItems={["center", "center", "flex-start"]}
        color={"#000"}
        maxW={"350px"}
      >
        <Image
          display={["inline-block", "inline-block", "none", "none"]}
          width={"300px"}
          borderRadius={"10px"}
          src={props.image}
        />
        <Text
          textTransform={"capitalize"}
          fontSize={["16px", "18px", "24px", "24px"]}
          fontWeight={"700"}
        >
          {" "}
          {props.title}
        </Text>
        <Text
          maxW={"300px"}
          textAlign={["center", "center", "left", "left"]}
          fontSize={"14px"}
        >
          {props.description}
        </Text>
      </VStack>
    </HStack>
  );
};
const ResultCard = ({ text, value }) => {
  return (
    <VStack
      borderRadius={["50%", "50%", "100px", "10px"]}
      width={["150px", "150px", "250px", "300px"]}
      height={["150px", "150px", "250px", "300px"]}
      justifyContent={"center"}
      background={"#EDFAFD"}
      cursor={"pointer"}
    >
      <Text
        fontSize={["32px", "32px", "42px", "64px"]}
        lineHeight={["30px", "30px", "78px", "80px"]}
        fontWeight={"600"}
      >
        {value}
      </Text>
      <Text
        textAlign={["center", "center", "", "", ""]}
        maxW={["100px", "100px", "300px", "300px", "400px"]}
        fontSize={["16px", "18px", "24px", "24px"]}
        fontWeight={"600"}
      >
        {text}
      </Text>
    </VStack>
  );
};

const Accordio = () => {
  const [openAccordion, setOpenAccordion] = useState(false);
  return (
    <VStack
      bg={"#C6E3F5"}
      alignItems={"flex-start"}
      width={"full"}
      p={"10px"}
      border={"2px solid #103D96"}
      borderRadius={"10px"}
    >
      <HStack justify={"space-between"} width={"full"}>
        <Text fontSize={"16px"} fontWeight={"500"} maxWidth={"800px"}>
          How long does it take for gift cards to be delivered to recipients?
        </Text>
        <PlusSquareIcon
          fontSize={"24px"}
          onClick={() => setOpenAccordion(!openAccordion)}
        />
      </HStack>
      {openAccordion && (
        <Text fontSize={"16px"} height={"0px"} transition={"height 0.4s "}>
          Give the Gift of Choice: Create and redeem your crypto gift cards here
          at Gifty! Give the Gift of Choice
        </Text>
      )}
    </VStack>
  );
};

const Ruler = (props) => {
  return (
    <Box
      as={motion.div}
      height={"2px"}
      bg={"#38C7E7"}
      width={props.width}
      position={"absolute"}
      top={props.top}
      bottom={props.bottom}
      left={props.left}
      right={props.right}
      transform={`rotate(${props.degree})`}
    ></Box>
  );
};
