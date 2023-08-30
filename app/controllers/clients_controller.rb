class ClientsController < ApplicationController
  def index
    clients = Client.includes(:votes).all

    clients_with_vote_count = clients.map do |client|
      {
        id: client.id,
        name: client.name,
        vote_count: client.votes.count
      }
    end

    render json: clients_with_vote_count
  end

end