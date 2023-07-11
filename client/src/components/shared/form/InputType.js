import React from 'react'

const InputType = ({ htmlFor, labelText, inputType, value, onChange, name }) => {
    return (
        < >
            <div className="mb-2">
                <label htmlFor={htmlFor} className="form-label">
                    {labelText}
                </label>
                <input
                    type={inputType}
                    className="form-control"
                    value={value}
                    onChange={onChange}
                    name={name}
                    autoComplete={'false'}
                />
            </div>
        </>
    )
}

export default InputType
