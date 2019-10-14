import React, { Component } from 'react';
import { Picker, View, StyleSheet, TextInput } from 'react-native';
import { Input, Block, theme, Text } from 'galio-framework';
var convert = require('convert-units')

export default class Measure extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      measure: '',
      possibilities: [],
      initial1: '',
      initial2: '',
      answer: '1',
      text1: '1',

    }
  }

  onCalculation = (option) => {
   

    var a = convert(this.state.text1).from(this.state.initial1).to(this.state.initial2)



    this.setState({
      answer: a,
     
      

    });



  }
  static getDerivedStateFromProps(props, state) {
    const { params } = props.navigation.state;
    
    if (params.itemId !== state.measure) {
      const data = convert().possibilities(params.itemId)
     
      return {
        possibilities: data,
        initial1: data[0],
        initial2: data[0],
        measure: params.itemId,

      };
    }

    return null;


  }



  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {

    let Items = this.state.possibilities.map((s, i) => {

      return <Picker.Item key={i} value={s} label={s} />
    });
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;
    const v = this.state.text1;
    return (
      <Block flex style={styles.group}>
        <Block row center>
          <Text h1 bold
            style={{ paddingBottom: theme.SIZES.BASE * 2 }}
          >
            {params.itemId}
          </Text>
        </Block>
        <Block row center>
          <Input placeholder={this.state.text1.toString()}
            value={this.state.text1}
            onChangeText={(text1) => this.setState({ text1: text1 }, () => {
              this.onCalculation()
            })}
            
          />
        </Block>
        <Block row center>
          <Block flex left>
            <Picker
              selectedValue={this.state.initial1}
              style={{ height: 50, width: 100 }}
              onValueChange={(service) => (this.setState({ initial1: service }, () => {
                // here is our callback that will be fired after state change.
                this.onCalculation()
              }))} >
              {Items}
            </Picker>
          </Block>
          <Block flex middle>
            <Text p style={{ paddingVertical: theme.SIZES.BASE * 2 }}>To</Text>
          </Block>
          <Block flex right>

            <Picker
              selectedValue={this.state.initial2}
              style={{ height: 50, width: 100 }}
              onValueChange={(service) => (this.setState({ initial2: service }, () => {
                // here is our callback that will be fired after state change.
                this.onCalculation()
              }))} >
              {Items}
            </Picker>


          </Block>
        </Block>


        <Block row center>
          <Text p style={{ paddingTop: theme.SIZES.BASE * 2 }}>{this.state.answer}</Text>
        </Block>
      </Block>


    );
  }
}

const styles = StyleSheet.create({

  group: {
    paddingTop: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 2
  },
});