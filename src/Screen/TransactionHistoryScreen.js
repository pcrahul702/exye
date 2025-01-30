import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import failedIcon from '../assets/failedIcon.png';
import addSuccessIcon from '../assets/addSuccessIcon.png';
import withdrawSuccessIcon from '../assets/withdrawSuccessIcon.png';
import { getData } from '../Utils/api';
import Shimmer from '../components/Shimmer';

function TransactionHistoryScreen() {
    const navigation = useNavigation();
    const [transactionsData, setTransactionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    useFocusEffect(
        React.useCallback(() => {
            getWalletTransactionsData();
        }, [])
    );

    const getWalletTransactionsData = async () => {
        try {
            const res = await getData('/api/v1/profile/wallet/transactions');
            if (Array.isArray(res.data)) {
                setTransactionsData(res.data);
            } else {
                console.log('Invalid data format:', res.data);
            }
        } catch (error) {
            console.log('Error fetching transactions:', error);
            Alert.alert(error?.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const renderTransactionStatus = (status, type) => {
        if (status === 'SUCCESS' && type === 'DEPOSIT') {
            return { icon: addSuccessIcon, text: 'Transaction Successful', color: 'green' };
        } else if (status === 'SUCCESS' && type === 'WITHDRAWAL') {
            return { icon: withdrawSuccessIcon, text: 'Transaction Successful', color: 'green' };
        } else if (status === 'FAILURE') {
            return { icon: failedIcon, text: 'Transaction Failed', color: '#FF0000' };
        }
        return { icon: failedIcon, text: 'Transaction Pending', color: '#FF8800' }; // Default if status is null or unknown
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/uppershape2.png')} style={styles.uppershape} />
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <Image source={require('../assets/cardsLogo.png')} style={styles.upperLog} />

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {loading ? (

                    Array.from({ length: 10 }).map((_, index) => (


                        <View style={styles.listItemContainer}>

                            <Shimmer autoRun={true} style={styles.shimmerImage} >
                                <Image source={addSuccessIcon} style={styles.statusIcon} />
                            </Shimmer>

                            <View style={styles.transactionDetails}>
                                <Shimmer autoRun={true} style={styles.shimmerText}>
                                    <Text>rsgfvnjl</Text>
                                </Shimmer>
                                <Shimmer autoRun={true} style={styles.shimmerText}>
                                    <Text>rsgfvnjl555</Text>
                                </Shimmer>
                                <Shimmer autoRun={true} style={styles.shimmerText}>
                                    <Text>rsgfvnjl99889</Text>
                                </Shimmer>
                            </View>

                        </View>


                    ))
                ) : Array.isArray(transactionsData) && transactionsData.length > 0 ? (
                    transactionsData.map((item) => {
                        const { icon, text, color } = renderTransactionStatus(item.transactionStatus, item.transactionType);
                        return (
                            <View key={item.id} style={styles.listItemContainer}>
                                <Image source={icon} style={styles.statusIcon} />
                                <View style={styles.transactionDetails}>
                                    <Text style={[styles.statusText, { color }]}>{text}</Text>
                                    <Text style={styles.amountText}>
                                        {item.currency || 'INR'} {item.transactionAmount}
                                    </Text>
                                    <Text style={styles.dateText}>
                                        {new Date(item.transactionDate).toLocaleString()}
                                    </Text>
                                </View>
                            </View>
                        );
                    })
                ) : (
                    // Show message if no transactions found
                    <Text style={styles.noDataText}>No transactions found.</Text>
                )
                }
            </ScrollView >

            <Image source={require('../assets/BottomNav4.png')} resizeMode="contain" style={styles.bottomNav} />

            <View style={styles.bottomContainer}>
                <Image source={require('../assets/leftArrowWhite.png')} style={styles.arrowIcon} />
                <Text style={styles.bottomText}>Swipe to go back</Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
    },
    upperLog: {
        alignSelf: 'center',
        height: 120,
        width: 120,
        marginTop: 40,
    },
    uppershape: {
        position: 'absolute',
        top: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 10,
        alignSelf: 'center',
    },
    arrowIcon: {
        width: 36,
        height: 36,
        marginRight: 10,
    },
    bottomText: {
        fontSize: 31,
        fontWeight: '275',
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    scrollViewContainer: {
        marginTop: 20,
        width: '85%',
        borderRadius: 18,
        alignSelf: 'center',
        backgroundColor: '#D9D9D9',
        paddingVertical: 20,
        paddingHorizontal: 15,
        paddingBottom: 100,
    },
    listItemContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    statusIcon: {
        width: 40,
        height: 40,
        marginRight: 15,
        resizeMode: 'contain',
    },
    transactionDetails: {
        flex: 1,
    },
    statusText: {
        fontSize: 19,
        fontWeight: '275',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -0.5, height: 0.5 },
        textShadowRadius: 3,
        fontFamily: 'Poppins-Regular',
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Regular',
    },
    dateText: {
        fontSize: 19,
        fontWeight: '275',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -0.5, height: 0.5 },
        textShadowRadius: 3,
        fontFamily: 'Poppins-Regular',
    },
    noDataText: {
        fontSize: 18,
        color: '#FF0000',
        textAlign: 'center',
    },
    shimmerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    shimmerText: {
        width: '100%',
        marginVertical: 4,
        marginRight: 14,
    },
});

export default TransactionHistoryScreen;
