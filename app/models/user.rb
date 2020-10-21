class User < ApplicationRecord
  before_validation :set_defaults

  def set_defaults
    self.admin = false if self.admin.blank?
  end

  validates :first_name, :last_name, :date_of_birth, :company_id, presence: true
  validates :admin, inclusion: { in: [true, false] }
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }

  has_secure_password

  belongs_to :company
end
