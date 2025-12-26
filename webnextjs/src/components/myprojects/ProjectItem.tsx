import { ModelsProject } from "@/api/api";
import Link from "next/link";

interface ProjectItemProps {
  project: ModelsProject;
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <div>
      <h3>{project.title}</h3>
      <p>
        {project.description}
      </p>
      <Link href={`/myprojects/${project.id}`}>View Details</Link>
    </div>
  );
};

export default ProjectItem;