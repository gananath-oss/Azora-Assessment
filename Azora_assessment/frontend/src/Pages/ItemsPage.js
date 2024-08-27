import React, { useState, useEffect } from "react";
import { ItemsState } from "../Context/ItemsProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Flex,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import EditItemDialog from "../components/DialogBox/EditItemDialog";
import CreateItemDialog from "../components/DialogBox/CreateItemDialog";
import Loading from "../components/LoadingIndicator";

const ItemsPage = () => {
  const { user } = ItemsState();

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const toast = useToast();
  const cancelRef = React.useRef();

  const openEditDialog = (item) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const openCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const openDeleteDialog = (id) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedItem(null);
    setEditDialogOpen(false);
  };

  const closeCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  const handleItemUpdated = (id, updatedData) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  const handleItemCreated = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`api/items/${deleteItemId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo"))?.token
          }`,
        },
        withCredentials: true,
      });
      setItems(items.filter((item) => item._id !== deleteItemId));
      toast({
        title: "Item deleted",
        description: "The item has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setDeleteDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error deleting item",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/items", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo"))?.token
            }`,
          },
          withCredentials: true,
        });
        setItems(data);
      } catch (error) {
        toast({
          title: "Error fetching items",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setLoading(false);
    };

    loadItems();
  }, [toast]);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Flex m={8} justifyContent="right" alignItems="center">
        <Button
          colorScheme="teal"
          leftIcon={<AddIcon />}
          onClick={openCreateDialog}
        >
          Create Item
        </Button>
      </Flex>

      <Box bg="whiteAlpha.800" p={5} borderRadius="md" boxShadow="md" m={20}>
        {loading ? (
          <Loading />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item, index) => (
                <Tr key={item._id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>${item.price}</Td>
                  <Td>
                    <IconButton
                      icon={<EditIcon />}
                      onClick={() => openEditDialog(item)}
                      aria-label="Edit item"
                      mr={2}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => openDeleteDialog(item._id)}
                      aria-label="Delete item"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {selectedItem && (
        <EditItemDialog
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          item={selectedItem}
          onItemUpdated={handleItemUpdated}
        />
      )}

      <CreateItemDialog
        isOpen={isCreateDialogOpen}
        onClose={closeCreateDialog}
        onItemCreated={handleItemCreated}
      />

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default ItemsPage;
