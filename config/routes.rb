Rails.application.routes.draw do
  root 'pages#index'
  # get 'pages/index'
# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :books
      resources :users
      resources :auth do
        collection do
          get 'status'
          post 'log_in'
          post 'log_out'
        end
      end
      resources :op do
        collection do
          post 'lend_book'
          post 'return_book'
        end
      end
    end
  end

  match '*path', to: 'pages#index', via: :all
end
