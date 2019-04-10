Rails.application.routes.draw do
  resource :users, only: [:update]
  devise_for :users, controllers: {omniauth_callbacks: "users/omniauth_callbacks"}

  root "home#index"
  get "/:slug", as: "profile", to: "home#profile"

  get '/errors/oauth_error', to: 'errors#oauth_error', as: 'oauth_error'

  resources :predictions, only: [:create, :destroy, :show]
end
