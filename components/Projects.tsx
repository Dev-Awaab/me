import React, { useState } from "react";
import { motion } from "framer-motion";

import { urlFor } from "../sanity";
import { Project, Technology } from "../typings";

type Props = {
  projects: Project[]
};

const PROJECTS_PER_PAGE = 3;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ProjectCard = ({
  project,
  index,
  isLarge,
  isMedium,
  isFeatured,
}: {
  project: Project;
  index: number;
  isLarge?: boolean;
  isMedium?: boolean;
  isFeatured?: boolean;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 hover:border-red-400/50 transition-all duration-300 cursor-pointer ${
        isFeatured
          ? ""
          : isLarge
            ? "md:col-span-2 md:row-span-2"
            : isMedium
              ? "md:col-span-2"
              : ""
      }`}
    >
      {/* Background Image */}
      <img
        src={urlFor(project?.image).url()}
        alt={project?.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-sm md:text-base lg:text-lg font-bold text-white mb-1 line-clamp-2">
                {project?.title}
              </h3>
            </div>
            {!isFeatured && (
              <span className="text-[10px] font-semibold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                {index + 1}
              </span>
            )}
          </div>
          <p className="text-[10px] md:text-xs text-gray-300 line-clamp-2">
            {project?.summary}
          </p>
        </div>

        {/* Footer */}
        <div className="space-y-4">
          {/* Tech Stack */}
          <div className="flex items-center gap-2 flex-wrap">
            {project.technologies.slice(0, 3).map((technology) => (
              <img
                className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-gray-700/50 p-1"
                src={urlFor(technology?.image).url()}
                alt={technology.title}
                key={technology._id}
                title={technology.title}
              />
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs text-gray-400">+{project.technologies.length - 3}</span>
            )}
          </div>

          {/* CTA Button */}
          <a
            href={project.linkToBuild}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-500/80 hover:bg-red-500 text-white text-[10px] md:text-xs px-3 py-1.5 rounded-md font-semibold transition-all duration-200 transform group-hover:scale-105"
          >
            View →
          </a>
        </div>
      </div>

      {/* Hover Border Animation */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-red-400/20 via-transparent to-red-400/20" />
    </motion.div>
  );
};

const Projects = ({ projects }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Separate featured and regular projects
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
  const regularProjects = projects.filter((p) => !p.featured);

  // Paginate regular projects
  const totalPages = Math.ceil(regularProjects.length / PROJECTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = regularProjects.slice(
    startIdx,
    startIdx + PROJECTS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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
          Projects
        </motion.h2>
        <div className="h-1 w-20 bg-gradient-to-r from-red-400 to-transparent mb-12" />

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-gray-300 mb-6 flex items-center gap-2">
              <span className="text-red-400">⭐</span> Featured
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
            >
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} isFeatured />
              ))}
            </motion.div>
          </div>
        )}

        {/* All Projects Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-300 mb-6">
            {regularProjects.length > 0 ? "All Projects" : "Projects"}
          </h3>
          <motion.div
            key={`page-${currentPage}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px] mb-8"
          >
            {paginatedProjects.map((project, i) => {
              const isLarge = i % 5 === 0;
              const isMedium = i % 5 === 1 || i % 5 === 2;

              return (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={startIdx + i}
                  isLarge={isLarge}
                  isMedium={isMedium}
                />
              );
            })}
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-6 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg font-semibold hover:border-red-400/50 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                      currentPage === page
                        ? "bg-red-500 text-white"
                        : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-red-400/50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-6 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg font-semibold hover:border-red-400/50 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-400/5 rounded-full blur-3xl -z-10" />
    </motion.section>
  );
};

export default Projects;
