import React from "react";

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: "",
    };

    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
  }

  onSearchChangeHandler(event) {
    const keyword = event.target.value;
    this.setState({ searchKeyword: keyword });
    this.props.onSearch(keyword);
  }

  render() {
    return (
      <div className="note-search" data-testid="note-search">
        <input
          className="note-search__input"
          type="text"
          placeholder="Cari catatan ..."
          value={this.state.searchKeyword}
          onChange={this.onSearchChangeHandler}
          data-testid="note-search-input"
        />
      </div>
    );
  }
}

export default NoteSearch;
