import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ClipLoader } from 'react-spinners'

const App = () => {
  const [clients, setClients] = useState([])
  const [voteProcessing, setVoteProcessing] = useState({ clientId: null, inProgress: false })
  const [pageLoading, setPageLoading] = useState(true)

  const fetchVoteCount = async (clientId) => {
    try {
      const response = await axios.get(`/votes/${clientId}`)
      return response.data.vote_count
    } catch (error) {
      console.error('Error fetching vote count:', error)
      return 0
    }
  }

  // useCallback in case we were to ever use fetchClients elsewhere in the future
  const fetchClients = useCallback(async () => {
    try {
      // get all clients
      const getResponse = await axios.get('/clients')
      const clientList = getResponse.data

      // get vote count for each client
      const clientsWithVoteCounts = await Promise.all(
        clientList.map(async (client) => {
          const vote_count = await fetchVoteCount(client.id)
          return { ...client, vote_count }
        })
      )

      // sort clients by vote count descending
      const sortedClients = clientsWithVoteCounts.sort((a, b) => b.vote_count - a.vote_count)

      setClients(sortedClients)
      setPageLoading(false)
    } catch (error) {
      console.error('Error fetching clients:', error)
      setPageLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  const handleVote = async (clientId) => {
    try {
      setVoteProcessing({ clientId, inProgress: true })

      // post vote
      await axios.post(`/votes/${clientId}`)
      const newVoteCount = await fetchVoteCount(clientId)

      // update vote count for client and sort.
      // NOTE: this operation can get expensive as the number of clients grows
      // I would prefer to do this on the server side by attaching vote counts to the client object in our index call
      setClients((prevClients) =>
        prevClients
          .map((client) =>
            client.id === clientId ? { ...client, vote_count: newVoteCount } : client
          )
          .sort((a, b) => b.vote_count - a.vote_count)
      )

      setVoteProcessing({ clientId: null, inProgress: false })
    } catch (error) {
      console.error('Error voting:', error)
      setVoteProcessing({ clientId: null, inProgress: false })
    }
  }

  const renderClientRow = (client) => {
    const { id, name, vote_count } = client
    const isProcessing = voteProcessing.clientId === id && voteProcessing.inProgress

    return (
      <Row key={id} className="mb-3">
        <Col xs={4} className="d-flex align-items-center">
          <div>{name}</div>
        </Col>
        <Col xs={4} className="d-flex align-items-center">
          <div>{vote_count}</div>
        </Col>
        <Col xs={4} className="d-flex align-items-center">
          <Button
            style={{ width: '100px', height: '40px' }}
            variant="primary"
            onClick={() => handleVote(id)}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div style={{ width: '100%', height: '80%' }}>
                <ClipLoader size={25} color={'#36d7b7'} />
              </div>
            ) : (
              'Vote'
            )}
          </Button>
        </Col>
      </Row>
    )
  }
  return (
    <Container className="mt-5">
      <h1 className="mb-4">All Time NBA Players</h1>
      {pageLoading ? (
        <div className="mt-auto d-flex justify-content-center">
          <ClipLoader size={75} color={'#36d7b7'} />
        </div>
      ) : clients.length === 0 ? (
        <div>No players found.</div>
      ) : (
        <>
          <Row className="mb-2">
            <Col xs={4}>
              <div>
                <strong>Name</strong>
              </div>
            </Col>
            <Col xs={4}>
              <div>
                <strong>Votes</strong>
              </div>
            </Col>
          </Row>
          {clients?.map((client) => renderClientRow(client))}
        </>
      )}
    </Container>
  )
}

export default App
