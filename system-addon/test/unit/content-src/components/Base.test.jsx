import {_Base as Base, BaseContent} from "content-src/components/Base/Base";
import {ErrorBoundary} from "content-src/components/ErrorBoundary/ErrorBoundary";
import React from "react";
import {Search} from "content-src/components/Search/Search";
import {shallow} from "enzyme";

describe("<Base>", () => {
  let DEFAULT_PROPS = {store: {getState: () => {}}, App: {initialized: true}, Prefs: {values: {}}, dispatch: () => {}};

  it("should render Base component", () => {
    const wrapper = shallow(<Base {...DEFAULT_PROPS} />);
    assert.ok(wrapper.exists());
  });

  it("should render the BaseContent component, passing through all props", () => {
    const wrapper = shallow(<Base {...DEFAULT_PROPS} />);

    assert.deepEqual(wrapper.find(BaseContent).props(), DEFAULT_PROPS);
  });

  it("should fire NEW_TAB_REHYDRATED event", () => {
    const dispatch = sinon.spy();
    shallow(<Base {...Object.assign({}, DEFAULT_PROPS, {dispatch})} />);
    assert.calledOnce(dispatch);
    const [action] = dispatch.firstCall.args;
    assert.equal("NEW_TAB_REHYDRATED", action.type);
  });

  it("should render an ErrorBoundary with class base-content-fallback", () => {
    const wrapper = shallow(<Base {...DEFAULT_PROPS} />);

    assert.equal(
      wrapper.find(ErrorBoundary).first().prop("className"), "base-content-fallback");
  });
});

describe("<BaseContent>", () => {
  let DEFAULT_PROPS = {store: {getState: () => {}}, App: {initialized: true}, Prefs: {values: {}}, dispatch: () => {}};

  it("should render an ErrorBoundary with a Search child", () => {
    const searchEnabledProps =
      Object.assign({}, DEFAULT_PROPS, {Prefs: {values: {showSearch: true}}});

    const wrapper = shallow(<BaseContent {...searchEnabledProps} />);

    assert.isTrue(wrapper.find(Search).parent().is(ErrorBoundary));
  });
});
