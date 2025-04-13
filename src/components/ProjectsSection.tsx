import { motion } from 'framer-motion';
import { SectionHeader } from './ui/section-header';
import { ProjectCard3D } from './ui/project-card-3d';
import { ServicesBackground } from './ui/services-background';

export function ProjectsSection() {
  const projects = [
    {
      title: "StudyHub",
      description: "A collaborative platform for students to organize study groups and share resources.",
      tags: ["Web App", "College Club", "React"],
      imageUrl: "/images/projects/studyhub.jpg",
    },
    {
      title: "Startup Landing",
      description: "Modern landing page design for a tech startup focused on AI solutions.",
      tags: ["Portfolio Website", "UI Design", "Next.js"],
      imageUrl: "/images/projects/startup.jpg",
    },
    {
      title: "Event Planner",
      description: "Mobile-responsive application for managing college events and registrations.",
      tags: ["Web App", "Hackathon Winner", "Vue.js"],
      imageUrl: "/images/projects/events.jpg",
    },
    {
      title: "Course Catalog",
      description: "Interactive course catalog with advanced filtering and recommendation features.",
      tags: ["Educational Tool", "React", "API Integration"],
      imageUrl: "/images/projects/courses.jpg",
    },
  ];

  return (
    <section id="projects" className="relative min-h-screen py-40 px-4 md:px-12 overflow-hidden">
      {/* Animated background with more prominent particles */}
      <div className="absolute inset-0 -z-10">
        <ServicesBackground />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header with animation */}
        <SectionHeader
          subtitle="Our Portfolio"
          title="Projects That Speak For Themselves"
          description="Explore our latest work showcasing our expertise in creating innovative digital solutions across various industries."
          highlights={["Projects", "Speak"]}
        />
        
        {/* Projects grid with 3D cards - increased gap between cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20">
          {projects.map((project, index) => (
            <ProjectCard3D
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl}
              index={index}
            />
          ))}
        </div>
        
        {/* CTA Button - bigger and more prominent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-black font-medium hover:from-gold-400 hover:to-gold-500 transition-all duration-300 text-xl shadow-lg shadow-gold-500/20 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-1"
          >
            Start Your Project 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 