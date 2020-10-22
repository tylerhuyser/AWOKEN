class Survey < ApplicationRecord
  belongs_to :employee
  belongs_to :survey_format

  has many :questions, through: :survey_formats
  
  has_many :answers
end
