import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import BackgroundCircles from "./BackgroundCircles";
import Link from "next/link";
import { PageInfo } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  pageInfo: PageInfo;
};

const Hero = ({ pageInfo }: Props) => {
  const [text, count] = useTypewriter({
    words: [
      `Hi, THe Name's ${pageInfo?.name}`,
      "Guy-who-loves-Coffee.ts",
      "<ButLovesToCodeMore/>",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden"
    >
      <div className="mt-[8rem]">
        <BackgroundCircles />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative">
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/10 rounded-full blur-2xl" />

          {/* Image with enhanced styling */}
          <img
            className="relative rounded-full h-32 w-32 mx-auto object-cover border-4 border-red-400/40 shadow-2xl"
            src={urlFor(pageInfo?.heroImage).url()}
            alt=""
          />

          {/* Rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-400 border-r-red-400/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="z-20"
      >
        {/* Role */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm uppercase text-gray-400 pb-2 tracking-[10px] md:tracking-[15px] font-semibold"
        >
          {pageInfo?.role}
        </motion.h2>

        {/* Main heading with typewriter */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-2xl md:text-4xl lg:text-6xl font-bold px-10 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent"
        >
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="rgb(239 68 68)" />
        </motion.h1>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="pt-6 md:pt-8 w-full max-w-2xl flex flex-wrap justify-center gap-3 md:gap-6 lg:gap-8 px-4"
        >
          <Link href="#about">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="text-gray-300 hover:text-red-400 font-medium text-xs md:text-sm lg:text-base px-3 md:px-4 py-2 border-b-2 border-transparent hover:border-red-400 transition-all duration-200 whitespace-nowrap"
            >
              About
            </motion.button>
          </Link>

          <Link href="#experience">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="text-gray-300 hover:text-red-400 font-medium text-xs md:text-sm lg:text-base px-3 md:px-4 py-2 border-b-2 border-transparent hover:border-red-400 transition-all duration-200 whitespace-nowrap"
            >
              Experience
            </motion.button>
          </Link>

          <Link href="#skills">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="text-gray-300 hover:text-red-400 font-medium text-xs md:text-sm lg:text-base px-3 md:px-4 py-2 border-b-2 border-transparent hover:border-red-400 transition-all duration-200 whitespace-nowrap"
            >
              Skills
            </motion.button>
          </Link>

          <Link href="#projects">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="text-gray-300 hover:text-red-400 font-medium text-xs md:text-sm lg:text-base px-3 md:px-4 py-2 border-b-2 border-transparent hover:border-red-400 transition-all duration-200 whitespace-nowrap"
            >
              Projects
            </motion.button>
          </Link>

          <a href="/Abdul-Fattah Abdul-Kareem_CV.pdf" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="text-red-400 hover:text-red-300 font-medium text-xs md:text-sm lg:text-base px-3 md:px-4 py-2 border-b-2 border-red-400/50 hover:border-red-400 transition-all duration-200 whitespace-nowrap"
            >
              Resume
            </motion.button>
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
