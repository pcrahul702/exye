import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../Utils/api';
import { getAccessToken } from '../Utils/getAccessToken';
import { getEmail } from '../Utils/getEmail';
import { getPhoneNo } from '../Utils/getPhoneNo';



const NewComplaintPage = () => {

    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [issue, setIssue] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const validateTitle = title => {
        if (title.trim().length > 0) {
            return true;
        } else {
            alert('Title cannot be empty!');
            return false;
        }
    };

    const validateIssue = issue => {
        if (issue.trim().length > 0) {
            return true;
        } else {
            alert('Issue cannot be empty!');
            return false;
        }
    };

    const handleBackPress = () => {
        navigation.goBack(); // This will take the user to the previous screen
    };

    const handleRaiseComplaint = async () => {

        const token = await getAccessToken();
        const email = await getEmail();
        const phone = await getPhoneNo();

        if (validateTitle(title) && validateIssue(issue)) {
            const payload = {
                title: title,
                message: issue,
                userEmail: email,
                phoneNo: phone
            };
            console.log("payload data".payload);
            try {
                const data = await postData('/ticket', payload, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                alert(data.message);
                console.log(data);
            } catch (error) {
                console.error('Error during ticket creation:', error);

                // Check if the error has a response with code 400 and display a specific message
                if (error?.response?.status === 400) {
                    const errorMessage = error?.response?.data?.message || "An error occurred";
                    alert(errorMessage);
                    console.log(errorMessage); // Print the error message in the console
                } else {
                    alert('An error occurred while raising ticket');
                }
            }
        }
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
                <Text style={styles.headerText}>New Complaint</Text>
            </View>

            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />

            {/* Issue Input */}
            <Text style={styles.label}>Issue</Text>
            <TextInput
                style={[styles.input, styles.issueInput]}  // Extra style for multi-line issue input
                value={issue}
                onChangeText={setIssue}
                placeholder="Describe the issue"
                multiline
                numberOfLines={5}
            />


            {/* Raise Complaint Button */}
            <TouchableOpacity onPress={handleRaiseComplaint}>
                <View style={styles.buttonView}>
                    <Text style={styles.buttonText}>Raise Complaint</Text>
                </View>
            </TouchableOpacity>



        </View>

    );
};

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
    buttonView: {
        width: '90%',
        height: 50,
        backgroundColor: '#Ffffdf',
        alignSelf: 'center',
        marginTop: 28,
        borderRadius: 10,
        borderColor: '#F05A5B',
        borderWidth: 1,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    buttonText: {
        position: 'absolute',
        fontSize: 28,
        color: '#ffa952',
        fontWeight: '700',
        zIndex: 1,
        fontFamily: 'Poppins-Regular',
    },
    label: {
        fontSize: 20,
        color: 'gray',
        fontWeight: '700',
        zIndex: 1,
        fontFamily: 'Poppins-Regular',
        marginLeft: '5%',
        marginTop: 12,
    },
    input: {
        width: '90%',
        height: 40,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        marginTop: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    issueInput: {
        height: 120, // Making the issue input larger
        textAlignVertical: 'top', // Ensure text aligns at the top of the TextInput
    },

});

export default NewComplaintPage;
