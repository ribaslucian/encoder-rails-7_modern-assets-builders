Rails.application.routes.draw do
  get 'status/tech/:render', to: 'status#tech'

  get 'users/sign_in'
  get 'users/sign_up'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
