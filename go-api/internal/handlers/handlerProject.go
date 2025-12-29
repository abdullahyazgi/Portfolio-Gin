package handlers

import (
	"api/internal/dto"
	"api/internal/models"
	"api/internal/utils"
	"context"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"net/http"
	"strconv"
)

type ProjectHandler struct {
	DB *pgxpool.Pool
}

func NewProjectHandler(db *pgxpool.Pool) *ProjectHandler {
	return &ProjectHandler{DB: db}
}

// Add Project

// AddProject godoc
// @Summary Create a new project
// @Tags Projects
// @Accept json
// @Produce json
// @Param project body dto.CreateProjectRequest true "Create project payload"
// @Success 201 {object} models.Project
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /projects [post]
func (h *ProjectHandler) AddProject(c *gin.Context) {
	// var project models.Project
	var req dto.CreateProjectRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"errors": utils.ValidationError(err),
		})
		return
	}

	project := models.Project{
		Title:       req.Title,
		Description: req.Description,
	}

	query := `
		INSERT INTO projects (title, description)
		VALUES ($1, $2)
		RETURNING id
	`

	err := h.DB.QueryRow(
		context.Background(),
		query,
		project.Title,
		project.Description,
	).Scan(&project.ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, project)
}

// Get All Projects

// GetProjects godoc
// @Summary List all projects
// @Tags Projects
// @Produce json
// @Success 200 {array} models.Project
// @Failure 500 {object} map[string]string
// @Router /projects [get]
func (h *ProjectHandler) GetProjects(c *gin.Context) {
	rows, err := h.DB.Query(context.Background(),
		"SELECT id, title, description FROM projects",
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var projects []models.Project

	for rows.Next() {
		var p models.Project
		rows.Scan(&p.ID, &p.Title, &p.Description)
		projects = append(projects, p)
	}

	c.JSON(http.StatusOK, projects)
}

// Get Project by ID

// GetProjectByID godoc
// @Summary Get a project by ID
// @Tags Projects
// @Produce json
// @Param id path int true "Project ID"
// @Success 200 {object} models.Project
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /projects/{id} [get]
func (h *ProjectHandler) GetProjectByID(c *gin.Context) {
	id := c.Param("id")

	query := `
		SELECT id, title, description
		FROM projects
		WHERE id = $1
	`

	var project models.Project
	err := h.DB.QueryRow(
		context.Background(),
		query,
		id,
	).Scan(&project.ID, &project.Title, &project.Description)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "project not found"})
		return
	}

	c.JSON(http.StatusOK, project)
}

// Edit Project

// UpdateProject godoc
// @Summary Update an existing project
// @Tags Projects
// @Accept json
// @Produce json
// @Param id path int true "Project ID"
// @Param project body dto.UpdateProjectRequest true "Updated project payload"
// @Success 200 {object} models.Project
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /projects/{id} [put]
func (h *ProjectHandler) UpdateProject(c *gin.Context) {
	id := c.Param("id")

	var req dto.UpdateProjectRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"errors": utils.ValidationError(err),
		})
		return
	}

	// Ensure at least one field is provided
	if req.Title == nil && req.Description == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "at least one field must be updated",
		})
		return
	}

	query := "UPDATE projects SET "
	args := []any{}
	argID := 1

	if req.Title != nil {
		query += "title = $" + strconv.Itoa(argID)
		args = append(args, *req.Title)
		argID++
	}

	if req.Description != nil {
		if len(args) > 0 {
			query += ", "
		}
		query += "description = $" + strconv.Itoa(argID)
		args = append(args, *req.Description)
		argID++
	}

	query += " WHERE id = $" + strconv.Itoa(argID)
	args = append(args, id)

	query += " RETURNING id, title, description"

	var project models.Project
	err := h.DB.QueryRow(
		context.Background(),
		query,
		args...,
	).Scan(&project.ID, &project.Title, &project.Description)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "project not found"})
		return
	}

	c.JSON(http.StatusOK, project)
}
