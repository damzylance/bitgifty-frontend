import "./home.css";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  Image,
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

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const Home = () => {
  const navigate = useNavigate();
  return (
    <VStack
      width={"full"}
      background={
        "linear-gradient(234.75deg, #7CA6F8 -8.55%, #DFF7F4 34.87%, #DCE6F9 75.49%, #F7FCFD 110.11%)"
      }
      pt={[0, 0, "40px", "40px"]}
      spacing={0}
    >
      <Box width={"full"}>
        <Container maxWidth={["full", "full", "95%", "80%"]}>
          <VStack width={"full"}>
            <HStack
              width={"full"}
              justifyContent={"space-between"}
              display={["none", "none", "flex", "flex"]}
              alignItems={"cener"}
            >
              <Box>
                <svg
                  width="50"
                  height="59"
                  viewBox="0 0 50 59"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 4.34782C0 1.94659 1.94659 0 4.34783 0H45.6522C48.0534 0 50 1.94659 50 4.34783V45.6522H0V4.34782Z"
                    fill="white"
                  />
                  <path
                    d="M0 51H50V53.7174C50 56.1186 48.0534 58.0652 45.6522 58.0652H4.34783C1.94659 58.0652 0 56.1186 0 53.7174V51Z"
                    fill="white"
                  />
                  <path
                    d="M33.4585 16.3207C33.1991 15.419 32.8347 14.6223 32.3654 13.9306C31.896 13.2265 31.3216 12.6336 30.6423 12.1519C29.9753 11.6579 29.2095 11.2811 28.3449 11.0217C27.4926 10.7624 26.5477 10.6327 25.5101 10.6327C23.5709 10.6327 21.8664 11.1144 20.3965 12.0778C18.939 13.0413 17.8026 14.4432 16.9874 16.2836C16.1722 18.1117 15.7646 20.3473 15.7646 22.9906C15.7646 25.6339 16.166 27.8819 16.9689 29.7347C17.7717 31.5875 18.9081 33.0017 20.378 33.9775C21.8478 34.941 23.5833 35.4227 25.5842 35.4227C27.4 35.4227 28.9501 35.1015 30.2347 34.4592C31.5316 33.8046 32.5198 32.8844 33.1991 31.6986C33.8908 30.5128 34.2367 29.1109 34.2367 27.4928L35.8671 27.7337H26.0845V21.6937H41.9627V26.4738C41.9627 29.8088 41.2586 32.6744 39.8505 35.0707C38.4424 37.4545 36.5032 39.295 34.0329 40.5919C31.5625 41.8765 28.7339 42.5188 25.5472 42.5188C21.9899 42.5188 18.8649 41.7344 16.1722 40.1658C13.4795 38.5847 11.3797 36.3429 9.87278 33.4402C8.37821 30.5252 7.63093 27.0667 7.63093 23.0647C7.63093 19.9891 8.07559 17.247 8.96492 14.8384C9.8666 12.4175 11.1265 10.3671 12.7446 8.68725C14.3626 7.00741 16.2463 5.729 18.3955 4.85202C20.5447 3.97505 22.873 3.53656 25.3804 3.53656C27.5296 3.53656 29.5306 3.85153 31.3834 4.48147C33.2362 5.09906 34.879 5.97604 36.3118 7.1124C37.7569 8.24876 38.9365 9.60128 39.8505 11.17C40.7646 12.7263 41.3513 14.4432 41.6107 16.3207H33.4585Z"
                    fill="#103D96"
                  />
                  <path
                    d="M33.4585 16.3207L32.4139 16.6212L32.6401 17.4076H33.4585V16.3207ZM32.3654 13.9306L31.4609 14.5335L31.4659 14.5409L32.3654 13.9306ZM30.6423 12.1519L29.9953 13.0254L30.0044 13.0321L30.0136 13.0386L30.6423 12.1519ZM28.3449 11.0217L28.0284 12.0616L28.0325 12.0629L28.3449 11.0217ZM20.3965 12.0778L19.8006 11.1687L19.7971 11.1711L20.3965 12.0778ZM16.9874 16.2836L17.9801 16.7263L17.9812 16.7238L16.9874 16.2836ZM20.378 33.9775L19.7768 34.8831L19.7821 34.8866L20.378 33.9775ZM30.2347 34.4592L30.7208 35.4314L30.7245 35.4296L30.2347 34.4592ZM33.1991 31.6986L32.2602 31.1509L32.256 31.1583L33.1991 31.6986ZM34.2367 27.4928L34.3955 26.4175L33.1497 26.2335V27.4928H34.2367ZM35.8671 27.7337V28.8207L36.0259 26.6584L35.8671 27.7337ZM26.0845 27.7337H24.9975V28.8207H26.0845V27.7337ZM26.0845 21.6937V20.6067H24.9975V21.6937H26.0845ZM41.9627 21.6937H43.0497V20.6067H41.9627V21.6937ZM39.8505 35.0707L40.7864 35.6235L40.7877 35.6213L39.8505 35.0707ZM34.0329 40.5919L34.5343 41.5563L34.5381 41.5543L34.0329 40.5919ZM16.1722 40.1658L15.6218 41.1031L15.625 41.105L16.1722 40.1658ZM9.87278 33.4402L8.90553 33.9361L8.90807 33.941L9.87278 33.4402ZM8.96492 14.8384L7.94632 14.4591L7.94525 14.4619L8.96492 14.8384ZM12.7446 8.68725L13.5274 9.44132L12.7446 8.68725ZM18.3955 4.85203L17.9848 3.84563L18.3955 4.85203ZM31.3834 4.48147L31.0335 5.51059L31.0397 5.51265L31.3834 4.48147ZM36.3118 7.1124L35.6363 7.96404L35.6399 7.96684L36.3118 7.1124ZM39.8505 11.17L38.9114 11.7172L38.9133 11.7204L39.8505 11.17ZM41.6107 16.3207V17.4076H42.8581L42.6874 16.1719L41.6107 16.3207ZM34.5031 16.0202C34.2158 15.0215 33.806 14.1178 33.2648 13.3203L31.4659 14.5409C31.8635 15.1268 32.1824 15.8164 32.4139 16.6212L34.5031 16.0202ZM33.2698 13.3276C32.7278 12.5148 32.0606 11.8251 31.271 11.2653L30.0136 13.0386C30.5827 13.4421 31.0642 13.9383 31.461 14.5335L33.2698 13.3276ZM31.2893 11.2785C30.5128 10.7033 29.6317 10.273 28.6572 9.98062L28.0325 12.0629C28.7873 12.2893 29.4378 12.6124 29.9953 13.0254L31.2893 11.2785ZM28.6613 9.98188C27.6912 9.68662 26.6377 9.5457 25.5101 9.5457V11.7196C26.4577 11.7196 27.294 11.8381 28.0284 12.0616L28.6613 9.98188ZM25.5101 9.5457C23.3819 9.5457 21.4657 10.0774 19.8006 11.1687L20.9924 12.9869C22.267 12.1514 23.7599 11.7196 25.5101 11.7196V9.5457ZM19.7971 11.1711C18.1411 12.2657 16.8799 13.8425 15.9936 15.8434L17.9812 16.7238C18.7254 15.0438 19.7369 13.8168 20.9959 12.9846L19.7971 11.1711ZM15.9947 15.8409C15.1008 17.8453 14.6776 20.2414 14.6776 22.9906H16.8515C16.8515 20.4533 17.2435 18.378 17.9801 16.7263L15.9947 15.8409ZM14.6776 22.9906C14.6776 25.7388 15.0943 28.1425 15.9715 30.1669L17.9662 29.3025C17.2377 27.6213 16.8515 25.529 16.8515 22.9906H14.6776ZM15.9715 30.1669C16.8455 32.1838 18.1076 33.775 19.7768 34.8831L20.9791 33.0719C19.7086 32.2285 18.6979 30.9911 17.9662 29.3025L15.9715 30.1669ZM19.7821 34.8866C21.4527 35.9816 23.4017 36.5096 25.5842 36.5096V34.3357C23.7648 34.3357 22.243 33.9003 20.9738 33.0684L19.7821 34.8866ZM25.5842 36.5096C27.5253 36.5096 29.2507 36.1665 30.7208 35.4314L29.7486 33.487C28.6495 34.0366 27.2746 34.3357 25.5842 34.3357V36.5096ZM30.7245 35.4296C32.1988 34.6854 33.3503 33.6212 34.1423 32.239L32.256 31.1583C31.6892 32.1476 30.8645 32.9238 29.7449 33.4889L30.7245 35.4296ZM34.138 32.2463C34.9428 30.8667 35.3236 29.2687 35.3236 27.4928H33.1497C33.1497 28.9531 32.8389 30.159 32.2602 31.1509L34.138 32.2463ZM34.0778 28.5681L35.7082 28.809L36.0259 26.6584L34.3955 26.4175L34.0778 28.5681ZM35.8671 26.6467H26.0845V28.8207H35.8671V26.6467ZM27.1714 27.7337V21.6937H24.9975V27.7337H27.1714ZM26.0845 22.7806H41.9627V20.6067H26.0845V22.7806ZM40.8757 21.6937V26.4738H43.0497V21.6937H40.8757ZM40.8757 26.4738C40.8757 29.654 40.2055 32.3212 38.9134 34.52L40.7877 35.6213C42.3118 33.0276 43.0497 29.9636 43.0497 26.4738H40.8757ZM38.9147 34.5178C37.6101 36.7264 35.8206 38.4257 33.5276 39.6295L34.5381 41.5543C37.1858 40.1642 39.2748 38.1826 40.7864 35.6235L38.9147 34.5178ZM33.5314 39.6275C31.237 40.8206 28.5848 41.4318 25.5472 41.4318V43.6057C28.8831 43.6057 31.888 42.9323 34.5343 41.5563L33.5314 39.6275ZM25.5472 41.4318C22.1544 41.4318 19.2235 40.6854 16.7193 39.2266L15.625 41.105C18.5062 42.7834 21.8253 43.6057 25.5472 43.6057V41.4318ZM16.7225 39.2284C14.2149 37.756 12.2548 35.6695 10.8375 32.9394L8.90807 33.941C10.5046 37.0163 12.7441 39.4134 15.6218 41.1031L16.7225 39.2284ZM10.84 32.9443C9.43969 30.2131 8.71789 26.9319 8.71789 23.0647H6.54397C6.54397 27.2015 7.31673 30.8373 8.90554 33.9361L10.84 32.9443ZM8.71789 23.0647C8.71789 20.0929 9.1476 17.4818 9.98459 15.2149L7.94525 14.4619C7.00358 17.0123 6.54397 19.8854 6.54397 23.0647H8.71789ZM9.98352 15.2178C10.8388 12.9215 12.0234 11.0027 13.5274 9.44132L11.9617 7.93318C10.2295 9.73146 8.89442 11.9135 7.94632 14.4591L9.98352 15.2178ZM13.5274 9.44132C15.0409 7.87007 16.7979 6.67787 18.8062 5.85842L17.9848 3.84563C15.6946 4.78013 13.6844 6.14475 11.9617 7.93319L13.5274 9.44132ZM18.8062 5.85842C20.8149 5.03878 23.0024 4.62352 25.3804 4.62352V2.4496C22.7436 2.4496 20.2746 2.91131 17.9848 3.84563L18.8062 5.85842ZM25.3804 4.62352C27.4223 4.62352 29.3039 4.92252 31.0335 5.51057L31.7333 3.45237C29.7573 2.78054 27.637 2.4496 25.3804 2.4496V4.62352ZM31.0397 5.51265C32.7805 6.09292 34.3093 6.9116 35.6363 7.96403L36.9872 6.26077C35.4486 5.04048 33.6919 4.10521 31.7271 3.45029L31.0397 5.51265ZM35.6399 7.96684C36.9788 9.01965 38.0672 10.2684 38.9114 11.7172L40.7897 10.6227C39.8058 8.93421 38.535 7.47788 36.9836 6.25796L35.6399 7.96684ZM38.9133 11.7204C39.7512 13.1472 40.2931 14.7265 40.5339 16.4694L42.6874 16.1719C42.4094 14.1599 41.7779 12.3054 40.7878 10.6195L38.9133 11.7204ZM41.6107 15.2337H33.4585V17.4076H41.6107V15.2337Z"
                    fill="white"
                  />
                </svg>
              </Box>
              <HStack gap={"40px"} alignItems={"center"}>
                <Text fontSize={"18px"}>How it works</Text>
                <Text fontSize={"18px"}>About </Text>
                <Text fontSize={"18px"}>FAQ</Text>
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
          <HStack flexDir={["column", "column", "row", "row"]} gap={"20px"}>
            <VStack
              alignItems={"flex-start"}
              width={["300px", "300px", "500px", "895px"]}
              position={"relative"}
              gap={5}
              as={motion.div}
              animation={animation}
            >
              <Text
                fontSize={["38px", "40px", "42px", "52px"]}
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
              <Button size={"lg"}>Get Started</Button>
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
      <Box width={"full"} background={"brand.700"} py={"40px"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "200px", "200px"]}
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
      <Box width={"full"} position="relative" pb={"100px"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
        >
          <VStack position={"relative"} width={"full"} gap={"80px"}>
            <HStack
              background={"url(/assets/images/pattern_img.png)"}
              position={["relative", "relative", "absolute", "absolute"]}
              bgRepeat={"no-repeat"}
              backgroundSize={["cover", "cover", "cover", "90%"]}
              top={[null, null, "-80px", "-100px"]}
              gap={"40px"}
              justifyContent={["center"]}
              // flexDir={["column", "column", "row", "row"]}
              wrap={"wrap"}
            >
              <ResultCard />
              <ResultCard />
              <ResultCard />
            </HStack>
            <VStack width={"full"}>
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
                gap={"40px"}
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
                    title={"For Loyalty Programs"}
                    description={
                      "How do you say 'thank you' to your loyal staffs and customers? BitGifty provides a creative and seamless way for you to reward them. All you need to is choose your customised Gift card design and create as many gift cards as you want in a few clicks."
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
                    borderColor:
                      "radial-gradient(55.49% 78.03% at 50% 50%, #103D96 0%, #477FEB 41.53%, #74D5DE 100%)",
                    width: "450px",
                    position: "absolute",
                    top: "50%",
                  }}
                />
                <hr
                  style={{
                    borderColor:
                      "radial-gradient(55.49% 78.03% at 50% 50%, #103D96 0%, #477FEB 41.53%, #74D5DE 100%)",
                    width: "450px",
                    position: "absolute",
                    top: "50%",
                    right: 0,
                  }}
                />
                <hr
                  style={{
                    borderColor:
                      "radial-gradient(55.49% 78.03% at 50% 50%, #103D96 0%, #477FEB 41.53%, #74D5DE 100%)",
                    width: "220px",
                    position: "absolute",
                    top: "20%",
                    left: "40%",

                    transform: "rotate(90deg)",
                  }}
                />
                <hr
                  style={{
                    borderColor:
                      "radial-gradient(55.49% 78.03% at 50% 50%, #103D96 0%, #477FEB 41.53%, #74D5DE 100%)",
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
      <Box
        width={"full"}
        position={"relative"}
        background={
          "radial-gradient(204.5% 204.5% at 42.3% -10.75%, #103D96 0%, rgba(16, 61, 150, 0.84) 46.43%, #16D6E7 94.96%)"
        }
        py={"70px"}
      >
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
        >
          <VStack
            color={"#fff"}
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
            <Button background={"#fff"} color={"brand.700"}>
              Get started
            </Button>
          </VStack>
        </Container>
        <Image
          position="absolute"
          src="/assets/images/apphero.png"
          right={0}
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
                      top: "52%",
                      left: "0",
                    }}
                  />
                  <hr
                    style={{
                      borderColor: "#38C7E7",
                      width: "50px",
                      transform: "rotate(90deg)",
                      position: "absolute",
                      top: "75%",
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
              "radial-gradient(204.5% 204.5% at 42.3% -10.75%, #103D96 0%, rgba(16, 61, 150, 0.84) 46.43%, #16D6E7 94.96%)"
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
                color={"#fff"}
              >
                Introducing Bitgifty for ios and android
              </Text>
              <Text
                color={"#fff"}
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
                      How long does it take for gift cards to be delivered to
                      recipients?
                    </Text>{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    Give the Gift of Choice: Create and redeem your crypto gift
                    cards here at Gifty! Give the Gift of Choice
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
                      How long does it take for gift cards to be delivered to
                      recipients?
                    </Text>{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    Give the Gift of Choice: Create and redeem your crypto gift
                    cards here at Gifty! Give the Gift of Choice
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
                      How long does it take for gift cards to be delivered to
                      recipients?
                    </Text>{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    Give the Gift of Choice: Create and redeem your crypto gift
                    cards here at Gifty! Give the Gift of Choice
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
                      How long does it take for gift cards to be delivered to
                      recipients?
                    </Text>{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    Give the Gift of Choice: Create and redeem your crypto gift
                    cards here at Gifty! Give the Gift of Choice
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
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
        color={"#fff"}
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
          <Text
            as={motion.div}
            animation={animation}
            fontSize={"14px"}
            textDecoration={"underline"}
          >
            Learn More...
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
const ResultCard = () => {
  return (
    <VStack
      borderRadius={["50%", "50%", "100px", "10px"]}
      px={["14px", "14px", "60px", "60px"]}
      py={["36px", "36px", "40px", "80px"]}
      background={"#EDFAFD"}
      cursor={"pointer"}
    >
      <Text
        fontSize={["32px", "32px", "42px", "64px"]}
        lineHeight={["30px", "30px", "78px", "80px"]}
        fontWeight={"600"}
      >
        $1.4B+
      </Text>
      <Text fontSize={["16px", "18px", "24px", "24px"]} fontWeight={"600"}>
        Trade Volume
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