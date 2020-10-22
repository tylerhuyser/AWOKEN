class Answer < ApplicationRecord
  belongs_to :employee
  belongs_to :survey
  belongs_to :question
  belongs_to :option
end
