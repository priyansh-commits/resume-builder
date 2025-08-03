import type { SectionType } from "@/types/resume"

export function getSuggestions(sectionType: SectionType) {
  const suggestions = {
    skills: [
      { category: "technical", text: "React" },
      { category: "technical", text: "TypeScript" },
      { category: "technical", text: "Node.js" },
      { category: "technical", text: "Python" },
      { category: "technical", text: "SQL" },
      { category: "technical", text: "AWS" },
      { category: "technical", text: "Docker" },
      { category: "technical", text: "Git" },
      { category: "soft", text: "Leadership" },
      { category: "soft", text: "Communication" },
      { category: "soft", text: "Problem Solving" },
      { category: "soft", text: "Team Collaboration" },
      { category: "soft", text: "Project Management" },
      { category: "soft", text: "Critical Thinking" },
    ],
    experience: [
      { category: "achievement", text: "Led a team of 5 developers to deliver project 2 weeks ahead of schedule" },
      { category: "achievement", text: "Improved application performance by 40% through code optimization" },
      { category: "achievement", text: "Implemented automated testing, reducing bugs by 60%" },
      { category: "responsibility", text: "Developed and maintained web applications using React and Node.js" },
      { category: "responsibility", text: "Collaborated with cross-functional teams to define project requirements" },
    ],
    summary: [
      { category: "template", text: "Results-driven professional with X years of experience in..." },
      { category: "template", text: "Passionate [role] specializing in [skills] with proven track record of..." },
    ],
  }

  return suggestions[sectionType as keyof typeof suggestions] || []
}

export function getTemplates(sectionType: SectionType) {
  const templates = {
    experience: [
      {
        title: "Software Engineer",
        description: "Template for software engineering roles",
        data: {
          position: "Software Engineer",
          company: "Tech Company",
          startDate: "Jan 2020",
          endDate: "Present",
          description:
            "Developed and maintained web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.",
        },
      },
      {
        title: "Product Manager",
        description: "Template for product management roles",
        data: {
          position: "Product Manager",
          company: "Startup Inc.",
          startDate: "Mar 2019",
          endDate: "Dec 2021",
          description:
            "Led product strategy and roadmap development. Worked closely with engineering and design teams to deliver user-centric products.",
        },
      },
    ],
    education: [
      {
        title: "Computer Science Degree",
        description: "Bachelor's in Computer Science",
        data: {
          degree: "Bachelor of Science in Computer Science",
          school: "University Name",
          year: "2020",
          gpa: "3.8",
        },
      },
      {
        title: "MBA",
        description: "Master of Business Administration",
        data: {
          degree: "Master of Business Administration",
          school: "Business School",
          year: "2022",
          gpa: "3.9",
        },
      },
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description: "Full-stack web application",
        data: {
          name: "E-commerce Platform",
          description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB",
          technologies: ["React", "Node.js", "MongoDB", "Express"],
          github: "https://github.com/username/project",
          demo: "https://project-demo.com",
        },
      },
    ],
  }

  return templates[sectionType as keyof typeof templates] || []
}
