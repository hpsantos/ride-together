import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'

import { RouteFeature } from '~components/RouteFeature'
import { formatRouteTime, getFullName } from '~lib/utils'

export const RouteDetailsModal = ({ onClose, data }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    onClose()
  }

  const features = [
    {
      icon: 'calendar',
      description: 'Start time',
      value: data && formatRouteTime(data.time),
    },
    {
      icon: 'tag',
      description: 'Type',
      value: 'Car',
    },
    {
      icon: 'people',
      description: 'Seats',
      value: '3 / 5',
    },
    {
      icon: 'star',
      description: 'Rating',
      value: 'Good',
    },
    {
      icon: 'clock',
      description: 'Time estimation',
      value: '12 minutes',
    },
    {
      icon: 'cash-coin',
      description: 'Cost estimation',
      value: '1,09 €',
    },
  ]

  useEffect(() => {
    if (data) {
      setShow(true)
    }
  }, [data])

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{data && data.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3 px-5">
        <div className="text-center my-5">
          <Image
            src="https://i.pravatar.cc/300?img=13"
            alt="John Doe"
            width={150}
            height={150}
            className="rounded-circle"
          />
          <h5 className="mt-2">{data && getFullName(data.user)}</h5>
        </div>
        <Row className="mb-3">
          {features.map((feature, i) => (
            <Col sm="6" lg="4" key={i}>
              <RouteFeature
                icon={feature.icon}
                description={feature.description}
                value={feature.value}
              />
            </Col>
          ))}
        </Row>
        <div className="text-center my-4">
          <Button className="px-5 mx-auto mb-2">
            <i className="bi-gift" />
            &nbsp; Reward
          </Button>
          <div className="text-secondary small">
            You can help your partner with the travel costs.
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
