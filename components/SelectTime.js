import { FormSelect, InputGroup } from 'react-bootstrap'

const hoursArray = () => [...Array(24).keys()]

const minutesArray = () => ['00', '15', '30', '45']

const SelectTime = ({ hours, minutes, onHoursChange, onMinutesChange }) => {
  return (
    <InputGroup>
      <FormSelect
        aria-label="Select hours"
        onChange={(e) => onHoursChange(e.target.value)}
        value={hours}
      >
        <option>Hours</option>
        {hoursArray().map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </FormSelect>

      <InputGroup.Text>H</InputGroup.Text>

      <FormSelect
        aria-label="Select minutes"
        onChange={(e) => onMinutesChange(e.target.value)}
        value={minutes}
      >
        <option>Minutes</option>
        {minutesArray().map((minutes) => (
          <option key={minutes} value={minutes}>
            {minutes}
          </option>
        ))}
      </FormSelect>

      <InputGroup.Text>M</InputGroup.Text>
    </InputGroup>
  )
}

export { SelectTime }
