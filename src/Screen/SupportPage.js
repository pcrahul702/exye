import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getData } from '../Utils/api';
import { getAccessToken } from '../Utils/getAccessToken';

const SupportPage = () => {

    const navigation = useNavigation();
    const [previousTickets, setPreviousTickets] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            getComplaintsData();
        }, [])
    );

    const getComplaintsData = async () => {

        const token = await getAccessToken();

        try {
            const res = await getData('/ticket/all');
            setPreviousTickets(res.data);
            // console.log("hellopt", previousTickets);
        }
        catch (error) {
            console.log('error', error);
            Alert.alert("Error in fetching previous complaints.");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Adds leading zero if day is less than 10
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed)
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleClickHere = () => {
        navigation.navigate('NewComplaint');
    };

    const handleBackPress = () => {
        navigation.goBack(); // This will take the user to the previous screen
    };

    const handleDetailsClick = (ticketId) => {
        navigation.navigate('TicketDetails', { ticketId });
    };

    return (
        <View style={styles.bg}>
            <Image
                source={require('../assets/Group.png')}
                style={styles.backgroundImage}
            />

            <StatusBar hidden={true} />

            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Image
                        source={require('../assets/leftArrow.png')} // Replace with your actual arrow image path
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>

                <Text style={styles.supportText}>Support</Text>
            </View>

            <ScrollView>
                <Text style={styles.dispText}>New Complaint</Text>

                <TouchableOpacity onPress={handleClickHere}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>Click here</Text>
                    </View>
                </TouchableOpacity>

                <Text style={[styles.dispText, { marginBottom: 18 }]}>Previous Complaints</Text>

                {previousTickets === null || previousTickets.length === 0 ? (
                    <Text style={styles.noComplaintsText}>No previous complaints</Text>
                ) : (

                    <View style={styles.previousComplaintsContainer}>

                        {previousTickets.map((ticket) => (
                            <View key={ticket.ticketId} style={styles.ticketCard}>
                                <Text style={styles.ticketTitle}>Title: {ticket.title}</Text>
                                <Text style={styles.ticketDate}>Created On: {formatDate(ticket.createdAt)}</Text>
                                <Text style={styles.ticketStatus}>Status: {ticket.status}</Text>

                                <TouchableOpacity
                                    style={styles.detailsButton}
                                    onPress={() => handleDetailsClick(ticket.ticketId)}
                                >
                                    <Text style={styles.detailsText}>Get Details</Text>
                                    <Image
                                        source={require('../assets/rightArrow.png')} // Replace with your actual arrow image path
                                        style={styles.arrowIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}

                    </View>
                )}

            </ScrollView>



        </View>

    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#e9e9e9',
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
    },
    header: {
        flexDirection: 'row',
        height: 68,
        backgroundColor: '#ffa952',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        paddingLeft: 14,  // Add padding to move the content to the right a bit
    },
    arrowIcon: {
        width: 24,
        height: 24,
    },
    supportText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        flex: 1,
        fontFamily: 'Poppins-Regular'
    },
    buttonView: {
        width: '90%',
        height: 50,
        backgroundColor: '#Ffffdf',
        alignSelf: 'center',
        marginTop: 14,
        borderRadius: 10,
        borderColor: '#F05A5B',
        borderWidth: 1,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    buttonText: {
        position: 'absolute',
        fontSize: 24,
        color: '#ffa952',
        fontWeight: '700',
        zIndex: 1,
        fontFamily: 'Poppins-Regular',
    },
    dispText: {
        fontSize: 20,
        color: '#F05A5B',
        fontWeight: '700',
        zIndex: 1,
        fontFamily: 'Poppins-Regular',
        marginLeft: 12,
        marginTop: 12,
    },
    noComplaintsText: {
        fontSize: 24,
        color: '#888',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 14,
        color: 'grey',
        fontFamily: 'Poppins-Regular',
    },
    ticketCard: {
        backgroundColor: '#fff',
        padding: 18,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginHorizontal: 12,
        borderLeftWidth: 5,
        borderLeftColor: '#ffa952',
    },
    ticketTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#ffa952',
        marginBottom: 5,
        fontFamily: 'Poppins-Regular',
    },
    ticketDate: {
        fontSize: 16,
        marginBottom: 5,
        color: 'grey',
        fontWeight: '700',
        fontFamily: 'Poppins-Regular',
    },
    ticketStatus: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Poppins-Regular',
        color: '#F05A5B',
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#ffa952',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    detailsText: {
        fontSize: 14,
        color: 'black',
        marginRight: 8,
        fontWeight: '700',
        fontFamily: 'Poppins-Regular',
    },
});

export default SupportPage;