import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addRepository } from "../redux";

class AddRepositoryButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: "", repository: ""};

        this.changeUser = this.changeUser.bind(this);
        this.changeRepository = this.changeRepository.bind(this);
        this.handleAddRepository = this.handleAddRepository.bind(this);
    }

    changeUser(event) {
        this.setState({"user": event.target.value,});
    }

    changeRepository(event) {
        this.setState({"repository": event.target.value});
    }

    handleAddRepository(event) {
        this.props.addRepository(
            "github",
            this.state.user,
            this.state.repository
        );
        this.setState({ user: "", repository: ""});
        event.preventDefault();
        return false;
    }

    render() {
        return (
            <form className="mt-auto" onSubmit={this.handleAddRepository}>
                <div className="input-group">
                    <input type="text"
                        className="form-control"
                        placeholder="User"
                        aria-label="User"
                        value={this.state.user}
                        onChange={this.changeUser}></input>
                    <input type="text"
                        className="form-control"
                        placeholder="Repository"
                        aria-label="Repository"
                        value={this.state.repository}
                        onChange={this.changeRepository}></input>
                    <div className="input-group-append">
                        <input type="submit" className="btn btn-primary"
                            value="Add!">
                        </input>
                    </div>
                </div>
            </form>
        );
    }
}

AddRepositoryButton.propTypes = {
    addRepository: PropTypes.func.isRequired
};

export default connect(null, {
    addRepository
})(AddRepositoryButton);
