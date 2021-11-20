import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

import { Map } from '~components/Map'

export const RouteModal = ({ onClose, data }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    onClose()
  }

  useEffect(() => {
    if (data) {
      console.log(data)
      setShow(true)
    }
  }, [data])

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Route</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Map routes={data} />
      </Modal.Body>
    </Modal>
  )
}
