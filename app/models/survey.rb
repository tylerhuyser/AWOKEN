class Survey < ApplicationRecord
  belongs_to :employee
  belongs_to :survey_format
  has_many :answers
end
