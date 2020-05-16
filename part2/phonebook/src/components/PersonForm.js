import React from 'react';

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name: <input value={props.name} onChange={props.onnamechange} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.onnumberchange} />
      </div>
      <div>
        <button type="submit" onClick={props.onsubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;