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

export const Story = () => {
  const [displayStory, setDisplayStory] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/user/story", {
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
      gap="20"
      direction={"column"}
      h="100vh"
      justify={"center"}
      align="center"
    >
      <form
        style={{
          padding: "30px",
          width: "70%",
          backgroundColor: "#FFF1DC",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          align="center"
          gap="10"
        >
          <Box
            fontSize={"5xl"}
            fontWeight="bold"
            fontFamily="'Great Vibes', cursive"
          >
            Story Generator
          </Box>
          <FormLabel
            fontSize={"xl"}
            fontFamily="'Permanent Marker', cursive"
            textAlign={"center"}
            m="auto"
          >
            Please input a keyword to hear a story.
          </FormLabel>
          <Input
            type="text"
            textAlign={"center"}
            fontSize={"xl"}
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
            w="20%"
            m="auto"
            fontFamily="'Great Vibes', cursive"
            fontSize={"xl"}
          >
            Generate Story
          </Button>
        </FormControl>
      </form>
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
            w="70%"
            h="auto"
            mt={4}
          >
            {displayStory}
            <Button
              onClick={handleReset}
              bg="#3A98B9"
              colorScheme="teal"
              w="20%"
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
