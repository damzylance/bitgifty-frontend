import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Img,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { RxCaretRight, RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
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
const ContactUs = () => {
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
    <VStack width={"full"} background={"#FAFCFF"} pt={[0, 0, "0px", "0px"]}>
      <Box
        width={"full"}
        position={["relative", "relative", "sticky"]}
        zIndex={"999"}
        top={["none", "none", "0"]}
        left={["none", "none", "0"]}
        p={"10px"}
        background={["brand.700", "brand.700", "#FAFCFF"]}
        boxShadow={["none", "none", "1px 3px 5px -1px rgba(169,170,176,0.47)"]}
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
              <Link to={"/"}>
                <Image
                  width={"150px"}
                  src="/assets/images/logo-inline-whitebg.png"
                />
              </Link>
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
      <Box
        width={"full"}
        position={"relative"}
        px={[0, 0, "20px"]}
        py={"20px"}
        bg={"#EDFAFD"}
        margin={0}
      >
        <Container
          mb={"40px"}
          maxWidth={["full", "full", "50%", "50%"]}
          position={"relative"}
        >
          <VStack width={"full"} alignContent={"flex-start"} gap={"30px"}>
            <VStack width={"full"} alignContent={"flex-start"} gap={"10px"}>
              <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
                We'd Love to help
              </Text>
              <Text fontSize={"sm"}>
                Reach out and we'll get in touch within 24 hours
              </Text>
            </VStack>
            <VStack width={"full"} alignItems={"center"}>
              <HStack
                flexDir={["column", "column", "row"]}
                gap={["30px", "30px", ""]}
                width={"full"}
                justifyContent={"flex-start"}
              >
                <FormControl width={"full"}>
                  <FormLabel>First Name</FormLabel>
                  <Input bg={"#fff"} type="text" placeholder="First Name" />
                </FormControl>
                <FormControl width={"full"}>
                  <FormLabel>Last Name</FormLabel>
                  <Input bg={"#fff"} type="text" placeholder="Last Name" />
                </FormControl>
              </HStack>
            </VStack>
            <FormControl width={"full"}>
              <FormLabel>Email</FormLabel>
              <Input bg={"#fff"} type="email" placeholder="Email Address" />
            </FormControl>
            <FormControl width={"full"}>
              <FormLabel>Message</FormLabel>
              <Textarea bg={"#fff"} placeholder="Leave us a message...." />
            </FormControl>
            <Button width={"full"}>Send Message</Button>
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
                <Link to={"/contact-us"}>Contact Us</Link>
              </VStack>
              <VStack width={"full"} alignItems={"center"}>
                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"}>
                  Socials
                </Text>
                <a href={"https://twitter.com/BitGifty"}>
                  <AiFillTwitterSquare fontSize={"24px"} />
                </a>
                <a href={"https://www.instagram.com/bitgifty/"}>
                  <AiFillFacebook fontSize={"24px"} />
                </a>
                <a href={"https://www.linkedin.com/company/bitgifty/"}>
                  <AiFillLinkedin fontSize={"24px"} />
                </a>
              </VStack>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </VStack>
  );
};

export default ContactUs;
