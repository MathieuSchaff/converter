"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; // Install this package if you haven't yet
import { GiHamburgerMenu } from 'react-icons/gi'; // Hamburger menu icon
import { IoClose } from 'react-icons/io5'; // Close menu icon
import { usePathname } from "next/navigation"
const variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};
const menuVariants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 }
};
const Links = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Coins",
    link: "/coins",
  },
  {
    name: "watch",
    link: "/watch",
  },

  {
    name: "test",
    link: "/test",
  }
];

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (<>
    <nav className="flex md:justify-between md:items-center">
      <ul className="flex gap-6">
        {Links.map((link, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={variants}
            initial="hidden"
            animate="visible"
            className="cursor-pointer uppercase hidden md:block"
          >
            <Link href={link.link} className='relative'>
              {link.link === pathname &&
                <motion.span layoutId="underline" className='absolute left-0 top-full block h-[1px] w-full bg-white' />
              }
              {link.name}</Link>
          </motion.li>
        ))}
        <div className="md:hidden hover:cursor-pointer" onClick={openMenu}>
          {isMenuOpen ? <IoClose size={30} /> : <GiHamburgerMenu size={30} />}
        </div>
      </ul>
    </nav>
    <AnimatePresence>
      {isMenuOpen && (

        <motion.div
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center z-10 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMenu}
        >
          <motion.nav
            className="min-h-0 bg-browney p-8 rounded-md text-darkgrey font-bold flex flex-col justify-center items-center w-1/2 min-w-[250px] h-1/2"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ damping: 300 }}
          >
            <button onClick={closeMenu} className="hover:cursor-pointer self-end z-50 text-honolulu">
              <IoClose size={30} />{" "}
            </button>
            <ul className="flex flex-col gap-8 mt-3">
              {Links.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  className="cursor-pointer uppercase md:hidden"
                >
                  <Link href={link.link} className='relative'>
                    {link.link === pathname &&
                      <motion.span layoutId="underline" className='absolute left-0 top-full block h-[1px] w-full bg-browney' />
                    }
                    {link.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
};

export default Navbar;
