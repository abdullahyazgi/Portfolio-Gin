"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ModelsProject } from "@/api/api";
import { getProjectById } from "@/apiCalls/projectApiCall";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ModelsProject | null>(null);

  useEffect(() => {
    if (!id) return;

    getProjectById(Number(id))
      .then(setProject)
      .catch(console.error);
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectDetailsPage;
