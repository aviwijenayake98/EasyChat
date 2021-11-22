


import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                navigation.replace('Home');
            }
        })

        return unsubscribe;
    }, [])

    const signIn = () => {

        auth.signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));
     };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style='light' />

            <Text style={styles.LoginTitle}>Easy Chat</Text>

            <Image source={{
                uri: 'https://cdn5.f-cdn.com/contestentries/892698/21718995/5833c0af64c61_thumb900.jpg'
            }}
                style={{ width: 200, height: 200 }} />
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    autoFocus
                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)} />
                <Input
                    placeholder='Password'
                    autoFocus
                    type='password'
                    value={password}
                    onChangeText={(text) => setPassword(text)} 
                    onSubmitEditing={signIn}/>
            </View>

            <Button
                containerStyle={styles.button}
                type="clear"
                onPress={signIn}
                title="Login"
                titleStyle={{ color: "#fff" }}
            />

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text  style={styles.signUpLink}>Need a Account ? Sign Up</Text>
            </TouchableOpacity>
      

            <View style={{ height: 50 }} />

        </KeyboardAvoidingView>)
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 300,
        marginTop: 10,
        backgroundColor: "#E76565",
        borderRadius: 5,

    },
    LoginTitle:{
        height: 66,
        width: 308,
        fontSize:46,
        fontWeight:'400',
        left:55,
        color: '#227721',
        bottom:10,

    },
    signUpLink:{
        fontSize:18,
        lineHeight:22,
        width:250,
        color:'#333FA7',
        left:20,
        top:30
    }


})
