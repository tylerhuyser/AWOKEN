class User < ApplicationRecord
  after_initialize :set_defaults, unless: :persisted?
  
  belongs_to :company

  has_secure_password

  def set_defaults
    self.admin = false if self.admin.nil?
  end

  validates :first_name, :last_name, :date_of_birth, :admin, :company_id, presence: true
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }
end
