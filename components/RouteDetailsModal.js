import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

import { formatRouteTime } from '~lib/utils'

export const RouteDetailsModal = ({ onClose, data }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    onClose()
  }

  useEffect(() => {
    if (data) {
      setShow(true)
    }
  }, [data])

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{data && data.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>By: </strong> {data && data.user}
        </p>
        <p>
          <strong>At: </strong> {data && formatRouteTime(data.time)}
        </p>
      </Modal.Body>
    </Modal>
  )
}
