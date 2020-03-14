import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainMenu from "../components/MainMenu";

Enzyme.configure({ adapter: new Adapter() });

describe("Tests for main menu component", () => {
  const wrapper = mount(<MainMenu />);

  it("should render main menu component without fail", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should display the title on load", () => {
    const title = wrapper.find("h1");
    expect(title.contains("Restaurant Menu")).toEqual(true);
  });

  it("should display main menu", () => {
    expect(wrapper.contains("Salad")).toEqual(true);
    expect(wrapper.contains("Entree")).toEqual(true);
    expect(wrapper.contains("Soup")).toEqual(true);
  });

  it("on click it should expand menu", () => {
    const checkbox = wrapper.find("#mainChecked").first();
    checkbox.simulate("click");
    expect(wrapper.contains("Greek")).toEqual(true);
  });

  it("it should open related menu name on click", () => {
    const checkbox = wrapper.find("#showRelated").first();
    checkbox.simulate("click");
    expect(wrapper.contains("Dressing")).toEqual(true);
  });

  it("it should open related menu choices on menu name click", () => {
    const checkbox = wrapper.find("#Dressing").first();
    checkbox.simulate("click");
    expect(wrapper.contains("Italian")).toEqual(true);
  });
});
