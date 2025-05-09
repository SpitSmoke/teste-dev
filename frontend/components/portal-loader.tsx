"use client"

import { motion } from "framer-motion"

export default function PortalLoader() {
  return (
    <div className="flex justify-center items-center py-10">
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-primary portal-glow portal-spin"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full rounded-full bg-primary/30" />
      </motion.div>
      <span className="sr-only">Carregando...</span>
    </div>
  )
}
