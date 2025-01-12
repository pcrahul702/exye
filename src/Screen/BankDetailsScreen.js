
import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../Utils/getAccessToken';
import { postData } from '../Utils/api';

const BankDetailsScreen = () => {

    const navigation = useNavigation();

    // State to manage the inputs
    const [accountHolderName, setAccountHolderName] = useState('');
    const [bankName, setBankName] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [branchName, setBranchName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountType, setAccountType] = useState('SAVING');
    const [isPrimaryAccount, setIsPrimaryAccount] = useState(true);

    const handleSubmit = async () => {

        const token = await getAccessToken();
        console.log(token);

        // Validate inputs and handle form submission logic here
        if (!accountHolderName || !bankName || !ifscCode || !branchName || !accountNumber) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }
        else {
            const payload = {
                accountHolderName: accountHolderName,
                ifscCode: ifscCode,
                accountNumber: accountNumber,
                branchName: branchName,
                bankName: bankName,
                accountType: accountType,
                isPrimaryAccount: isPrimaryAccount
            };
            console.log("payload data".payload);
            try {
                const data = await postData('api/v1/profile/bank-details', payload, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                console.log(data);
                navigation.navigate('UploadBank');
            } catch (error) {
                console.error('Error during bank details upload:', error.response.data.message);
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
                <Text style={styles.heading}>Bank Account Details</Text>

                {/* Name of Account Holder */}
                <Text style={styles.label}>Name of Account Holder</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    value={accountHolderName}
                    onChangeText={setAccountHolderName}
                />

                {/* Bank Name */}
                <Text style={styles.label}>Bank Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Bank Name"
                    value={bankName}
                    onChangeText={setBankName}
                />

                {/* IFSC Code */}
                <Text style={styles.label}>IFSC Code</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter IFSC Code"
                    value={ifscCode}
                    onChangeText={setIfscCode}
                />

                <Text style={styles.label}>Branch Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Branch Name"
                    value={branchName}
                    onChangeText={setBranchName}
                />

                {/* Bank Account Number */}
                <Text style={styles.label}>Bank Account Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Account Number"
                    keyboardType="numeric"
                    value={accountNumber}
                    onChangeText={setAccountNumber}
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
        color:'black',
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



export default BankDetailsScreen;