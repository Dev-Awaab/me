import React from "react";
import { motion } from "framer-motion";
import { Experience } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  experiences: Experience[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const WorkExperience = ({ experiences }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full py-20 px-4 md:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-red-300 to-red-200 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>
        <div className="h-1 w-20 bg-gradient-to-r from-red-400 to-transparent mb-16" />

        {/* Timeline Container */}
        <div className="relative">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 md:space-y-12"
          >
          {experiences.map((experience, index) => (
            <motion.div
              key={experience._id}
              variants={itemVariants}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3 lg:gap-4 items-start pt-6 md:pt-8 px-2 md:px-0"
            >
              {/* LEFT: Company Info Card */}
              <div className="md:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 hover:border-red-400/30 rounded-lg p-3 md:p-4 space-y-2 md:space-y-3 transition-all w-full"
                >
                  {/* Company Name */}
                  <h4 className="text-white text-sm md:text-base font-semibold line-clamp-2">
                    {experience?.company}
                  </h4>

                  {/* 5 White Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-white text-lg md:text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* CENTER: Logo on Vertical Line Separator */}
              <div className="hidden md:flex md:col-span-2 justify-center relative">
                {/* Vertical line separator */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500 transform -translate-x-1/2" />

                {/* Logo on line */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                    <img
                      className="w-14 h-14 object-cover rounded-full"
                      src={urlFor(experience?.companyImage).url()}
                      alt={experience?.company}
                    />
                  </div>
                </motion.div>
              </div>

              {/* RIGHT: Experience Details (Text Only) */}
              <div className="md:col-span-5">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4 md:space-y-6"
                >
                  {/* Job Title */}
                  <div>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white line-clamp-2">
                      {experience?.jobTitle}
                    </h3>
                  </div>

                  {/* Date Range */}
                  <p className="text-gray-400 text-[10px] md:text-xs font-medium flex items-center gap-2">
                    <span>📅</span>
                    <span className="whitespace-nowrap">
                      {new Date(experience.dateStarted).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}{" "}
                      -{" "}
                      {experience.isCurrentWorkingHere
                        ? "Present"
                        : new Date(experience.dateEnded).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })}
                    </span>
                  </p>

                  {/* Responsibilities Header */}
                  <div className="pt-1 md:pt-2">
                    <h4 className="text-gray-400 text-[10px] md:text-xs font-semibold italic mb-2 md:mb-3">
                      Responsibilities
                    </h4>

                    {/* Bullet Points */}
                    <ul className="space-y-1.5 md:space-y-2">
                      {experience.points.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="flex gap-2 md:gap-3 text-gray-300 text-[11px] md:text-sm leading-relaxed"
                        >
                          <span className="text-red-400 font-bold flex-shrink-0 mt-1">
                            •
                          </span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-3 md:pt-6 border-t border-gray-800">
                    <div className="flex gap-1.5 md:gap-2 flex-wrap">
                      {experience.technologies.map((tech) => (
                        <motion.img
                          key={tech._id}
                          whileHover={{ scale: 1.15 }}
                          className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-700/50 p-1"
                          src={urlFor(tech?.image).url()}
                          alt={tech.title}
                          title={tech.title}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-400/5 rounded-full blur-3xl -z-10" />
    </motion.section>
  );
};

export default WorkExperience;
