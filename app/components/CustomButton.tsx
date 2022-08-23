import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface CustomButtonProps {
  color: string;
  text: string;
}

const CustomButton = ({color, text}: CustomButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: color}]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});