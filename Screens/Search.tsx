
import React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native'
import Constants from '../Constant'
import CustomList from '../Component/CustomList'

import Icon from 'react-native-vector-icons/Feather'
import LoadingIndicator from '../Component/LoadingIndicator'
import axios from 'axios'

class Search extends React.Component {

    static navigationOptions = {
        title: "Upcoming"
    }

    state = {
        search: '',
        listMovies: [],
        listTv: [],
        listPeople: [],
        isLoading: false

    }
    componentDidMount() {

    }

    searchMovie(query) {
        axios.get(Constants.URL_SEARCH + 'movie?api_key=' + Constants.API_KEY + '&query=' + query)
            .then((response) => {
                let json = response.data
                let tempMovie = []
                json.results.map((item) => {
                    tempMovie.push(item)
                })
                this.setState({ listMovies: tempMovie })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    searchTV(query) {
        axios.get(Constants.URL_SEARCH + 'tv?api_key=' + Constants.API_KEY + '&query=' + query)
            .then((response) => {
                let json = response.data
                let tempTv = []
                json.results.map((item) => {
                    tempTv.push(item)
                })
                this.setState({ listTv: tempTv })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    searchPeople(query) {
        axios.get(Constants.URL_SEARCH + 'person/?api_key=' + Constants.API_KEY + '&query=' + query)
            .then((response) => {
                let json = response.data
                let tempPeople = []
                json.results.map((item) => {
                    tempPeople.push(item)
                })
                this.setState({ listPeople: tempPeople })
            })
            .catch((error) => {
                console.log(error)
            })
        console.log(this.state.listPeople.length)
    }

    searchAll(query) {
        this.setState({ isLoading: true })
        this.searchMovie(query)
        this.searchTV(query)
        this.searchPeople(query)
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 2000);
    }



    render() {
        return (
            <ScrollView style={{ height: '100%', width: '100%' }}>
                <LoadingIndicator isShow={this.state.isLoading} />
                <View style={{ width: '100%', height: 70, backgroundColor: 'red' }}>
                    <View style={{ flex: 1, margin: 10, backgroundColor: '#f5f5f5', borderRadius: 5, flexDirection: 'row' }}>
                        <View style={{ flex: 9 }}>
                            <TextInput
                                value={this.state.search}
                                onChangeText={(value) => {
                                    this.setState({ search: value })
                                    if (value != '') {
                                        this.setState({
                                            listMovies: [],
                                            listTv: [],
                                            listPeople: []
                                        })
                                        this.searchAll(value)
                                    }
                                }}
                                style={{ marginLeft: 10 }}
                                placeholder={'Search...'}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Icon name={'search'} size={30} color={'grey'} style={{ marginTop: 8 }} />
                        </View>
                    </View>
                </View>
                {this.state.search.length > 0 && (
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>{'Search Related to "' + this.state.search + '"'}</Text>
                )}

                {/* MOVIES */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>MOVIES</Text>
                {this.state.search != '' && (
                    this.state.listMovies.length == 0 ?
                        <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>{"We couldn't find Movie related to - "}<Text style={{ fontSize: 12, fontWeight: 'bold' }}>{this.state.search}</Text></Text>
                        :
                        <CustomList data={this.state.listMovies} />
                )}

                {/* TV SHOW */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>TV SHOW</Text>
                {this.state.search != '' && (
                    this.state.listTv.length == 0 ?
                        <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>{"We couldn't find Movie related to - "}<Text style={{ fontSize: 12, fontWeight: 'bold' }}>{this.state.search}</Text></Text>
                        :
                        <CustomList data={this.state.listTv} type={'tv'} />
                )}

                {/* PEOPLE */}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>PEOPLE</Text>
                {this.state.search != '' && (
                    this.state.listPeople.length == 0 ?
                        <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>{"We couldn't find Movie related to - "}<Text style={{ fontSize: 12, fontWeight: 'bold' }}>{this.state.search}</Text></Text>
                        :
                        <CustomList data={this.state.listPeople} type={'person'} />
                )}
            </ScrollView>
        )
    }
}

export default Search