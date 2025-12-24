import { ModelsProject } from "@/api/api";

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
    </div>
  );
};

export default ProjectItem;