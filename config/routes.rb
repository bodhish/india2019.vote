Rails.application.routes.draw do
  resource :users, only: [:update]
  devise_for :users, controllers: {omniauth_callbacks: "users/omniauth_callbacks"}

  root "home#index"
  get "/:slug", as: "profile", to: "home#profile"

  resources :predictions, only: [:create, :destroy, :show]
end
