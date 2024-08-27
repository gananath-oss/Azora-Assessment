import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ItemsState } from "../Context/ItemsProvider";
import LoadingIndicator from "../components/LoadingIndicator";
import AnimatedButton from "../components/AnimatedButton";

const HomePage = () => {
  const { user } = ItemsState();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleLearnMore = () => {
    setLoading(true);
    setShowText(false);

    setTimeout(() => {
      setLoading(false);
      setShowText(true);
    }, 2000);
  };

  const handleNavigate = () => {
    navigate("/items");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%" }}
    >
      {user && <SideDrawer />}

      {user ? (
        <>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="90vh"
            p={4}
          >
            <Text fontSize="4xl" mb={4}>
              Welcome to Home Page
            </Text>
            <Stack spacing={4} direction="row">
              <AnimatedButton colorScheme="blue" onClick={handleNavigate}>
                Get Started
              </AnimatedButton>
              <AnimatedButton colorScheme="green" onClick={handleLearnMore}>
                Learn More
              </AnimatedButton>
            </Stack>

            {loading && <LoadingIndicator />}
            {showText && (
              <Text m={10} fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum consectetur, tortor nec vehicula fermentum, libero
                metus egestas erat, at sodales turpis lectus et ante. Nulla
                facilisi. Aliquam erat volutpat. Donec ac lacus ac odio varius
                facilisis. Quisque scelerisque ex vel metus sodales, at tempor
                arcu vulputate. In hac habitasse platea dictumst. Fusce euismod
                ligula in mauris suscipit, sit amet hendrerit lorem aliquam. Sed
                eu gravida ligula. Nullam facilisis purus non interdum dictum.
                Maecenas ac risus eget felis iaculis facilisis. Vestibulum
                tincidunt arcu at libero vehicula, sit amet dignissim ligula
                dapibus. Curabitur eget tortor sagittis, varius ligula sed,
                scelerisque turpis. Sed suscipit odio ut orci luctus, sed
                scelerisque felis vestibulum. Integer euismod justo nec nisl
                laoreet, in scelerisque risus ultrices. Nunc auctor magna ut
                velit suscipit, sed varius dolor convallis. Praesent aliquet
                massa nec erat venenatis, sit amet hendrerit ex consectetur.
                Vestibulum auctor mauris quis turpis dapibus, id elementum odio
                volutpat. Sed nec eros ac tortor efficitur cursus non sit amet
                nisl. Fusce sed interdum sem. Vivamus fringilla, odio ut
                faucibus fringilla, est erat tempus nisl, et viverra lacus urna
                eget erat. Ut et ex sollicitudin, suscipit sapien ut, fermentum
                metus. Proin ultricies purus in nunc tincidunt, eget malesuada
                odio cursus. Nullam tincidunt ante a est dignissim, et
                consectetur urna dapibus. Ut nec dictum lacus. Cras volutpat
                libero sit amet libero tempor, id rutrum neque convallis.
                Vivamus ultricies purus nec orci pharetra, a convallis erat
                faucibus. Pellentesque euismod nunc sed odio venenatis, et
                auctor lacus tincidunt. Integer consectetur orci non neque
                eleifend, sed facilisis sapien posuere. Donec cursus malesuada
                ante, ac dignissim libero feugiat at. Donec consectetur metus et
                risus consequat, et cursus lorem tempor. Duis interdum turpis ac
                fermentum sollicitudin. In ac libero vitae tortor venenatis
                aliquam eget sed libero. Donec volutpat euismod venenatis.
                Suspendisse potenti.
              </Text>
            )}
          </Box>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </motion.div>
  );
};

export default HomePage;
