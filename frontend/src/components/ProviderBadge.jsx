function ProviderBadge({ provider }) {
  return (
    <div className="provider-badge">
      <span className="badge-label">Active Provider:</span>
      <span className="badge-value">{provider}</span>
    </div>
  );
}

export default ProviderBadge;