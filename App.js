import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Conv from './components/conversion'
import Measure from './components/measure'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
var convert = require('convert-units')

class Home extends Component {
  static navigationOptions = {
    title: 'Converter',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      conversions: [],

    }
  }

 componentDidMount() {
    this.makeDataRequest();
  }

  makeDataRequest = () => {
    this.setState({ loading: true });
    const data = convert().measures()
    this.setState({
      loading: false,
      conversions: data
    });
  }

  

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.conversions}
          renderItem={({ item }) => <Conv title={item} />}
          keyExtractor={item => item}
        />
      </SafeAreaView>


    );
  }
}

const AppNavigator = createStackNavigator({ 
  Home: { screen: Home },
  Measure:{screen:Measure},
 
 },
 {
   initialRouteName: 'Home',

});
const App = createAppContainer(AppNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
 });

