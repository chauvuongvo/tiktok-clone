import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Portal({ children, containerId }) {
  const [container, setContainer] = useState();

  useEffect(() => {
    const targetElement = document.querySelector(`#${containerId}`);
    let wrapper;

    if (targetElement) setContainer(targetElement);
    else {
      wrapper = document.createElement('div');

      if (containerId) wrapper.id = containerId;

      document.body.appendChild(wrapper);
      setContainer(wrapper);
    }

    return () => {
      if (!targetElement) document.body.removeChild(wrapper);
    };
  }, [containerId]);

  if (!container) return null;

  return ReactDOM.createPortal(children, container);
}

export default Portal;
