import React from 'react';

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onKeywordChangeHandler(event) {
    const keyword = event.target.value;
    this.setState({ keyword });
    this.props.onSearch(keyword);
  }

  render() {
    return (
      <div className="note-search" data-testid="note-search">
        <input
          type="text"
          placeholder="Cari catatan ..."
          value={this.state.keyword}
          onChange={this.onKeywordChangeHandler}
          data-testid="note-search-input"
        />
      </div>
    );
  }
}

export default NoteSearch;
