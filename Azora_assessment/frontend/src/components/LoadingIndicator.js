import { Spinner, Box } from "@chakra-ui/react";

const LoadingIndicator = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Spinner
        thickness="4px"
        speed="0.90s"
        emptyColor="gray.200"
        color="purple.500"
        size="xl"
      />
    </Box>
  );
};

export default LoadingIndicator;
