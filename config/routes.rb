Rails.application.routes.draw do
  resources :station_lines
  resources :lines
  resources :stations
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
