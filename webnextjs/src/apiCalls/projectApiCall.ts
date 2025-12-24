import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { ModelsProject } from "@/api/api";

export const getProjects = async (): Promise<ModelsProject[]> => {
  const res = await axios.get<ModelsProject[]>(`${DOMAIN}/api/projects`);
  return res.data;
};