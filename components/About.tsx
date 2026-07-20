import React from "react";
import { motion } from "framer-motion";
import { PageInfo } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  pageInfo: PageInfo;
};

const About = ({ pageInfo }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full py-20 px-4 md:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-red-300 to-red-200 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-red-400 to-transparent" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/15 to-red-600/5 rounded-3xl blur-3xl" />

            {/* Image container with premium border */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <div className="relative w-72 h-80 md:w-96 md:h-full max-h-[600px] rounded-3xl overflow-hidden border-4 border-red-400/40 hover:border-red-400/70 shadow-2xl transition-all duration-300 group"
              >
                <img
                  src={urlFor(pageInfo?.profilePic).url()}
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </div>

              {/* Rotating border accent */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 border-2 border-red-400/20 rounded-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-20 h-20 border-2 border-red-400/30 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Heading */}
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                Full Stack Developer &{" "}
                <span className="bg-gradient-to-r from-red-400 via-red-300 to-red-200 bg-clip-text text-transparent">
                  Tech Enthusiast
                </span>
              </h3>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {pageInfo?.backgroundInformation}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-400/5 rounded-full blur-3xl -z-10" />
    </motion.section>
  );
};

export default About;
