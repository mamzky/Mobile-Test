
import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
// import { StyleSheet, View, Button, Text } from 'react-native'

class SplashScreen extends React.Component {

    static navigationOptions = {
        title: "Home"
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('HomeNavigation')
        }, 2000);
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <ImageBackground style={{ height: '100%', width: '100%'}}
                    source={require('../img/image.png')}>
                        <Text 
                        style={{color:'white', fontWeight:'bold', fontSize:90, marginTop:20, marginLeft:20}}
                        >MOVIE</Text>
                        <Text 
                        style={{color:'white', fontWeight:'bold', fontSize:60, marginLeft:20}}
                        >NIGHT</Text>
                </ImageBackground>
            </View>
        )
    }
}

export default SplashScreen