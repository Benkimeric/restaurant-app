import React, { useState } from "react";

import menu from "../mock/menu.json";

const MainMenu = () => {
  const [state, setState] = useState<any>(menu);

  const handleClick = (name: String) => {
    setState((state: any) =>
      state.map((item: any) => {
        let val = item;
        if (item.name === name) {
          val = {
            ...val,
            expand: val.expand ? false : true,
            expandChoices: val.expand ? false : val.expandChoices,
            related: val.related.map((related: any) => ({
              ...related,
              expandRelated: val.expand ? false : related.expandRelated
            }))
          };
        }

        return val;
      })
    );
  };

  const otherChoicesUnchecked = (name: any, choices: any): boolean => {
    const checkedChoices = choices.filter((choice: any) => {
      if (choice.checked && choice.name !== name) {
        return true;
      }
      return false;
    });

    return checkedChoices.length === 0;
  };

  const clickChoice = (name: string, choiceName: string) => {
    setState((state: any) =>
      state.map((item: any) => {
        let val = item;
        if (item.name === name) {
          const othersUnchecked = otherChoicesUnchecked(
            choiceName,
            val.choices
          );

          val = {
            ...val,
            expandChoices: val.expandChoices && othersUnchecked ? false : true,
            related: val.related.map((related: any) => ({
              ...related,
              expandRelated:
                val.expandChoices && othersUnchecked ? false : val.expandRelated
            })),
            choices: val.choices.map((choice: any) => {
              if (choice.name === choiceName) {
                return {
                  ...choice,
                  checked:
                    choice.checked && choice.name === choiceName
                      ? false
                      : choice.name === choiceName
                };
              }

              return choice;
            })
          };
        }

        return val;
      })
    );
  };

  const openRelated = (choiceName: string, relatedName: string) => {
    setState((state: any) =>
      state.map((item: any) => {
        let value = item;
        let related = [];

        if (value.name === choiceName) {
          related = value.related.map((related: any) => {
            if (related.name === relatedName) {
              return {
                ...related,
                expandRelated: related.expandRelated ? false : true
              };
            }
            return related;
          });
        }

        return { ...value, related };
      })
    );
  };

  return (
    <div>
      <h1>Restaurant Menu</h1>
      {state.map((menu: any, idx: any) => {
        return (
          <>
            <div key={idx}>
              <label htmlFor={menu.name}>{menu.name}</label>
              <input
                id={"mainChecked"}
                type="checkbox"
                onClick={() => handleClick(menu.name)}
              />
            </div>

            {/* choices */}
            {menu.expand &&
              menu.choices.map((choice: any) => {
                return (
                  <div className="choices">
                    <label>{choice.name}</label>
                    <input
                      id="showRelated"
                      type="checkbox"
                      onClick={e => clickChoice(menu.name, choice.name)}
                    />
                  </div>
                );
              })}

            {/* related names*/}
            {menu.expandChoices && menu.related.length > 0 && (
              <p className="related-choices">You may also want:</p>
            )}
            {menu.expandChoices &&
              menu.related.map((choice: any) => {
                return (
                  <div className="related-choices">
                    <label className="choices">{choice.name}</label>
                    <input
                      id={choice.name}
                      type="checkbox"
                      onClick={() => openRelated(menu.name, choice.name)}
                    />
                    {/* related choices */}
                    {choice.expandRelated &&
                      choice.choices.map((relatedChoice: any) => {
                        return (
                          <div className="related-choice">
                            <label className="">{relatedChoice.name}</label>
                            <input id={relatedChoice.name} type="checkbox" />
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </>
        );
      })}
    </div>
  );
};

export default MainMenu;
