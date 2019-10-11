import React from 'react';

const Input = props => {
  return (
    <span>
      <input
        type="text"
        placeholder={`Enter ${
          props.type === 'adjectives' ? 'an' : 'a'
        } ${props.type.substring(props.type.length - 1, -1)} `}
        onChange={e => props.update(props.type, props.index, e.target.value)}
      />
    </span>
  );
};

export default Input;
