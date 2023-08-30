# frozen_string_literal: true

Rails.application.routes.draw do
  resources :clients, only: [:index]
  get '/votes/:client_id', to: 'votes#count'
  post '/votes/:client_id', to: 'votes#create'
end
