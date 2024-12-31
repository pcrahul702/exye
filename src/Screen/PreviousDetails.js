import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import backgroundImage from '../assets/Group.png';
import uppershaper from '../assets/uppershape.png';
import upperLog from '../assets/Upperlogo2.png';


const { width, height } = Dimensions.get('window');

const winners = [
    { id: '1', name: 'Ratan Tata', isHighlighted: true },
    { id: '2', name: 'Virat Kohli', isHighlighted: false },
    { id: '3', name: 'Virat Kohli', isHighlighted: false },
    { id: '4', name: 'Virat Kohli', isHighlighted: false },
    { id: '5', name: 'Virat Kohli', isHighlighted: false },
    { id: '6', name: 'Virat Kohli', isHighlighted: false },
    { id: '7', name: 'Virat Kohli', isHighlighted: false },
    { id: '8', name: 'Virat Kohli', isHighlighted: false },
    { id: '9', name: 'Virat Kohli', isHighlighted: false },
    // Add more items as needed
];



const PreviousDetails = () => {


    return (
        <SafeAreaView style={styles.container}>

            <Image source={backgroundImage} style={styles.backgroundImage} />
            <Image source={uppershaper} style={styles.uppershape} />
            <Image source={upperLog} style={[styles.upperLog,{height:width*0.5}]} />

            <View style={styles.headerContainer}>
                <Text style={[styles.headerText,{fontSize:width*0.05}]}>Total participants:</Text>
            </View>

            <View style={styles.headerContainer1}>
                <Text style={[styles.headerText,{fontSize:width*0.05}]}>Total contest value</Text>
            </View>

            <View style={styles.headerContainer2}>
                <Text style={[styles.headerText2,{fontSize:width*0.05}]}>₹1,52,100</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {winners.map((item, index) => {
                    const textColor = item.isHighlighted ? '#3DC467' : '#A92204'; // Green for highlighted, red for others

                    return (
                        <View key={item.id} style={styles.listItemContainer}>
                            {item.isHighlighted && (
                                <Image source={require('../assets/rank1.png')} style={styles.rankIcon} />
                            )}
                            <Text style={[styles.nameText, { color: textColor,fontSize:width*0.05  }]}>
                                {item.name}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>



            <Image
                source={require('../assets/BottomNav3.png')}
                style={styles.bottomNav} />

            <View style={styles.bottomContainer}>
                <Image
                    source={require('../assets/leftArrowWhite.png')} // Replace with your actual arrow image path
                    style={styles.arrowIcon}
                />
                <Text style={[styles.bottomText,{fontSize:width*0.07}]}>Swipe to go back</Text>
            </View>
        </SafeAreaView>
    )
}

export default PreviousDetails

const styles = StyleSheet.create({


    uppershape: {
        top: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    upperLog: {
        alignSelf: 'center',
        top: -100,
        width: '50%',
        resizeMode:'stretch'
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
        height:'12%',
        resizeMode:'stretch'
    },
    headerContainer: {
        width: '90%',
        height: 'auto',
        backgroundColor: '#FFA952',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop:-60,
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
        marginTop:10,
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
        padding:7

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
        fontSize: 30,
        fontWeight: '600',
        color: '#ffffff',
        fontFamily: 'Poppins-Regular',
        padding:7

    },
    scrollViewContainer: {
        width: '80%',
        marginTop: 20,
        padding:10,
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

})