import { motion } from 'framer-motion';

export default function InteractiveButton({ children, onClick, variant = 'primary' }) {
  const variants = {
    primary: 'bg-white bg-opacity-20 border-2 border-white hover:bg-opacity-30',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${variants[variant]}`}
    >
      {children}
    </motion.button>
  );
}