import React, { useState } from "react";

import menu from "../mock/menu.json";

const MainMenu = () => {
  const initialState = {
    mainChecked: false,
    showRelated: false
  };
  const [state, setState] = useState(initialState);

  const handleClick = (e: any) => {
    setState({
      ...state,
      [e.target.id]: e.target.checked
    });
  };

  console.log(menu);

  return (
    <div>
      {menu.map((menu, idx) => {
        return (
          <>
            <div key={idx}>
              <label htmlFor={menu.name}>{menu.name}</label>
              <input id={"mainChecked"} type="checkbox" onClick={handleClick} />
            </div>

            {/* choices */}
            {state.mainChecked &&
              menu.choices.map(choice => {
                return (
                  <div className="choices">
                    <label>{choice.name}</label>
                    <input
                      id="showRelated"
                      type="checkbox"
                      onClick={e => handleClick(e)}
                    />
                  </div>
                );
              })}

            {/* related */}
            {state.showRelated &&
              menu.related.map((related: any) => {
                return (
                  <>
                    <div className="choices">
                      <p>You might also like</p>
                      <label>{related.name}</label>
                      <input id={related.name} type="checkbox" />
                    </div>

                    {/* related choices */}
                    {state.mainChecked &&
                      related.choices.map((choice: any) => {
                        return (
                          <div className="related-choices">
                            <label className="choices">{choice.name}</label>
                            <input id={choice.name} type="checkbox" />
                          </div>
                        );
                      })}
                  </>
                );
              })}
          </>
        );
      })}
    </div>
  );
};

export default MainMenu;
