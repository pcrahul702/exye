import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getData } from '../Utils/api';
import { getAccessToken } from '../Utils/getAccessToken';

const TicketDetailsPage = () => {

    const navigation = useNavigation();

    const route = useRoute();  // Get the route object which contains params
    const { ticketId } = route.params; // Destructure ticketId from the params
    console.log("tickme: ", ticketId);
    const [ticketDetails, setTicketDetails] = useState(null);

    useEffect(() => {
        // You can now fetch the ticket details using the ticketId
        fetchTicketDetails(ticketId);
    }, [ticketId]);

    const fetchTicketDetails = async (id) => {

        const token = await getAccessToken();

        try {
            const response = await getData(`/ticket/${id}`);
            console.log('Response Object: ', response);

            
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

                <Text style={styles.supportText}>My Ticket</Text>
            </View>



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

});

export default TicketDetailsPage;