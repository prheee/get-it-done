import React from 'react';

const FormError = (props) => {
  const { message } = props;
  return (
    <div className='form-message'>
      {`Invalid ${message}`}
    </div>
  )
}

export default FormError;