'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function BottomDrawer({ isOpen, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-lg overflow-auto max-h-[90vh]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
