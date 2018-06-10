import React, { Component } from "react";
import { connectSearchBox } from "react-instantsearch/connectors";

class CustomSearchBox extends Component {
  componentDidMount() {
    this.ref.focus();
  }

  render() {
    const { currentRefinement, refine} = this.props;
    return (
      <div className="ais-SearchBox">
        <form className="ais-SearchBox-form" action="" role="search">
          <input
            ref={c => (this.ref = c)}
            className="ais-SearchBox-input"
            placeholder="Search here…"
            onChange={event => refine(event.currentTarget.value)}
            value={currentRefinement}
          />
          <button
            type="submit"
            title="Submit your search query."
            className="ais-SearchBox-submit"
          >
            <svg
              className="ais-SearchBox-submitIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 40 40"
            >
              <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" />
            </svg>
          </button>
        </form>
      </div>
    );
  }
}

export default connectSearchBox(CustomSearchBox);
