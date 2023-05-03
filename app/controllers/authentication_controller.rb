class AuthenticationController < ApplicationController
  before_action :authorize_request, except: :login

  # POST /auth/login
  def login
    @employee = Employee.find_by(username: login_params[:username])
    if @employee && @employee.authenticate(login_params[:password]) #authenticate method provided by Bcrypt and 'has_secure_password'
      token = encode({id: @employee.id})
      render json: {
        employee: @employee.attributes.except('password_digest'),
        token: token
        }, status: :ok
    else
      render json: { errors: 'unauthorized' }, status: :unauthorized
    end
  end
  
  # GET /auth/verify
  def verify
    render json: @current_employee.attributes.except('password_digest'), status: :ok
  end


  private

  def login_params
    params.require(:authentication).permit(:username, :password)
  end
end
