import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  const style = {
    backgroundColor: "#ffff",
    borderRadius: '0.75rem',
    color: 'black',
    borderColor: 'black'
  }

  return (
    <VStack spacing={4} alignItems={"left"} style={style}>
      <Image src={imageSrc} alt="My Projects" borderRadius={'xl'} />

      <VStack
        spacing={4} 
        align={"left"}
        style={{
          marginLeft: "3%",
          marginRight: "3%",
          marginBottom: "3%",
          marginTop: "1%"
        }}>
        <Heading as="h4" size="md">{title}</Heading>
        <Text color={"#97a2b1"}>
          {description}
        </Text>
        <HStack>
          <Text>
            See more
          </Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>

      </VStack>
    </VStack>
  );
};

export default Card;
