import React from 'react';
import { ScrollView, StyleSheet, ToastAndroid, Dimensions } from 'react-native';
import { FAB, Divider } from 'react-native-paper';

import * as Fragments from './fragments';

/**
 * @todo use refs to fetch information from children
 */
export default class Report extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      flags: [
        {
          "Sexual Harassment": false,
          "Physical Harassment": false,
          "Emotional Harassment": false,
          "Verbal Harassment": false
        }
      ],
      fabGroupVisible: true, // this is used to toggle visiblity when the TextInputs are active
      culpritDescription: {},
      incedentDescription: {},
    };

    this.actions = [
      {icon: "file", label:"Send Publicly", onPress: this._publicSend},
      {icon: "incognito", label: "Send Private", onPress: this._anonymousSend},
    ];

    this.FULL_SCREEN_HEIGHT = Dimensions.get("window").height
  }

  // CATEGORIES
  _toggleFlag = (flagName) => {
    let flags = [...this.state.flags];
    let fl = flags.length; // fl flagLength
    let newFlag = {...flags[fl-1]} // last flags object
    newFlag[flagName] = !newFlag[flagName];
    flags.push(newFlag);

    flags[flagName] = !flags[flagName];

    this.setState({flags}); // the most recent flag is located as the last member of the array
  }

  // INCEDENT DESCRIPTION DETAILS
  _setDescription = (incedentDescrition) => {
    console.log(incedentDescrition);
  }

  // culprit description details
  _setCulpritDescription = (culpritDescription) => {
    console.log(culpritDescription);
  }

  // setPrivateInformation
  _setPrivateInformation = () => {
    console.log(privateIformation);
  }

  _anonymousSend = () => {
    console.log("Anonymous send initiated")
  }

  _publicSend = () => {
    console.log("User wanted to send publicly");
  }

  _stateChange = ({open}) => this.setState({open})

  _initiateSend = () => {
    if(!this.state.open)
      ToastAndroid.show("You are about to send sensitive info", ToastAndroid.SHORT);
  }

  // Toggle TextInput Visibility
  _toggleFABVisibility = () => this.setState({fabGroupVisible: !this.state.fabGroupVisible});

  _handleLayoutChange = ({nativeEvent}) => (nativeEvent.layout.height < (0.8 * this.FULL_SCREEN_HEIGHT))
      ? this.setState({fabGroupVisible: false}) // dont display FABGroup if display size is less than 80%
      : this.setState({fabGroupVisible: true});

  render() {
    let lastFlags = this.state.flags[this.state.flags.length - 1];

    return (
      <ScrollView 
        style={styles.screen}
        onLayout={this._handleLayoutChange}
      >
        <Fragments.Chips
          flags={lastFlags}
          toggleFlag={this._toggleFlag}
        />
        <Divider />
        <Fragments.IncedentDescription 
          setDescription={this._setDescription}
        />
        <Divider />
        <Fragments.CulpritDescription 
          setCulpritDescription={this._setCulpritDescription}
        />
        <Divider />
        <Fragments.PrivateInformation 
          setPrivateInormation={this._setPrivateInformation}
        />
        {/* <FAB.Group
          style={styles.fabGroup}
          icon="file-send"
          open={this.state.open}
          onStateChange={this._stateChange}
          actions={this.actions}
          onPress={this._initiateSend}
          visible={this.state.fabGroupVisible}
        /> */}
        <FAB
          icon="file-send"
          label="Send Information"
          style={styles.fabGroup}
        />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },
  fabGroup: {
    marginTop: 16,
    marginBottom: 16,
    alignSelf: "center",
    width: (Dimensions.get("window").width - 32),
  },
});