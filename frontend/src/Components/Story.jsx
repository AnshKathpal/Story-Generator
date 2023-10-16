import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components"

export const Story = () => {
  const [displayStory, setDisplayStory] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("https://story-generator-yc65.onrender.com/user/story", {
        keyword: text,
      });

      const generatedStory = response.data;

      setDisplayStory(generatedStory);

      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);
      setError("An error occurred while generating the story.");
    }
  };

  const handleReset = () => {
    setDisplayStory("");
    setText("");
    setLoading(false);
    setError("");
  };

  const isSubmitDisabled = text.trim() === "";

  return (
    <Flex
      bg="#EEEEEE"
      gap={{base : "5" , lg : "20"}}
      direction={"column"}
      h={{base : "100vh", lg : "100vh"}}
      justify={{base : "flex-start" , lg : "center"}}
      align="center"
      p = {{base : "10", lg : "0"}}
    >
      <FormStyle
        onSubmit={handleSubmit}
      >
        <FormControl
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          align="center"
          gap={{base : "5" , lg : "10"}}
        >
          <Box
            fontSize={{base : "4xl" , lg : "5xl"}}
            fontWeight="bold"
            fontFamily="'Great Vibes', cursive"
          >
            Story Generator
          </Box>
          <FormLabel
            fontSize={{base : "l" , lg : "xl"}}
            fontFamily="'Permanent Marker', cursive"
            textAlign={"center"}
            m="auto"
          >
            Please input a keyword to hear a story.
          </FormLabel>
          <Input
            type="text"
            textAlign={"center"}
            fontSize={{base : "l" , lg : "xl"}}
            fontFamily="'Permanent Marker', cursive"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a keyword"
          />
          <Button
            type="submit"
            colorScheme="teal"
            disabled={isSubmitDisabled}
            bg="#3A98B9"
            w={{base : "90%", lg : "20%"}}
            m="auto"
            fontFamily="'Great Vibes', cursive"
            fontSize={"xl"}
          >
            Generate Story
          </Button>
        </FormControl>
      </FormStyle>
      {loading && <Spinner size="lg" mt={4} />}
      {error && <Box color="red">{error}</Box>}
      {displayStory && (
        <>
          <Flex
            gap="7"
            direction={"column"}
            justify="center"
            align="center"
            p="10"
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
            }
            bg="#FFF1DC"
            fontFamily="'Permanent Marker', cursive"
            w={{base : "100%", lg : "70%"}}
            h="auto"
            mt={4}
          >
            {displayStory}
            <Button
              onClick={handleReset}
              bg="#3A98B9"
              colorScheme="teal"
              w={{base : "100%" , lg : "20%"}}
              fontFamily="'Great Vibes', cursive"
              fontSize={"xl"}
            >
              Reset
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};


const FormStyle = styled.form`

padding : 30px;
width : 70%;
background-color : #FFF1DC;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

@media screen and (max-width : 480px){
  padding : 20px;
  width : 100%;
}


`