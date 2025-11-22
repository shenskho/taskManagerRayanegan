import React, { useEffect } from 'react'
import { Container } from 'reactstrap'

const LayoutWrapper = ({ children, meta = {} }) => {
  useEffect(() => {
    if (meta?.title) {
      document.title = meta.title
    }
  }, [meta])

  return <Container fluid className="py-3">{children}</Container>
}

export default LayoutWrapper
