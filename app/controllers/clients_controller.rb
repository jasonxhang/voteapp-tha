# frozen_string_literal: true

class ClientsController < ApplicationController
  # GET /clients
  def index
    clients = Client.all

    # This is a more efficient way to get the vote count for each client, sorted by vote count
    # clients_with_vote_count = clients.map do |client|
    #   {
    #     id: client.id,
    #     name: client.name,
    #     vote_count: client.votes.count
    #   }
    # end

    # sorted_clients = clients_with_vote_count.sort_by { |client| -client[:vote_count] }
    # render json: sorted_clients

    render json: clients
  end
end
