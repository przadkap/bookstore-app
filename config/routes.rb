Rails.application.routes.draw do
  root 'pages#index'
  # get 'pages/index'
# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      # resources :books do
      #   member do
      #     get 'preview'
      #     get 'hello'
      #   end
      # end
      resources :books
      resources :users
      resources :auth
      resources :op do
        member do
          post 'lend_book'
          post 'return_book'
        end
      end
    end
  end

  match '*path', to: 'pages#index', via: :all
end
