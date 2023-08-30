# frozen_string_literal: true

Rails.application.routes.draw do
	get '/clients', to: 'clients#index'
  get '/votes/:client_id', to: 'votes#count'
  post '/votes/:client_id', to: 'votes#create'
end
