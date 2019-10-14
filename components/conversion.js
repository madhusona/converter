import React, { Component } from 'react';
import { TouchableOpacity,View, StyleSheet,Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign'
class Conv extends Component {
    
    onPress = () => {
     
        this.props.navigation.navigate('Measure', {
            itemId: this.props.title,
            otherParam: 'Home',
          });
    }
    
      render() {
        return (
          <TouchableOpacity onPress={this.onPress}>
            <View elevation={3} style={styles.item} >
              <Text style={styles.title}>{this.props.title}</Text>
              <Icon name='right' size={25}/>
            </View>
          </TouchableOpacity>
    
        );
      }
}

export default withNavigation(Conv);

const styles = StyleSheet.create({
    container: {
      flex: 1,
  
    },
    item: {
      backgroundColor: '#ffffff',
      borderColor: '#000000',     
      borderWidth: 0.5,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:10,
      shadowColor: '#000000',
      flexDirection:'row',
      justifyContent: 'space-between',
     
      
    },
    title: {
      fontSize: 32,
    },
  });