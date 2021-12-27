import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './arrow';
import './hideScrollbar.css';

function ScrollList({ setImage = null, listImage, renderItem, displaySelected = true }) {
  const [selected, setSelected] = React.useState();

  const handleItemMouseOver =
    (itemId) =>
    ({ getItemById }) => {
      setSelected(itemId);
      if (setImage) setImage(itemId);
    };

  return (
    <>
      <div className="example" style={{ width: '100%', marginTop: '16px' }}>
        <div>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            options={{
              ratio: 0.9,
              rootMargin: '5px',
              threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1],
            }}
          >
            {listImage?.length > 0 &&
              listImage.map((element, index) => {
                const isSelected = selected === element;
                return (
                  <div
                    itemId={index}
                    key={element}
                    role="button"
                    tabIndex={0}
                    onMouseOver={handleItemMouseOver(element)}
                    style={{
                      // border: isSelected && displaySelected ? '2px solid #CC3366' : 'none',
                      display: 'inline-block',
                      // margin: '0 10px',
                      width: 'auto',
                      userSelect: 'none',
                    }}
                    // className="card"
                  >
                    {renderItem(element)}
                  </div>
                );
              })}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
export default ScrollList;
