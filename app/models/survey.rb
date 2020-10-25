class Survey < ApplicationRecord
  before_validation :set_iteration

  def set_iteration

    self.iteration = Survey.where(employee_id: employee_id, survey_format_id: survey_format_id ).count + 1

  end


  belongs_to :employee
  belongs_to :survey_format
  has_many :questions, through: :survey_formats
  has_many :answers

  validates :iteration, presence: true
end
