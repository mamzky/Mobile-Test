import React from "react";
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Constants from '../Constant'
import moment from "moment";
import Icon from 'react-native-vector-icons/Feather'

class CustomList extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        modalVisible: false,
        itemSelected: ''
    }

    static propsType = {
        data: PropTypes.array,
        onPress: PropTypes.func,
        type: PropTypes.string
    }

    static defaultProps = {
        colors: ['#C42A2A', '#911313'],
        isShow: false,
        type: 'movies'
    }

    render() {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ maxHeight: 220 }}
            >
                {this.props.data.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                console.log(item)
                                this.setState({ modalVisible: true, itemSelected: item })
                            }}
                            key={index} activeOpacity={.7} style={{ marginRight: 10, marginLeft: index == 0 ? 10 : 0 }}>
                            <View style={{ height: 200, width: 140, borderRadius: 10 }}>
                                {this.props.type === 'movies' || this.props.type === 'tv' ?
                                    <Image
                                        style={{ height: '100%', width: '100%', borderRadius: 10 }}
                                        source={{ uri: Constants.BASE_URL_IMAGE + item.poster_path }}
                                    />
                                    :
                                    <Image
                                        style={{ height: '100%', width: '100%', borderRadius: 10 }}
                                        source={{ uri: Constants.BASE_URL_IMAGE + item.profile_path }}
                                    />
                                }

                            </View>

                            <Text style={{ maxWidth: 140, textAlign: 'center' }}>{this.props.type === 'movies' ? item.title : item.name}</Text>

                        </TouchableOpacity>
                    )
                })}
                <Modal
                    backdropOpacity={0.9}
                    isVisible={this.state.modalVisible}
                    onBackdropPress={() => {
                        this.setState({ modalVisible: false })
                    }}
                >
                    <TouchableOpacity style={{ width: '100%', flexDirection: 'row-reverse' }} onPress={() => this.setState({ modalVisible: false })}>
                        <Icon name={'x-circle'} size={40} color={'white'} />
                    </TouchableOpacity>
                    <ScrollView style={{ flex: 1, backgroundColor: 'white', borderRadius: 10 }}>
                        {this.props.type === 'movies' || this.props.type === 'tv' ?
                            <Image
                                style={{ height: 300, width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                source={{ uri: Constants.BASE_URL_IMAGE + this.state.itemSelected.poster_path }}
                            />
                            :
                            <Image
                                style={{ height: 300, width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                source={{ uri: Constants.BASE_URL_IMAGE + this.state.itemSelected.profile_path }}
                            />
                        }
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontWeight: '600', fontSize: 24 }}>{this.props.type === 'movies' ? this.state.itemSelected.title : this.state.itemSelected.name}</Text>
                            <Text style={{ fontSize: 14 }}>{this.props.type != 'person' && this.state.itemSelected.overview}</Text>
                            <View style={{ height: .7, width: '100%', backgroundColor: 'grey', marginTop: 10, marginBottom: 10 }}></View>

                            {this.props.type === 'person' &&
                                <Text style={{ fontSize: 14 }}>{this.state.itemSelected.gender === 2 ? 'Gender : Female' : 'Gender : Female'}</Text>
                            }
                            {this.props.type != 'person' &&
                                <Text style={{ fontSize: 14 }}>{'Release Date : ' + moment(this.state.itemSelected.release_date).format('DD MMMM YYYY')}</Text>
                            }
                            {this.props.type != 'person' &&
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14 }}>{'Rated : ' + this.state.itemSelected.vote_average}</Text>
                                    <Icon size={15} color={'yellow'} name={'star'} />
                                </View>
                            }

                        </View>
                    </ScrollView>
                </Modal>
            </ScrollView>
        )
    }
}

export default CustomList