export const RouteFeature = ({ icon, description, value }) => {
  return (
    <div className="bg-light rounded py-3 px-4 mb-4">
      <div className="text-secondary">
        <i className={`bi-${icon} text-primary`} />
        &nbsp; {description}
      </div>
      <div className="fs-6 fw-bold">{value}</div>
    </div>
  )
}
