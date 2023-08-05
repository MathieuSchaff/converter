"use client";
import { motion } from 'framer-motion'
import clsx from "clsx";
export const PageWrapper = ({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring" }}
      className={clsx("min-h-screenHeightWithoutHeader", className)}>
      {children}
    </motion.div>
  )
}
