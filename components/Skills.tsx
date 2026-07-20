import React from "react";
import Skill from "./Skill";
import { motion } from "framer-motion";
import { Skill as SkillType } from "../typings";

type Props = {
  skills: SkillType[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const Skills = ({ skills }: Props) => {
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
          Skills
        </motion.h2>
        <div className="h-1 w-20 bg-gradient-to-r from-red-400 to-transparent mb-4" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-sm md:text-base mb-12"
        >
          Full Stack Developer exploring every tech stack
        </motion.p>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2"
        >
          {skills.map((skill) => (
            <Skill key={skill._id} skill={skill} />
          ))}
        </motion.div>
      </div>

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-400/5 rounded-full blur-3xl -z-10" />
    </motion.section>
  );
};

export default Skills;
