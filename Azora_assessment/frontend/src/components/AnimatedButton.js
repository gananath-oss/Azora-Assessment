import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

const AnimatedButton = ({ children, ...props }) => {
  return (
    <MotionButton
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default AnimatedButton;
