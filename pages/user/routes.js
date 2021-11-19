import Router from "next/router"
import { useEffect } from "react"

import { useAuth } from "context/auth"

export default function Routes() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      return Router.push("/user/login")
    }
  }, [user])

  return (
    user && (
      <>
        <h3>My Routes</h3>
      </>
    )
  )
}
