import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [isLogin, setIsLogin] = useState(true);
  const [LoginState, setLoginState] = useState({
    username: '',
    password: '',
    showPassword: false,
    });

  const [RegisterState, setRegisterState] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    showPassword: false,
    });

    async function Submit() {
      try {
        // Remember to update with your actual IP until I figure out why localhost is refusing to work
        const url = isLogin ? "http://192.168.1.2:4123/api/user/login" : "http://192.168.1.2:4123/api/user/signup";
        const body = JSON.stringify({
          username: isLogin ? LoginState.username : RegisterState.username,
          password: isLogin ? LoginState.password : RegisterState.password,
        });

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer dummyToken123", // Dummy authorization header
          },
          body: body,
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alert(isLogin ? "Login successful" : "Signup successful");
            await AsyncStorage.setItem('sessionToken', data.token);
            navigation.navigate("MainPage", { user: data.user });
        } else {
          alert(data.error || "An error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log(error);
        alert("An error occurred. Please try again later.");
      }
    }

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('sessionToken');
                /*if (token) {
                    // Assuming you have an endpoint to verify the token
                    const response = await fetch('https://yourapi.com/verifyToken', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const result = await response.json();
                    if (result.valid) {
                        navigation.navigate('Profile', { user: result.user });
                    }
                }*/
            } catch (error) {
                //console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    },[]);


  const isDisabled = isLogin && (LoginState.username.length == 0 || LoginState.password.length == 0) || !isLogin && (RegisterState.username.length == 0 || RegisterState.password.length == 0 || RegisterState.passwordConfirm.length == 0 || RegisterState.password !== RegisterState.passwordConfirm);

  function LoginForm() {
    return (<>
        <TextInput value={LoginState.username} style={styles.textboxes} placeholder="Username" onChangeText={text => setLoginState({...LoginState, username: text})}/>
        <TextInput value={LoginState.password} style={styles.textboxes} secureTextEntry={!LoginState.showPassword} placeholder="Password" onChangeText={text => setLoginState({...LoginState, password: text})}/>

        <TouchableOpacity onPress={() => setLoginState({...LoginState, showPassword: !LoginState.showPassword})}>
            <Text style={{ fontWeight: '700'}}>
            {LoginState.showPassword ? 'Hide Password' : 'Show Password'}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, isDisabled && styles.buttonDisabled]} disabled={isDisabled} onPress={() => Submit()}>
            <Text style={{color: isDisabled ? "#aaaaaa" : "#eeeeee", fontWeight:"700"}}>Login</Text>
        </TouchableOpacity>
        </>
    )
  }
  
  function RegisterForm() {
    const mismatch = RegisterState.password !== RegisterState.passwordConfirm;
    return (<>
        <TextInput value={RegisterState.username} style={styles.textboxes} placeholder="Username" onChangeText={text => setRegisterState({...RegisterState, username: text})}/>
        <TextInput value={RegisterState.password} style={styles.textboxes} secureTextEntry={!RegisterState.showPassword} placeholder="Password" onChangeText={text => setRegisterState({...RegisterState, password: text})}/>
        <TextInput value={RegisterState.passwordConfirm} style={styles.textboxes} secureTextEntry={!RegisterState.showPassword} placeholder="Confirm Password" onChangeText={text => setRegisterState({...RegisterState, passwordConfirm: text})}/>
        <TouchableOpacity onPress={() => setRegisterState({...RegisterState, showPassword: !RegisterState.showPassword})}>
            <Text style={{ fontWeight: '700'}}>
            {RegisterState.showPassword ? 'Hide Password' : 'Show Password'}
            </Text>
        </TouchableOpacity>
        <View style={{minHeight: 20}}>
            <Text style={{color: mismatch ? 'red' : 'transparent', fontSize:16}}>Passwords do not match</Text>
        </View>
        <TouchableOpacity style={[styles.button, isDisabled && styles.buttonDisabled]} disabled={isDisabled} onPress={() => Submit()}>
            <Text style={{color: isDisabled ? "#aaaaaa" : "#eeeeee", fontWeight:"700"}}>Register</Text>
        </TouchableOpacity>
        </>
    )
  }

  function StateToggle() {
    return(
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={{color: '#1111cc', fontWeight: '600', fontSize:20 }}>Switch to {isLogin ? 'Register' : 'Login'}</Text>
        </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
            <Text style={styles.header}>Welcome</Text>
            {isLogin ? LoginForm() : RegisterForm()}
        </View>
        
        {StateToggle()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
},
formContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  textboxes: {
    marginBlock: 10,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#00000009',
    width: '70%',
  },
  button: {
    paddingInline: 12,
    paddingBlock: 6,
    borderRadius: 5,
    marginBlock: 20,
    
    backgroundColor: 'red',
  },
  buttonDisabled: {
    backgroundColor: '#990000',
  },
});
