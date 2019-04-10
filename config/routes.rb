Rails.application.routes.draw do
  resource :users, only: [:update]
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get '/404', to: 'errors#not_found', as: 'not_found'
  get '/422', to: 'errors#unacceptable', as: 'unacceptable'
  get '/500', to: 'errors#internal_error', as: 'internal_error'

  root 'home#index'
  get '/:slug', as: 'profile', to: 'home#profile'

  get '/errors/oauth_error', to: 'errors#oauth_error', as: 'oauth_error'

  resources :predictions, only: [:create, :destroy, :show]
end
