Rails.application.routes.draw do
  resources :answers
  resources :surveys
  resources :options
  resources :questions
  resources :survey_formats
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  resources :employees
  resources :companies
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
