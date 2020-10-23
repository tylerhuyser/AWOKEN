Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  get '/employees/:employee_id/surveys', to: 'surveys#index' 
  get '/survey_formats/:survey_format_id/questions', to: 'questions#index'
  get '/questions/:question_id/options', to: 'options#index'
  get '/surveys/:survey_id/answers', to: 'answers#index'

  resources :employees
  resources :companies
  resources :answers
  resources :surveys
  resources :options
  resources :questions
  resources :survey_formats
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
