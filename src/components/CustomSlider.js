import React, { useState } from 'react';
import { StyleSheet, View, PanResponder, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const CustomSlider = ({ minValue, maxValue, step, value, onValueChange }) => {
  const [sliderWidth, setSliderWidth] = useState(screenWidth * 0.8); // Width of the slider
  const [thumbLeft, setThumbLeft] = useState((value - minValue) / (maxValue - minValue) * sliderWidth);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      let newThumbPosition = gestureState.dx + thumbLeft;

      if (newThumbPosition < 0) newThumbPosition = 0;
      if (newThumbPosition > sliderWidth) newThumbPosition = sliderWidth;

      setThumbLeft(newThumbPosition);

      const newValue = Math.round(((newThumbPosition / sliderWidth) * (maxValue - minValue) + minValue) / step) * step;
      onValueChange(newValue);
    },
    onPanResponderRelease: () => {},
  });

  // Calculate the width of the filled track based on thumb's position
  const filledTrackWidth = thumbLeft; // Update the width based on thumb's position

  return (
    <View style={styles.sliderContainer}>
      {/* Unfilled track */}
      <View style={[styles.track, { backgroundColor: '#FFFFFF' }]} />

      {/* Filled track */}
      <View style={[styles.filledTrack, { width: filledTrackWidth }]} />

      {/* Thumb */}
      <View {...panResponder.panHandlers} style={[styles.thumb, { left: thumbLeft }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: 20, // Track height is 20px
    borderRadius: 10, // To make the track have rounded corners
  },
  filledTrack: {
    position: 'absolute',
    alignSelf: 'flex-start',
    height: 20,
    backgroundColor: '#FE7503', // Filled track color
    borderRadius: 10, // Rounded corners for filled track
  },
  thumb: {
    position: 'absolute',
    width: 30,
    height: 30,
    marginLeft: -15,
    backgroundColor: '#FFA82E', // Thumb color
    borderRadius: 15,
  },
});

export default CustomSlider;
