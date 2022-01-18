Rails.application.routes.draw do
  get 'status/tech/:render', to: 'status#tech'

  get 'users/login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
