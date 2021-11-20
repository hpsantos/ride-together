import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

import { Map } from '~components/map/Map'

export const RouteModal = ({ onClose, route }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    onClose()
  }

  useEffect(() => {
    if (route) {
      setShow(true)
    }
  }, [route])

  return (
    <Modal show={show} onHide={handleClose} fullscreen={true}>
      <Modal.Header closeButton>
        <Modal.Title>{route.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Map routes={[route]} />
      </Modal.Body>
    </Modal>
  )
}
