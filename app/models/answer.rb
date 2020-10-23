class Answer < ApplicationRecord
  belongs_to :employee
  belongs_to :survey
  belongs_to :question
  # belongs_to through: :options

  has_many :options, through: :questions

  # has_and_belongs_to_many :options
  # validates :first_name, :last_name, :date_of_birth, :company_id, presence: true
end
