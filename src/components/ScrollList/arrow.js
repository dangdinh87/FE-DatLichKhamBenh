import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';


export function LeftArrow() {
  const {
    getPrevItem,
    isFirstItemVisible,
    scrollToItem,
    visibleItemsWithoutSeparators,
    initComplete,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible),
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators?.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  const clickHandler = () => {
    const prevItem = getPrevItem();
    scrollToItem(prevItem?.entry?.target, 'smooth', 'start');
  };

  return (
    <button
      disabled={disabled}
      onClick={clickHandler}
      className="btn rounded-circle position-absolute d-flex align-items-center justify-content-center"
      style={{
        height: '45px',
        width: '45px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        cursor: 'pointer',
        opacity: disabled ? '0' : '1',
        userSelect: 'none',
        bottom: '50%',
        left: '0%',
        transform: 'translateY(50%)',
      }}
    >
      <i className="bi bi-arrow-left text-white"></i>
    </button>
  );
}

export function RightArrow() {
  const {
    getNextItem,
    isLastItemVisible,
    scrollToItem,
    visibleItemsWithoutSeparators,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators?.length && isLastItemVisible,
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators?.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  const clickHandler = () => {
    const nextItem = getNextItem();
    scrollToItem(nextItem?.entry?.target, 'smooth', 'end');
  };

  return (
    <button
      disabled={disabled}
      onClick={clickHandler}
      className="btn rounded-circle position-absolute d-flex align-items-center justify-content-center"
      style={{
        height: '45px',
        width: '45px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        cursor: 'pointer',
        opacity: disabled ? '0' : '1',
        userSelect: 'none',
        bottom: '50%',
        right: '0%',
        transform: 'translateY(50%)',
      }}
    >
      <i className="bi bi-arrow-right text-white"></i>
    </button>
  );
}

