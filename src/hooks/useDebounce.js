import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const idTimeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(idTimeout);
  }, [value, delay]);

  return debounceValue;
}

useDebounce.propTypes = {
  value: PropTypes.node.isRequired,
  delay: PropTypes.number.isRequired,
};

export default useDebounce;
