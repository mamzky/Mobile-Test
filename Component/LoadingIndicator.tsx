import React from 'react';
import PropTypes from 'prop-types'
import { Modal, ActivityIndicator, View, Platform } from 'react-native'


class LoadingIndicator extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
        };
    }

    static propTypes = {
        isShow: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <Modal
                onRequestClose={() => { this.setState({ isShow: false }) }}
                transparent={true}
                animationType={'none'}
                visible={this.props.isShow}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            size={"large"}
                            color={"#C9041E"}
                            animating={true} />
                    </View>
                </View>
            </Modal>
        );
    }
}

export default LoadingIndicator

const styles = {
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 50,
        width: 50,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: 'center',
        paddingLeft: Platform.OS == "ios" ? 2.5 : 0,
        paddingTop: Platform.OS == "ios" ? 2.5 : 0
    }
};
