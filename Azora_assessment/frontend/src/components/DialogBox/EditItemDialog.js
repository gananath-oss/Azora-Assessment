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

const EditItemDialog = ({ isOpen, onClose, item, onItemUpdated }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);
  const [isSaved, setIsSaved] = useState(false); // State to trigger useEffect

  const toast = useToast();

  useEffect(() => {
    if (isSaved) {
      handleEdit();
      setIsSaved(false); // Reset the save state
    }
  }, [isSaved]); // Effect runs when 'isSaved' changes

  const handleEdit = async () => {
    const updatedData = { name, description, quantity, price };
    try {
      await axios.patch(`api/items/${item._id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo"))?.token
          }`,
        },
        withCredentials: true,
      });
      onItemUpdated(item._id, updatedData);
      toast({
        title: "Item updated",
        description: "The item has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error updating item",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSaveClick = () => {
    setIsSaved(true); // Trigger the useEffect by updating 'isSaved'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Item</ModalHeader>
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
          <Button colorScheme="blue" mr={3} onClick={handleSaveClick}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditItemDialog;
