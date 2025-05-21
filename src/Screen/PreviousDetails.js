import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Dimensions, Alert,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/Group.png';
import uppershaper from '../assets/uppershape.png';
import upperLog from '../assets/Upperlogo2.png';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { getData } from '../Utils/api';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PreviousDetails = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [APIData, setAPIData] = useState(null);
    const [loading, setLoading] = useState(true);  // Loading state
    const [winner, setWinner] = useState(null);  // State to store the winner

    const route = useRoute();
    const navigation = useNavigation();

    const { contestId } = route.params;

    useFocusEffect(
        React.useCallback(() => {
            getLeaderboardData();
        }, [])
    );

    const getLeaderboardData = async () => {
        try {
            const res = await getData(`/api/v1/quiz/players/contest/${contestId}`);
            if (Array.isArray(res.data)) {
                setLeaderboardData(res.data);
                setAPIData(res);  // Set the API response data

                // Find the winner (player with rank 1)
                const winnerPlayer = res.data.find(player => player.rank === 1);
                setWinner(winnerPlayer);

                setLoading(false); // Data is loaded, set loading to false
                console.log('API Data Loaded', res);
            } else {
                console.log('Invalid data format:', res.data);
                setLoading(false);  // Handle loading state even on error
            }
        } catch (error) {
            console.log('Error fetching data:', error);
            Alert.alert(error?.response?.data?.message || 'An error occurred');
            setLoading(false);  // Handle loading state even on error
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={backgroundImage} style={styles.backgroundImage} />
            <Image source={uppershaper} style={styles.uppershape} />
            <Image source={upperLog} style={[styles.upperLog, { height: width * 0.5 }]} />

            <View style={styles.headerContainer}>
                {/* Conditionally render based on loading state */}
                <Text style={[styles.headerText, { fontSize: width * 0.05 }]}>
                    {loading ? 'Loading...' : `Total participants: ${APIData.totalParticipants}`}
                </Text>
            </View>

            <View style={styles.headerContainer1}>
                <Text style={[styles.headerText, { fontSize: width * 0.05 }]}>Total contest value</Text>
            </View>

            <View style={styles.headerContainer2}>
                {/* Conditionally render based on loading state */}
                <Text style={[styles.headerText2, { fontSize: width * 0.05 }]}>
                    {loading ? 'Loading...' : `₹ ${APIData.rewardAmount}`}
                </Text>
            </View>

            {/* Winner Section */}
            {!loading && winner && (
                <View style={styles.winnerContainer}>
                    <Text style={styles.winnerLabel}>🏆 WINNER 🏆</Text>
                    <View style={styles.winnerInfoContainer}>
                        <Image
                            source={require('../assets/rank1.png')}
                            style={styles.winnerIcon}
                        />
                        <Text style={styles.winnerName}>{winner.username}</Text>
                    </View>
                    <Text style={styles.winnerScore}>Score: {winner.score}</Text>
                </View>
            )}

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.leaderboardTitle}>Leaderboard</Text>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>  // Add a loading text
                ) : (
                    leaderboardData.map((item) => {
                        // Apply green color and rank icon to the first rank
                        const isFirstPlace = item.rank === 1;
                        const textColor = isFirstPlace ? '#3DC467' : '#F05A5B'; // Green for first place
                        return (
                            <View key={item.id} style={styles.listItemContainer}>
                                {isFirstPlace && (
                                    <Image
                                        source={require('../assets/rank1.png')} // Image for the first place
                                        style={styles.rankIcon}
                                    />
                                )}
                                <Text
                                    style={[styles.nameText, { color: textColor, fontSize: width * 0.05 }]}
                                >
                                    {item.username}
                                </Text>
                            </View>
                        );
                    })
                )}
            </ScrollView>

            <Image source={require('../assets/BottomNav3.png')} style={styles.bottomNav} />

        <TouchableOpacity
  style={styles.bottomContainer}
  onPress={() => navigation.goBack()}
>
  <Image
    source={require('../assets/leftArrowWhite.png')}
    style={styles.arrowIcon}
  />
  <Text style={[styles.bottomText, { fontSize: width * 0.07 }]}>
    Swipe to go back
  </Text>
</TouchableOpacity>
        </SafeAreaView>
    );
};

export default PreviousDetails;

const styles = StyleSheet.create({
    // styles go here
    loadingText: {
        fontSize: 20,
        color: '#F05A5B',  // Loading text color
        textAlign: 'center',
        marginTop: 20,
    },
    winnerContainer: {
        width: '90%',
        backgroundColor: '#3DC467',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 15,
        marginTop: 15,
        alignItems: 'center',
        // Shadow properties
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    winnerLabel: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
        fontFamily: 'Poppins-Regular',
    },
    winnerInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    winnerIcon: {
        width: 40,
        height: 44,
        marginRight: 10,
    },
    winnerName: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Poppins-Regular',
    },
    winnerScore: {
        fontSize: width * 0.05,
        color: '#FFF',
        marginTop: 5,
        fontFamily: 'Poppins-Regular',
    },
    leaderboardTitle: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: '#F05A5B',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
    },
    uppershape: {
        top: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    upperLog: {
        alignSelf: 'center',
        top: -100,
        width: '50%',
        resizeMode: 'stretch'
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        top: 139,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
    },

    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '12%',
        resizeMode: 'stretch'
    },
    headerContainer: {
        width: '90%',
        height: 'auto',
        backgroundColor: '#FFA952',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: -60,
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        // Shadow properties for Android
        elevation: 10,
    },
    headerContainer1: {
        width: '90%',
        height: 'auto',
        backgroundColor: '#FFA952',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: 10,
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        // Shadow properties for Android
        elevation: 10,
    },
    headerText: {
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: '500',
        color: '#ffffff',
        fontFamily: 'Poppins-Regular',
        padding: 7
    },
    headerContainer2: {
        width: '80%',
        height: 'auto',
        backgroundColor: '#F05A5B',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: 10,
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        // Shadow properties for Android
        elevation: 10,
    },
    headerText2: {
        alignSelf: 'center',
        fontSize: 32,
        fontWeight: '800',
        color: '#ffffff',
        fontFamily: 'Poppins-Regular',
        padding: 7
    },
    scrollViewContainer: {
        width: '80%',
        marginTop: 20,
        padding: 10,
        paddingBottom: 80,
        alignSelf: 'center',
        backgroundColor: '#FEE799',
        borderRadius: 20
    },
    listItemContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 5,
        justifyContent: 'flex-start', // Align items to the start
        paddingHorizontal: 10, // Optional: Add some horizontal padding
    },
    nameText: {
        fontWeight: '600',
        fontSize: 25,
        marginVertical: 5,
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'Poppins-Regular'
    },
    rankIcon: {
        width: 36,
        height: 40,
        marginRight: 10,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        bottom: 5,
        alignSelf: 'center'
    },
    arrowIcon: {
        width: 36,
        height: 36,
        marginRight: 10
    },
    bottomText: {
        fontSize: 31,
        fontWeight: '275',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    }
});
