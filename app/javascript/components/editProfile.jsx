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
      <div className="h-full w-full flex flex-col justify-center fixed bg-white z-30 items-center">
        <div className="w-full max-w-sm">
          <div className="flex w-full justify-end p-6">
            <button onClick={this.close} className="p-1">
              Close
            </button>
          </div>

          <form className="w-full p-6 mb-4" action={"/users"} method="post">
            <input name="_method" value="patch" type="hidden" />
            <input
              type="hidden"
              name="authenticity_token"
              value={this.props.authenticityToken}
            />
            <div className="w-full mb-6">
              <label className="block mb-2" htmlFor="select-state">
                I am from
              </label>
              <div className="inline-block relative w-full">
                <select
                  onChange={this.updateState}
                  name="user[state]"
                  value={this.state.state}
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey h-12 rounded shadow focus:outline-none"
                >
                  <option value="">Select your state</option>
                  {listOfStates.map(state => {
                    return <option key={state}>{state}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="w-full mb-6">
              <label className="block mb-2" htmlFor="political-view">
                I support
              </label>
              <div className="inline-block relative w-full">
                <select
                  onChange={this.updateParty}
                  name="user[party]"
                  value={this.state.party}
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey h-12 rounded shadow focus:outline-none"
                >
                  <option value="">Select your party</option>
                  {listOfParties.map(party => {
                    return <option key={party}>{party}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center mt-4">
              <button className="btn" type="submit" value="Submit">
                Update your profile
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  authenticityToken: PropTypes.string,
  user: PropTypes.object,
  closeButton: PropTypes.func
};
