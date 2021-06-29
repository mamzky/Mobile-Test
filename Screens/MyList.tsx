
import axios from 'axios'
import React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import CustomList from '../Component/CustomList'
import Constants from '../Constant'


class MyList extends React.Component {

    static navigationOptions = {
        title: "MyList"
    }
    state = {
        listPopularPeople: [],
        myListData: []
    }

    componentDidMount() {
        this.getPopularPeople()
    }

    getPopularPeople() {
        axios.get(Constants.BASE_URL_PERSON + 'popular?api_key=' + Constants.API_KEY)
            .then((response) => {
                let json = response.data
                let tempPopularPeople = []
                json.results.map((item) => {
                    tempPopularPeople.push(item)
                })
                this.setState({ listPopularPeople: tempPopularPeople })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%', width: '100%' }}>

                {/* POPULAR PEOPLE*/}
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>POPULAR PEOPLE</Text>
                <CustomList data={this.state.listPopularPeople} type={'person'} />

                {/* TOP RATED */}
                {this.state.myListData.length > 1 && (
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10 }}>TOP RATED TV SHOW !</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ maxHeight: 220 }}
                        >
                            {this.state.myListData.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} activeOpacity={.7} style={{ marginRight: 10, marginLeft: index == 0 ? 10 : 0 }}>
                                        <View style={{ height: 200, width: 140, borderRadius: 10 }}>
                                            <Image
                                                style={{ height: '100%', width: '100%', borderRadius: 10 }}
                                                source={{ uri: Constants.BASE_URL_IMAGE + item.poster_path }}
                                            />
                                        </View>

                                        <Text style={{ maxWidth: 140, textAlign: 'center' }}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>

                )}

            </ScrollView>
        )
    }
}

export default MyList