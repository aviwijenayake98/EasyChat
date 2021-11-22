import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Button, Input, Text , Image} from 'react-native-elements'
import { auth } from '../firebase'


const RegisterScreen = ({ navigation }) => {

    const [Usename, setUsename] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        })
    }, [navigation])

    const register = () => {

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl ||
                        "https://www.pinclipart.com/picdir/big/78-780477_about-us-avatar-icon-red-png-clipart.png",

                })
            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />

            <Text style={styles.LoginTitle}>Easy Chat</Text>

      
            <Image source={{
                uri: 'https://cdn5.f-cdn.com/contestentries/892698/21718995/5833c0af64c61_thumb900.jpg'
            }}
                style={{ width: 200, height: 200 }} />
            
            <View style={styles.inputContainer}>

                <Input
                    placeholder="UserName"
                    autoFocus
                    type='text'
                    value={Usename}
                    onChangeText={(text) => setUsename(text)}
                />

                <Input
                    placeholder="Email"
                    type='text'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    placeholder="Password"
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />


            </View>

            <Button
                containerStyle={styles.button}
                raised
                onPress={register}
                title='Register'
                type="clear"
                titleStyle={{ color: "#fff" }}
            />
            <TouchableOpacity  onPress={() => navigation.navigate("Login")}>
            <Text  style={styles.LoginLink}>Already have an account ? Sign In</Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} />

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
        height: 146,
        width: 308,
        fontSize:46,
        fontWeight:'400',
        left:55,
        color: '#227721',
        top:80
    },

    LoginLink:{
        fontSize:18,
        lineHeight:22,
        width:280,
        color:'#333FA7',
        left:10,
        top:20
    }

})
