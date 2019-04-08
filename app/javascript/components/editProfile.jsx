import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: props.user.state || "",
      party: props.user.party || ""
    };
    this.updateParty = this.updateParty.bind(this);
    this.updateState = this.updateState.bind(this);
    this.close = this.close.bind(this);
  }

  updateParty(e) {
    this.setState({
      party: e.target.value
    });
  }

  updateState(e) {
    this.setState({
      state: e.target.value
    });
  }

  close(e) {
    e.preventDefault();
    this.props.closeButton();
  }

  saveDisabled() {
    let InValidState = this.state.state.length < 2;
    let InValidParty = this.state.party.length < 2;
    return InValidState || InValidParty;
  }
  render() {
    let listOfParties = ["BJP", "INC", "CPI", "CPI(M)", "BSP", "AITC", "NCP"];
    let listOfStates = [
      "Andaman and Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal"
    ];
    return (
      <div className="w-full md:w-2/3 ">
        <button onClick={this.close} className="p-1">
          Close
        </button>

        <form className="px-8 pt-6 pb-8 mb-4" action={"/users"} method="post">
          <input name="_method" value="patch" type="hidden" />
          <input
            type="hidden"
            name="authenticity_token"
            value={this.props.authenticityToken}
          />
          <div className="w-full mb-6">
            <label
              className="block tracking-wide text-lg mb-2"
              htmlFor="select-state"
            >
              I am from
            </label>
            <div className="inline-block relative w-64">
              <select
                onChange={this.updateState}
                name="user[state]"
                value={this.state.state}
                className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select your state</option>
                {listOfStates.map(state => {
                  return <option key={state}>{state}</option>;
                })}
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full mb-6">
            <label
              className="block tracking-wide text-lg mb-2"
              htmlFor="political-view"
            >
              I support
            </label>
            <div className="inline-block relative w-64">
              <select
                onChange={this.updateParty}
                name="user[party]"
                value={this.state.party}
                className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select your party</option>
                {listOfParties.map(party => {
                  return <option key={party}>{party}</option>;
                })}
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              className="btn"
              type="submit"
              value="Submit"
              disabled={this.saveDisabled()}
            >
              Update your profile
            </button>
          </div>
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  authenticityToken: PropTypes.string,
  user: PropTypes.object,
  closeButton: PropTypes.func
};
