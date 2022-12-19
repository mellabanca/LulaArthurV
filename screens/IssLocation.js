import React, {Component} from "react";
import {Text, View, ImageBackground, SafeAreaView,
        StyleSheet, StatusBar, Alert, Image, useWindowDimensions} from "react-native";
import MapView, {Marker} from "react-native-maps";
import axios from "axios";

export default class IssLocationScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            location: {}
        }
    }

    componentDidMount(){
        this.getIssLocation();
    }

    getIssLocation = () => {
        axios.get("https://api.wheretheiss.at/v1/satellites/25544")
             .then(response=>{
                this.setState({
                    location: response.data
                })
             })
             .catch(error=>{
                Alert.alert(error.message)
             })
    }
    
    render(){
        if(Object.keys(this.state.location).length === 0){
            return(
                <View style={styles.loadingLocation}>
                    <Text>Cargando...</Text>
                </View>
            )
        } else {
        return(
            <View style = {styles.container}>
             <SafeAreaView style={styles.safeArea}/>
              <ImageBackground style={styles.backgroundImage}
                               source={require("../assets/iss_bg.jpg")}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Ubicación de la nasa.</Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map}
                             region={{
                                latitude: this.state.location.latitude,
                                longitude: this.state.location.longitude,
                                latitudeDelta: 100,
                                longitudeDelta: 100
                             }}>
                       <Marker
                            coordinate={{
                                latitude: this.state.location.latitude,
                                longitude: this.state.location.longitude,
                            }}>
                             <Image style={styles.IssIcon}
                                    source={require("../assets/iss_icon.png")}/>
                       </Marker>
                    </MapView>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoT}>Latitude: {this.state.location.latitude}</Text>
                    <Text style={styles.infoT}>Longitude: {this.state.location.longitude}</Text>
                    <Text style={styles.infoT}>Altitude: {this.state.location.altitude}</Text>
                    <Text style={styles.infoT}>Velocidade: {this.state.location.velocity}</Text>
                </View>
              </ImageBackground>
            </View>
        )
    }
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover"
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.6
    },
    map: {
        width: "100%",
        height: "100%"
    },
    IssIcon: {
        height: 50,
        width: 50
    },
    loadingLocation: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    info:{
        flex: 0.2,
        backgroundColor: "white",
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoT: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    }
})