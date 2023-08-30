class VotesController < ApplicationController
  # GET /votes/:client_id
  def count
    begin
      client = Client.find(params[:client_id])
      vote_count = client.votes.count

      # Log the request
      Rails.logger.info("GET /votes/#{params[:client_id]} - Vote count: #{vote_count}")

      render json: { vote_count: vote_count }
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Client not found' }, status: :not_found
    rescue => e
      Rails.logger.error("Error in GET /votes/#{params[:client_id]}: #{e.message}")
      render json: { error: 'An error occurred' }, status: :internal_server_error
    end
  end

  # POST /votes/:client_id
  def create
    begin
      client = Client.find(params[:client_id])
      client.votes.create!

      vote_count = client.votes.count

      # Log the vote
      Rails.logger.info("POST /votes/#{params[:client_id]} - Vote added, new count: #{vote_count}")

			render json: {
				vote_count: vote_count,
			}
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Client not found' }, status: :not_found
    rescue => e
      Rails.logger.error("Error in POST /votes/#{params[:client_id]}: #{e.message}")
      render json: { error: 'An error occurred' }, status: :internal_server_error
    end
  end
end
