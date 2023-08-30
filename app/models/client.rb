# frozen_string_literal: true

class Client < ApplicationRecord
  has_many :votes
end
