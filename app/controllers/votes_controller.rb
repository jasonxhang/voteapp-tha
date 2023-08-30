# frozen_string_literal: true

class VotesController < ApplicationController
  # GET /votes/:client_id
  def count
    client = Client.find(params[:client_id])
    vote_count = client.votes.count

    Rails.logger.info("GET /votes/#{params[:client_id]} - Vote count: #{vote_count}")

    render json: { vote_count: }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Client not found' }, status: :not_found
  rescue StandardError => e
    Rails.logger.error("Error in GET /votes/#{params[:client_id]}: #{e.message}")
    render json: { error: 'An e@rror occurred' }, status: :internal_server_error
  end

  # POST /votes/:client_id
  def create
    client = Client.find(params[:client_id])
    client.votes.create!

    vote_count = client.votes.count

    Rails.logger.info("POST /votes/#{params[:client_id]} - Vote added, new count: #{vote_count}")

    render json: {
      vote_count:
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Client not found' }, status: :not_found
  rescue StandardError => e
    Rails.logger.error("Error in POST /votes/#{params[:client_id]}: #{e.message}")
    render json: { error: 'An error occurred' }, status: :internal_server_error
  end
end
