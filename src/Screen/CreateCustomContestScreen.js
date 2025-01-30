import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const CreateCustomContestScreen = () => {
    const [contestName, setContestName] = useState('');
    const [prizeAmount, setPrizeAmount] = useState('');
    const [date, setDate] = useState(null); // No default date
    const [time, setTime] = useState(null); // No default time
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const navigation = useNavigation();

    const route = useRoute();
    const { topicId } = route.params;

    // Handle date change
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShowDatePicker(false);
    };

    // Handle time change
    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);
        setShowTimePicker(false);
    };

    const handleNext = () => {
        if (contestName && prizeAmount && date && time)
            navigation.navigate('CustomContest', { topicId, contestName, prizeAmount, date, time });
        else
            showToast('Enter all the fields.');
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const showToast = (message1, message2 = '') => {
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: message1,
            text2: message2,
            visibilityTime: 3000,
            autoHide: true,
        });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <StatusBar hidden={true} />

            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Image
                        source={require('../assets/leftArrow.png')}
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>

                <Text style={styles.headerText}>Custom Contest</Text>
            </View>

            <Text style={styles.text1}>Enter details of contest</Text>

            {/* Contest Name Field */}
            <TextInput
                style={styles.inputField}
                placeholder="Enter Contest Name"
                value={contestName}
                onChangeText={setContestName}
            />

            {/* Prize Amount Field */}
            <TextInput
                style={styles.inputField}
                placeholder="Enter Prize Amount"
                keyboardType="numeric"
                value={prizeAmount}
                onChangeText={setPrizeAmount}
            />

            {/* Date Picker Button */}
            <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.pickerButtonText}>
                    {date ? `Contest Start Date: ${date.toLocaleDateString()}` : "Choose Contest Start Date"}
                </Text>
            </TouchableOpacity>

            {/* Time Picker Button */}
            <TouchableOpacity style={styles.pickerButton} onPress={() => setShowTimePicker(true)}>
                <Text style={styles.pickerButtonText}>
                    {time ? `Contest Start Time: ${time.toLocaleTimeString()}` : "Choose Contest Start Time"}
                </Text>
            </TouchableOpacity>

            {/* DateTimePicker for Date */}
            {showDatePicker && (
                <DateTimePicker
                    value={date || new Date()} // Default to current date if no date selected
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={new Date()} // Prevent past dates
                />
            )}

            {/* DateTimePicker for Time */}
            {showTimePicker && (
                <DateTimePicker
                    value={time || new Date()} // Default to current time if no time selected
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={handleTimeChange}
                />
            )}

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>

            <Image source={require('../assets/k.png')} style={styles.bottomImage} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e9e9e9',
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
        opacity: 0.8,
    },
    header: {
        flexDirection: 'row',
        height: 68,
        backgroundColor: '#ffa952',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        paddingLeft: 14,
        marginBottom: 20,
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
    text1: {
        fontSize: 24,
        fontWeight: '600',
        color: '#F05A5B',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputField: {
        width: '80%',
        height: 50,
        borderColor: '#F05A5B',
        borderWidth: 1,
        borderRadius: 25,
        paddingLeft: 15,
        marginVertical: 10,
        fontSize: 18,
        fontWeight: '600',
        backgroundColor: 'white',
    },
    pickerButton: {
        width: '80%',
        height: 50,
        borderColor: '#F05A5B',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: 'white',
    },
    pickerButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F05A5B',
        textAlign: 'center',
    },
    nextButton: {
        width: '50%',
        height: 'auto',
        alignSelf: 'center',
        borderRadius: 40,
        margin: 20,
        borderColor: 'white',
        borderWidth: 5,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'green',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    nextText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular'
    },
    bottomImage: {
        width: '80%',
        position: 'absolute',
        bottom: 0,
        resizeMode: 'contain',
        alignSelf: 'center',
        opacity: 0.8,
    },
});

export default CreateCustomContestScreen;
