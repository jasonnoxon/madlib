import React from 'react';

const Paragraph = props => {
  return (
    <span>
      <textarea onChange={e => props.findAndUpdate(e.target.value)}></textarea>
    </span>
  );
};

export default Paragraph;
