
import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../Utils/getAccessToken';
import { postData } from '../Utils/api';

const PANDetailsScreen = () => {

    const navigation = useNavigation();


    const [panName, setPanName] = useState('');
    const [panNumber, setPanNumber] = useState('');

    const handleSubmit = async () => {

        const token = await getAccessToken();
        console.log(token);


        if (!panName || !panNumber) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }
        else {
            const payload = {
                panNumber: panNumber,
                accountHolder: panName,
                dob: "dd-mm-yyyy"
            };
            console.log("payload data".payload);
            try {
                const data = await postData('api/v1/profile/pan-details', payload, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                console.log(data);
                navigation.navigate('UploadPan');
            } catch (error) {
                console.error('Error during PAN details upload:', error);
            }
        }

    };


    return (
        <View style={styles.bg}>
            <Image
                source={require('../assets/Group.png')}
                style={styles.backgroundImage}
            />

            <View style={styles.formContainer}>
                {/* Heading */}
                <Text style={styles.heading}>PAN Card Details</Text>


                <Text style={styles.label}>Name (Same as on PAN Card)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    value={panName}
                    onChangeText={setPanName}
                />


                <Text style={styles.label}>PAN Card Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter PAN"
                    value={panNumber}
                    onChangeText={setPanNumber}
                />



                <TouchableOpacity style={styles.submitButton}
                    onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
    },
    formContainer: {
        flex: 1,
        padding: 20,
        marginTop: 28,
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        color: '#F05A5B',
        textDecorationLine: 'underline',
    },
    label: {
        fontSize: 16,
        color: '#F05A5B',
        fontWeight: '275',
        zIndex: 1,
        fontFamily: 'Poppins-Regular',
        marginLeft: '5%',
        marginTop: 12,
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        marginTop: 8,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'gray',
        color: 'black',
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'Poppins-Regular',
    },
    submitButton: {
        width: '60%',
        height: 'auto',
        alignSelf: 'center',
        borderRadius: 40,
        margin: 20,
        borderColor: 'white',
        borderWidth: 3,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'green',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular'
    },
}
)



export default PANDetailsScreen;