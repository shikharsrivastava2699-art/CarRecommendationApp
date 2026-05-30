import type { ICar } from '../interfaces/Car'

type Props = {
  car: ICar
  onSelect: (id: number) => void
}

export default function CarInfoCard({ car, onSelect }: Props) {
  return (
    <button
      type="button"
      className="car-card"
      onClick={() => onSelect(car.id)}
      aria-label={`View details for ${car.name}`}
    >
      <img className="car-card-image" src={car.imageUrl} alt={car.name} />
      <div className="car-card-header">
        <strong>{car.name}</strong>
        <span>₹{car.exShowroomPrice}L</span>
      </div>
      <p className="car-card-description">
        {car.hybrid ? 'Hybrid powertrain' : 'Regular powertrain'} · Safety {car.safetyRating}/5
      </p>
      <div className="car-card-meta">
        <span>{car.colorVariantsAvailable.length} colors</span>
        <span>ID {car.id}</span>
      </div>
    </button>
  )
}
