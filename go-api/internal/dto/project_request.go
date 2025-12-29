package dto

type CreateProjectRequest struct {
	Title       string `json:"title" binding:"required,min=3,max=100"`
	Description string `json:"description" binding:"required,min=5,max=500"`
}

type UpdateProjectRequest struct {
	Title       *string `json:"title" binding:"omitempty,min=3"`
	Description *string `json:"description" binding:"omitempty,min=5"`
}
