import React, {Component} from "react";
import {Text, View, StyleSheet, SafeAreaView, StatusBar, Platform,
        TouchableOpacity, ImageBackground, Image} from "react-native";

export default class HomeScreen extends Component{
    render(){
        return(
            <View style = {styles.container}>
              <SafeAreaView style={styles.safeArea}/>
               <ImageBackground source={require("../assets/bg_image.png")}
                                style={styles.backgroundImage}>
               <View style={styles.titleBar}>
                  <Text style={styles.titleText}>Posso escolher depois?</Text>
               </View>
               <TouchableOpacity style={styles.routeCard}
                                 onPress={()=>this.props.navigation.navigate("UbicaciónDeLaNasa")}>
                <Text style={styles.routeText}>Ubicación de la nasa</Text>
                <Text style={styles.saibaMais}>{"Saiba Mais --->"}</Text>
                <Text style={styles.numero}>1</Text>
                <Image source={require("../assets/iss_icon.png")}
                       style={styles.iconImage}/>
               </TouchableOpacity>
               <TouchableOpacity style={styles.routeCard}
                                 onPress={()=>this.props.navigation.navigate("Meteorito")}>
                <Text style={styles.routeText}>Meteorito</Text>
                <Text style={styles.saibaMais}>{"Saiba Mais --->"}</Text>
                <Text style={styles.numero}>2</Text>
                <Image source={require("../assets/meteor_icon.png")}
                       style={styles.iconImage}/>
               </TouchableOpacity>
             </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    safeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    routeCard: {
        flex: 0.25,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        borderRadius: 30,
        backgroundColor: "white"
    },
    routeText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 75,
        paddingLeft: 25
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover"
    },
    saibaMais: {
        paddingLeft: 30,
        color: "red",
        fontSize: 15
    },
    numero: {
        position: "absolute",
        color: "rgba(183,183,183,0.5)",
        fontSize: 150,
        right: 20,
        bottom: -15,
        zIndex: -1
    },
    iconImage: {
        position: "absolute",
        height: 200,
        width: 200,
        resizeMode: "contain",
        right: 20,
        top: -80
    }
})