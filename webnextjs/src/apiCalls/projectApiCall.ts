import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { ModelsProject } from "@/api/api";

// GET All projects
export const getProjects = async (): Promise<ModelsProject[]> => {
  const res = await axios.get<ModelsProject[]>(`${DOMAIN}/api/projects`);
  return res.data;
};

// GET project by ID
export const getProjectById = async (id: number): Promise<ModelsProject> => {
  const res = await axios.get<ModelsProject>(`${DOMAIN}/api/projects/${id}`);
  return res.data;
};