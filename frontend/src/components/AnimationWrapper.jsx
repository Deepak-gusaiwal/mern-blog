import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const AnimationWrapper = ({
  children,
  initial = { y: 20, opacity: 0 },
  animate = { y: 0, opacity: 1 },
  transition = { duration: 0.5 },
}) => {
  return (
    <AnimatePresence>
      <motion.div initial={initial} animate={animate} transition={transition}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
