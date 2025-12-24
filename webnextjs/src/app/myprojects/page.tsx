"use client";

import { useEffect, useState } from "react";
import { ModelsProject } from "@/api/api";
import { getProjects } from "@/apiCalls/projectApiCall";
import ProjectItem from "@/components/myprojects/ProjectItem";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ModelsProject[]>([]);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>My Projects</h2>

      <ul>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
