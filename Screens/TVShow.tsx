
import React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Constants from '../Constant'
import CustomList from '../Component/CustomList'
import axios from 'axios'
import LoadingIndicator from '../Component/LoadingIndicator'

class TVShow extends React.Component {

    static navigationOptions = {
        title: "Home"
    }
    state = {
        listPopularTVShow: [],
        listTopRatedTVShow: [],
        listOnTheAirTVShow: [],
        listAiringTodayTVShow: [],
        isLoading: false
    }

    componentDidMount() {
        this.setState({isLoading : true})
        this.PopularTVShow()
        this.TopRatedTVShow()
        this.OnTheAirTVShow()
        this.AiringTodayTVShow()
        setTimeout(() => {
            this.setState({isLoading : false})
        }, 2000);
        

    }

    PopularTVShow() {
        axios.get(Constants.BASE_URL_TV + 'popular?api_key=' + Constants.API_KEY)
            .then((response) => {
                let json = response.data
                let tempPopularTVShow = []
                json.results.map((item) => {
                    tempPopularTVShow.push(item)
                })
                this.setState({ listPopularTVShow: tempPopularTVShow })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    TopRatedTVShow() {
        axios.get(Constants.BASE_URL_TV + 'top_rated?api_key=' + Constants.API_KEY)
            .then((response) => {
                let json = response.data
                let tempTopRatedTVShow = []
                json.results.map((item) => {
                    tempTopRatedTVShow.push(item)
                })
                this.setState({ listTopRatedTVShow: tempTopRatedTVShow })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    OnTheAirTVShow() {
        axios.get(Constants.BASE_URL_TV + 'on_the_air?api_key=' + Constants.API_KEY)
            .then((response) => {
                let json = response.data
                let tempOnTheAirTVShow = []
                json.results.map((item) => {
                    tempOnTheAirTVShow.push(item)
                })
                this.setState({ listOnTheAirTVShow: tempOnTheAirTVShow })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    AiringTodayTVShow() {
        axios.get(Constants.BASE_URL_TV + 'airing_today?api_key=' + Constants.API_KEY)
            .then((response) => {
                let json = response.data
                let templistAiringTodayTVShow = []
                json.results.map((item) => {
                    templistAiringTodayTVShow.push(item)
                })
                this.setState({ listAiringTodayTVShow: templistAiringTodayTVShow })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%', width: '100%' }}>
                <LoadingIndicator isShow={this.state.isLoading} />
                {/* POPULAR */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>POPULAR TV SHOW</Text>
                <CustomList data={this.state.listPopularTVShow} type={'tv'} />

                {/* TOP RATED */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>TOP RATED TV SHOW !</Text>
                <CustomList data={this.state.listTopRatedTVShow} type={'tv'} />

                {/* ON THE AIR */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>ON THE AIR TV SHOW !</Text>
                <CustomList data={this.state.listOnTheAirTVShow} type={'tv'} />

                {/* AIRING TODAY */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>AIRING TODAY TV SHOW !</Text>
                <CustomList data={this.state.listAiringTodayTVShow} type={'tv'} />
            </ScrollView>
        )
    }
}

export default TVShow