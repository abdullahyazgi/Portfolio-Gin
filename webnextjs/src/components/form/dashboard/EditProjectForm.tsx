"use client";
import axios from 'axios';
import { DOMAIN } from "@/lib/constants";
import { ModelsProject } from "@/api/api";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EditProjectFormProps {
    project: ModelsProject;
}

const EditProjectForm = ({ project }: EditProjectFormProps) => {
    const router = useRouter();
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`${DOMAIN}/api/projects/${project.id}`, { title, description });
            router.push(`/dashboard/projects-table`);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <form onSubmit={formSubmitHandler}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Update Project</button>
        </form>
    )
}

export default EditProjectForm