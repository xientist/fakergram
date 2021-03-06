import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
// import { loginUser } from './../actions/auth';
import { Card, CardSection, Input, Button, Spinner, Confirm } from './common';
import { startRemovePics, startGetPics } from '../actions/pics';
import { Actions } from 'react-native-router-flux';


class PicView extends Component {
    state = {
        deleteModal: false
    };

    startDelete = () => {
        this.setState(() => ({ deleteModal: true }));
    };

    onAccept = () => {
        this.props.startRemovePics({ id: this.props.id });
        this.setState(() => ({ deleteModal: false }));
        Actions.profile();
        this.props.startGetPics();
    };

    onDecline = () => {
        this.setState(() => ({ deleteModal: false }));
    };

    render() {
        return (
            <View style ={styles.picBackground}>
                <CardSection style={{ backgroundColor: 'black', borderColor: 'black' }}>
                    <Image source={{ uri: this.props.uri }} style={styles.imageView} />
                </CardSection>
                <TouchableHighlight onPress={this.startDelete}>
                    <Text style={{ color: 'white' }}>Delete</Text>
                </TouchableHighlight>
                <Confirm
                    visible={this.state.deleteModal}
                    onAccept={this.onAccept}
                    acceptPhrase="Yes"
                    onDecline={this.onDecline}
                    declinePhrase="No"
                >
                    Are you sure you want to delete?
                </Confirm>
            </View>
        );
    };
};

const windowSize = Dimensions.get('window');
const styles = {
  imageView: {
    width: windowSize.width,
    height: windowSize.height/2
  },
  picBackground: {
      height: windowSize.height,
      backgroundColor: 'black',
      paddingTop: windowSize.height/5
  }
};



const mapDispatchToProps = (dispatch) => ({
    startRemovePics: (id) => dispatch(startRemovePics(id)),
    startGetPics: () => dispatch(startGetPics())
})

export default connect(undefined, mapDispatchToProps)(PicView);