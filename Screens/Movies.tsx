import React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import Constants from '../Constant'
import AppNavigation from '../Navigation/AppNavigation'

import CustomList from '../Component/CustomList'
import LoadingIndicator from '../Component/LoadingIndicator'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const listMovieData = async (key) =>{
    try {
        const value = await AsyncStorage.getItem(key)
        return JSON.parse(value)
    } catch (error) {
        console.error();
        return []
    } 
}


class Movies extends React.Component {

    static navigationOptions = {
        title: "Home"
    }
    state = {
        listTopRated: [],
        listNowPlaying: [],
        listUpcoming: [],
        listPopular: [],
        visibleModal: true,
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        this.getTopRated()
        this.getNowPlaying()
        this.getUpcoming()
        this.getPopular()
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 2000);
    }

    storeData = async (key, data) => {
        try {
            await AsyncStorage.setItem(
                key,
                data
            )
            console.log('AMAN')
        } catch (error) {
            console.error();
        }
    }

    retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            return value
        } catch (error) {
            console.error();
            return []
        }
    }

    

    getNowPlaying = async () =>  {
        axios.get(Constants.BASE_URL + 'now_playing?api_key=' + Constants.API_KEY)
            .then((response) => {
                let json = response.data
                let tempListNowPlaying = []
                json.results.map((item) => {
                    tempListNowPlaying.push(item)
                })
                this.setState({ listNowPlaying: tempListNowPlaying })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getTopRated() {
        axios.get(Constants.BASE_URL + 'top_rated?api_key=' + Constants.API_KEY)
            .then((response) => {
                let json = response.data
                let tempListTopRated = []
                json.results.map((item) => {
                    tempListTopRated.push(item)
                })
                this.setState({ listTopRated: tempListTopRated })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getUpcoming() {
        axios.get(Constants.BASE_URL + 'upcoming?api_key=' + Constants.API_KEY)
            .then((response) => {
                let json = response.data
                let tempListUpcoming = []
                json.results.map((item) => {
                    tempListUpcoming.push(item)
                })
                this.setState({ listUpcoming: tempListUpcoming })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getPopular() {
        axios.get(Constants.BASE_URL + 'popular?api_key=' + Constants.API_KEY)
            .then((response) => {
                let json = response.data
                let tempListPopular = []
                json.results.map((item) => {
                    tempListPopular.push(item)
                })
                this.setState({ listPopular: tempListPopular })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%', width: '100%' }}>
                <LoadingIndicator isShow={this.state.isLoading} />
                {/* NOW PLAYING */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>NOW PLAYING MOVIES</Text>
                {this.state.listNowPlaying.length > 0 &&
                    <CustomList data={this.state.listNowPlaying} />
                }

                {/* TOP RATED */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>TOP RATED MOVIES !</Text>
                <CustomList data={this.state.listTopRated} />

                {/* UPCOMING */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>UPOMING MOVIES !</Text>
                <CustomList data={this.state.listUpcoming} />

                {/* POPULAR */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>POPULAR MOVIES !</Text>
                <CustomList data={this.state.listPopular} />
            </ScrollView>
        )
    }
}

export default Movies