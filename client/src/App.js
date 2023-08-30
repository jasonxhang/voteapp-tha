import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ClipLoader } from 'react-spinners'

function App() {
  const [clients, setClients] = useState([])
  const [voteProcessing, setVoteProcessing] = useState(false)
  const [clientIdProcess, setClientIdProcess] = useState(null)

  const fetchClients = async () => {
    try {
      const getResponse = await axios.get('/clients')
      const clientList = getResponse.data
      setClients(clientList)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleVote = async (clientId) => {
    try {
      setVoteProcessing(true)
      setClientIdProcess(clientId)

      await axios.post(`/votes/${clientId}`)
      await fetchClients()

      setVoteProcessing(false)
      setClientIdProcess(null)
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  const renderClientRow = (client) => {
    return (
      <Row key={client.id} className="mb-3">
        <Col xs={4} className="d-flex align-items-center">
          <div>{client.name}</div>
        </Col>
        <Col xs={4} className="d-flex align-items-center">
          <div>{client.vote_count}</div>
        </Col>
        <Col xs={4} className="d-flex align-items-center">
          <Button
            style={{ width: '100px', height: '40px' }}
            variant="primary"
            onClick={() => handleVote(client.id)}
          >
            {voteProcessing && clientIdProcess === client.id ? (
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
      <h1 className="mb-4">Clients List</h1>
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
    </Container>
  )
}

export default App
