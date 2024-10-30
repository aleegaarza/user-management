import React from 'react'

const InputName = ({setName}) => {
  return (
    <div className="mb-3 flex flex-col">
          <label className="form-label">First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
  )
}

export default InputName