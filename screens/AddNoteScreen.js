import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { addNote } from '../redux/actions/notesActions';

class AddNoteScreen extends Component {
    static navigationOptions = e => {
        return {
            title: 'Ajouter une note',
            headerRight: (
                <Icon
                    size={25}
                    name={'ios-add'}
                    style={{ padding: 25 }}
                    onPress={e.navigation.getParam('save')}
                />
            )
        };
    };

    static propTypes = {
        addNote: PropTypes.func.isRequired
    };

    state = {
        title: '',
        content: ''
    };

    onChangeTitle = value => {
        this.setState({
            title: value
        });
    };

    onChangeContent = value => {
        this.setState({
            content: value
        });
    };

    save = () => {
        this.props.addNote(this.state);
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.title}
                    onChangeText={this.onChangeTitle}
                    placeholder="Title"
                />
                <TextInput
                    style={styles.text}
                    onChangeText={this.onChangeContent}
                    multiline
                    placeholder="Content"
                />
                <Button title="ajouter" onPress={this.save} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 22,
        padding: 20,
        borderBottomColor: 'black',
        borderStyle: 'solid',
        borderBottomWidth: 1
    },
    text: {
        fontSize: 22,
        padding: 20,
        flex: 1,
        textAlignVertical: 'top',
        flexShrink: 1
    }
});

const mapActionsToProps = payload => {
    return {
        addNote: bindActionCreators(addNote, payload)
    };
};

export default connect(null, mapActionsToProps)(AddNoteScreen);
