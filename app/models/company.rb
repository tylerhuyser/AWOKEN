class Company < ApplicationRecord
  has_many :employees
  has_many :surveys, through: :employees
  has_many :answers, through: :surveys
end
