class Question < ApplicationRecord
  belongs_to :survey_format

  has_many :surveys, through: :survey_formats

  has_many :options
  has_many :answers

end
