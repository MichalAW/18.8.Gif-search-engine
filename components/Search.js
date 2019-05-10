Search = React.createClass({
    getInitialState() {
        return {
             searchingText: ''
        };
    },
    handleChange: function (event) {
        var searchingText = event.target.value;
        this.setState({searchingText: searchingText});

        // If the condition has been met, launch the function passed to the property:
        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        }
    },

    handleKeyUp: function (event) {

        // pressed  key 'Enter' sends a message to the parent, so it starts the function that sends the query after the gif:
        // The code of the Enter key is 13
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.searchingText);
        }
    },

    render: function () {
        var styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        };

        return <input
                    type="text"
                    onChange={this.handleChange}
                    // listening by "pressing" the 'Enter' key
                    onKeyUp = {this.handleKeyUp}
                    placeholder = "Enter the search phrase here"
                    style = {styles}
                    value = {this.state.searchTerm}
                />
    }
});