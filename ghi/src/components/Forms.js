function FormInputRequired(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <>
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {" "}
          {labelText}{" "}
        </label>
        <input
          value={value}
          onChange={onChange}
          required
          type={type}
          className="form-control"
          id={id}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

function FormInputOptional(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {" "}
        {labelText}{" "}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function FormInputCheckbox(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <div className="mb-3 form-check">
      <label htmlFor={id} className="form-check-label">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="form-check-input"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

export { FormInputOptional, FormInputRequired, FormInputCheckbox };
