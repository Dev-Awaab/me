import React, { useState } from "react";
import { motion } from "framer-motion";
import { Skill } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  skill: Skill;
};

const SkillCard = ({ skill }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Card Container */}
      <motion.div
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 group-hover:border-red-400/50 rounded-lg p-2 transition-all duration-300 cursor-pointer h-full flex flex-col items-center justify-center space-y-1"
        whileHover={{
          borderColor: "rgb(244, 63, 94)",
        }}
      >
        {/* 3D Icon Container */}
        <motion.div
          className="perspective"
          animate={{
            rotateX: isHovered ? 10 : 0,
            rotateY: isHovered ? -10 : 0,
            rotateZ: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Icon Background Circle */}
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={urlFor(skill?.image).url()}
              alt={skill?.title}
              className="w-6 h-6 md:w-8 md:h-8 object-contain filter brightness-110"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Skill Name */}
        <motion.h3
          className="text-white font-medium text-[10px] md:text-xs text-center line-clamp-1"
          animate={{
            color: isHovered ? "rgb(244, 63, 94)" : "rgb(255, 255, 255)",
          }}
          transition={{ duration: 0.2 }}
        >
          {skill?.title}
        </motion.h3>

        {/* Progress Bar (Optional) */}
        {skill?.progress && (
          <motion.div
            className="w-full h-1 bg-gray-700 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-red-400"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? `${skill.progress}%` : 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </motion.div>
        )}

        {/* Progress Text */}
        {skill?.progress && (
          <motion.p
            className="text-xs text-gray-400"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {skill.progress}% Proficiency
          </motion.p>
        )}

        {/* Glowing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 20px rgba(244, 63, 94, 0.3)"
              : "inset 0 0 0px rgba(244, 63, 94, 0)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SkillCard;
