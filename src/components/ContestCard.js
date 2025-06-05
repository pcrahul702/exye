import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ContestCard = ({ 
  contest, 
  imageUri, 
  topicName, 
  onPress,
  style 
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(contest)}
      style={[styles.contestTouchable, style]}
    >
      <LinearGradient
        colors={['#F05A5B', '#FFA952']}
        style={styles.contestContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.leftSide}>
          <Text style={styles.contestText}>
            Topic: {topicName || 'Loading...'}
          </Text>
          <Text style={styles.contestText}>
            Prize: ₹{contest.prizePerContestant}
          </Text>
          <Text style={styles.contestText}>
            Entry Fee: ₹{contest.entryAmount}
          </Text>
          {contest.playerJoined && (
            <Text style={styles.contestText}>
              Players Joined: {contest.playerJoined}
            </Text>
          )}
          <Text style={[styles.contestText, {
            color: contest.userContestStatus === 'NEW' ? '#FFFFFF' :
                   contest.userContestStatus === 'JOINED' ? '#00FF00' :
                   contest.userContestStatus === 'STARTED' ? '#FFFF00' :
                   contest.userContestStatus === 'ENDED' ? '#FF6B6B' : '#FFFFFF'
          }]}>
            Status: {contest.userContestStatus}
          </Text>
        </View>

        <View style={styles.rightSide}>
          {imageUri ? (
            <Image
              source={imageUri}
              style={styles.topicImage}
            />
          ) : (
            <Text style={[styles.loadingText, { color: 'white' }]}>
              Loading...
            </Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contestTouchable: {
    width: 320,
    marginRight: 15,
  },
  contestContainer: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 10,
    borderRadius: 35,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
    minHeight: 160,
  },
  leftSide: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  contestText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  topicImage: {
    width: 120,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 14,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default ContestCard;
