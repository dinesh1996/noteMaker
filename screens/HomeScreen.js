/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Button } from 'react-native-paper';
import ItemNote from '../components/ItemNote';
import DatabaseService from '../services/databaseService';
import TranslateService from '../services/translateService';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAll } from '../redux/actions/notesActions';

import JsonData from '../services/translateList.json';

class HomeScreen extends Component {
    static navigationOptions = e => {
        return {
            title: 'HomePage',
            headerRight: (
                <Icon
                    size={25}
                    name="ios-add"
                    style={{
                        padding: 25
                    }}
                    onPress={() => {
                        e.navigation.push('Authentication');
                    }}
                />
            ),
            headerLeft: (
                <Icon
                    size={25}
                    name="md-share"
                    style={{ padding: 25 }}
                    onPress={() => {
                        e.navigation.push('Sharing');
                    }}
                />
            )
        };
    };

    static propTypes = {
        getAll: PropTypes.func.isRequired,
        notes: PropTypes.array.isRequired
    };

    databaseService = new DatabaseService();
    translate = new TranslateService();

    state = {
        notes: null,
        language: "fr"
    };

    componentDidMount() {
        this.props.getAll();
        this.setState({ notes: this.props.notes });
    }

    delete = () => {
        console.info('delete');
    };

    countryList = () => {
        return (JsonData.data.map((x, i) => {
            return (<Picker.Item label={x.Value} key={i} value={x.Key} />)
        }));
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.notes === null ? (
                    <View>
                        <ActivityIndicator />
                    </View>
                ) : (
                        <View>
                            <FlatList
                                data={this.state.notes}
                                renderItem={e => (
                                    <ItemNote key={e.item.id} note={e.item} onDelete={this.delete} />
                                )}
                                keyExtractor={item => item.id.toString()}
                            />
                            <TextInput
                                style={{ height: 40 }}
                                placeholder="Type here to translate!"
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            />
                            <Button onPress={() =>
                                this.translate.getTranslation(this.state.text,
                                    JsonData.data.find(elem => elem.Key == this.state.originLanguage).Key,
                                    JsonData.data.find(elem => elem.Key == this.state.traductionLanguage).Key).then(resp => {
                                        this.setState({ text: resp.data[0][0][0] })
                                        console.log(resp.data[0][0][0])
                                    })
                            }> Translate
                            </Button>

                            <Picker
                                selectedValue={this.state.originLanguage}
                                style={{ height: 50, width: 200 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ originLanguage: itemValue })
                                }>
                                {this.countryList()}
                            </Picker>

                            <Picker
                                selectedValue={this.state.traductionLanguage}
                                style={{ height: 50, width: 200 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ traductionLanguage: itemValue })
                                }>
                                {this.countryList()}
                            </Picker>
                        </View>
                    )
                }
            </View>
            /*<View>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <Button onPress={() =>
                    this.translate.getTranslation(this.state.text).then(resp => {
                        this.setState({ text: resp.data[0][0][0] })
                        console.log(resp.data[0][0][0])
                    })
                }> Translate
                </Button>
            </View>*/
        );
    }
}

const mapStateToProps = stateStore => {
    return {
        notes: stateStore.notes.notes
    };
};

const mapActionsToProps = payload => {
    return {
        getAll: bindActionCreators(getAll, payload)
    };
};

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);
