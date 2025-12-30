"use client";

import { ModelsProject } from "@/api/api";
import { getProjects } from "@/apiCalls/projectApiCall";
import Link from "next/link";
import { useEffect, useState } from "react";


const ProjectsTable = () => {
    const [projects, setProjects] = useState<ModelsProject[]>([]);
  
    useEffect(() => {
      getProjects()
        .then((data) => setProjects(data))
        .catch((err) => console.error(err));
    }, []);
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>
                <Link href={`/dashboard/projects-table/edit/${project.id}`}>
                  Edit 
                </Link>
              </td>
              <td>
                <Link href={`/myprojects/${project.id}`}>
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default ProjectsTable