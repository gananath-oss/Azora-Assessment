import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const CreateItemDialog = ({ isOpen, onClose, onItemCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (isSaved) {
      handleCreate();
      setIsSaved(false);
    }
  }, [isSaved]);

  const handleCreate = async () => {
    const newItem = { name, description, quantity, price };
    try {
      const { data } = await axios.post("/api/items", newItem, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo"))?.token
          }`,
        },
        withCredentials: true,
      });
      onItemCreated(data);
      toast({
        title: "Item created",
        description: "The item has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error creating item",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCreateClick = () => {
    setIsSaved(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="description" mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl id="quantity" mt={4}>
            <FormLabel>Quantity</FormLabel>
            <Input
              defaultValue={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FormControl>
          <FormControl id="price" mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreateClick}>
            Create
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateItemDialog;
