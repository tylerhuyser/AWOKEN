class SurveyFormatsController < ApplicationController
  before_action :set_survey_format, only: [:show, :update, :destroy]
  # before_action :authorize_request, only: [:create, :update, :destroy] 

  # GET /survey_formats
  def index
    @survey_formats = SurveyFormat.all

    render json: @survey_formats
  end

  # GET /survey_formats/1
  def show
    render json: @survey_format, include: {questions: {include: :options} }
  end

  POST /survey_formats
  def create
    @survey_format = SurveyFormat.new(survey_format_params)

    if @survey_format.save
      render json: @survey_format, status: :created, location: @survey_format
    else
      render json: @survey_format.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /survey_formats/1
  def update
    if @survey_format.update(survey_format_params)
      render json: @survey_format
    else
      render json: @survey_format.errors, status: :unprocessable_entity
    end
  end

  # DELETE /survey_formats/1
  def destroy
    @survey_format.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_survey_format
      @survey_format = SurveyFormat.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def survey_format_params
      params.require(:survey_format).permit(:survey_name)
    end
end
