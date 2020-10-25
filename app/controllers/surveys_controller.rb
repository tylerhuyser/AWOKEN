class SurveysController < ApplicationController
  before_action :set_survey, only: [:show, :update, :destroy]
  before_action :authorize_request, only: [:create, :update, :destroy] 

  # GET /surveys
  def index
    if params[:employee_id]
      @employee = Employee.find(params[:employee_id])

      render json: @employee, include: [:surveys, :answers, {surveys: {include: :survey_formats }}]
    else
      @surveys = Survey.all

      render json: @surveys
    end
  end

  # GET /surveys/1
  def show
    render json: @survey, include: [:survey_format, :questions, :answers]
  end

  # POST /surveys
  def create
    @survey = Survey.new(survey_params)
    @survey.employee = @current_employee

    if @survey.save
      render json: @survey, status: :created, location: @survey
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /surveys/1
  def update
    if @survey.update(survey_params)
      render json: @survey
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  # DELETE /surveys/1
  def destroy
    @survey.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_survey
      @survey = Survey.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def survey_params
      params.require(:survey).permit(:survey_format_id)
    end
end
