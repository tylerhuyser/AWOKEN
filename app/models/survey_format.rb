class SurveyFormat < ApplicationRecord
  has_many :questions
  has_many :options, through: :questions

  has_many :surveys 
  has_many :answers, through: :surveys
end
