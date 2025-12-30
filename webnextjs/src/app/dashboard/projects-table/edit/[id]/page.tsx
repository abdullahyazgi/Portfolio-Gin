import { ModelsProject } from '@/api/api';
import { getProjectById } from '@/apiCalls/projectApiCall';
import EditProjectForm from '@/components/form/dashboard/EditProjectForm';


interface EditProjectPageProps {
    params: { id: number };
}

const EditProjectPage = async ({ params }: EditProjectPageProps) => {
      const { id } = await params;
    const project: ModelsProject = await getProjectById(id);
    return (
        <section>
            <div>
                <h2>
                    Edit Project
                </h2>
                <EditProjectForm project={project} />
            </div>
        </section>
    )
}

export default EditProjectPage