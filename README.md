# README

Welcome to VoteApp! This application allows users to vote for different clients, in our use case NBA players, and see real time updates of the vote counts. The front end was made with create-react-app and Bootstrap. Ruby on Rails powers the backend API with a PostgreSQL database.

I will note that the current API implementation is not my favorite as it would not scale well since we have to make individual calls for each client to use our `GET /votes/:client_id` route. An alternative proposal outlined in the `ClientsController` would be to attach `vote_counts` directly to the user object inside our `GET /clients` route and do any sorting there as well.

![image](https://github.com/jasonxhang/voteapp-tha/assets/38513090/b98c092d-c953-491f-bb29-a1bcf6cea3aa)


## Getting Started

#### Prerequisites

Ensure you have the following installed on your machine:

- Ruby
- Ruby on Rails
- Node.js
- PostgreSQL

#### Installation

1. Install Ruby and Rails dependencies:

   ```
   bundle install
   ```

2. Install Node.js dependencies:

   ```
   cd client npm install
   ```

3. Update `config/database.yml` file to match your PostgreSQL user credentials as needed before creating and seeding the database.

   ```
   rails db:create
   rails db:migrate
   rails db:seed
   ```

4. Start the Rails server:

   ```
   rails server
   ```

5. In a new terminal window, navigate to the `client` directory and start the React app:

   ```
   cd client
   npm start
   ```

6. Open web browser and visit `http://localhost:3002` to access the app.

#### Database Schema

The database schema consists of two tables: clients and votes.

- clients:

  - id (integer, primary key)
  - name (string)

- votes:
  - id (integer, primary key)
  - client_id (integer, foreign key)
  - created_at (datetime)

#### Usage

Browse the list of clients and their vote counts.
Vote for a client by clicking the "Vote" button.
Observe real-time updates and reordering of the vote counts as users vote.

#### Future Potential Additions
- more css styling
- front end routing
- authentication
- user creation of additional clients
- separate biography pages for each client
- websockets
  - live notifications for votes
- logging service
