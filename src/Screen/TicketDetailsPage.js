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
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getData, putData } from '../Utils/api';
import { getAccessToken } from '../Utils/getAccessToken';

const TicketDetailsPage = () => {

    const navigation = useNavigation();

    const route = useRoute(); 
    const { ticketId } = route.params;
    const [ticketDetails, setTicketDetails] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            fetchTicketDetails(ticketId);
        }, [ticketId])  
    );

    const fetchTicketDetails = async (id) => {

        const token = await getAccessToken();

        try {
            const response = await getData(`/ticket/${id}`);

            if (response && response.data) {
                setTicketDetails(response.data);
            } else {
                console.log('No data found in the response');
            }

        } catch (error) {
            console.log('Error fetching ticket details:', error);
        }
    };

    const handleBackPress = () => {
        navigation.goBack(); // This will take the user to the previous screen
    };

    const handleWithdrawComplaint = async () => {
        console.log("tickmeup", ticketId);

        try {
            
            const response = await putData(`/ticket/${ticketId}`, {});  // Send PUT request to withdraw the complaint

            console.log("API Response:", response);  // Log the complete response object for better debugging

            alert('Complaint withdrawn successfully.');
        } catch (error) {
            console.error('Error withdrawing complaint:', error);
            // Handle any unexpected errors (e.g., network issues)
        }
    };    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Adds leading zero if day is less than 10
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed)
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    return (
        <View style={styles.bg}>
            

            <StatusBar hidden={true} />

            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Image
                        source={require('../assets/leftArrow.png')} // Replace with your actual arrow image path
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>

                <Text style={styles.headerText}>My Ticket</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {ticketDetails ? (
                    <>
                        <View style={styles.ticketDetailContainer}>
                            <Text style={styles.label}>Title:</Text>
                            <Text style={styles.detailText}>{ticketDetails.title}</Text>

                            <Text style={styles.label}>Message:</Text>
                            <Text style={styles.detailText}>{ticketDetails.message}</Text>

                            <Text style={styles.label}>Status:</Text>
                            <Text style={styles.detailText}>{ticketDetails.status}</Text>

                            <Text style={styles.label}>Phone:</Text>
                            <Text style={styles.detailText}>{ticketDetails.phoneNo}</Text>

                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.detailText}>{ticketDetails.userEmail}</Text>

                            <Text style={styles.label}>Created On:</Text>
                            <Text style={styles.detailText}>{formatDate(ticketDetails.createdAt)}</Text>
                        </View>
                    </>
                ) : (
                    <Text style={styles.noDataText}>Loading ticket details...</Text>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdrawComplaint}>
                <Text style={styles.withdrawButtonText}>Withdraw Complaint</Text>
            </TouchableOpacity>



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
    headerText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        flex: 1,
        fontFamily: 'Poppins-Regular'
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 80, // Space for the withdraw button
    },
    ticketDetailContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 6,
        fontFamily: 'Poppins-Regular',
    },
    detailText: {
        fontSize: 20,
        color: 'grey',
        marginBottom: 12,
        fontWeight: '700',
        fontFamily: 'Poppins-Regular',
    },
    noDataText: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    withdrawButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#Ffffdf',
        alignSelf: 'center',
        marginTop: 14,
        bottom: 20,
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
    withdrawButtonText: {
        position: 'absolute',
        fontSize: 28,
        color: '#ffa952',
        fontWeight: '700',
        zIndex: 1,
        fontFamily: 'Poppins-Regular',
    },

});

export default TicketDetailsPage;