import axios from "axios";
import React, {Component} from "react";
import {Text, View, Alert, SafeAreaView, FlatList,
        StyleSheet, Image, ImageBackground, Dimensions, StatusBar} from "react-native";

export default class MeteorScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            meteoritos: {}
        }
    }

    componentDidMount(){
        this.getMeteorito();
    }

    getMeteorito = () => {
        axios.get("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=BohhdOzumYH9K75Y31iNdUUBvHjvwuDhAui2R5wQ")
             .then(response=>{
                this.setState({
                    meteoritos: response.data.near_earth_objects
                })
             })
             .catch(error=>{
                Alert.alert(error.message)
             })
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => {
        let meteorito = item;
        let antecedentes, velocidad, talla;
        if(meteorito.amenazaF <= 30){
            antecedentes = require("../assets/meteor_bg1.png");
            velocidad =  require("../assets/meteor_speed1.gif");
            talla = 100;
        } else if(meteorito.amenazaF <= 75){
            antecedentes = require("../assets/meteor_bg2.png");
            velocidad =  require("../assets/meteor_speed2.gif");
            talla = 150;
        } else {
            antecedentes = require("../assets/meteor_bg3.png");
            velocidad =  require("../assets/meteor_speed3.gif");
            talla = 200;
        }
        return(
            <View>
                <ImageBackground source={antecedentes} style = {styles.backgroundImage}>
                    <View style = {styles.gifContainer}>
                       <Image source={velocidad} style = {{width: talla, height: talla, alignSelf: "center"}}></Image>
                    </View>
                    <View>
                        <Text style = {styles.cardTitle}>{item.name}</Text>
                        <Text style = {[styles.cardText,{marginTop: 20}]}>Más cercano a la Tierra - {item.close_approach_data[0].close_approach_date_full}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Diámetro Mínimo (km) - {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Diámetro Máximo (km) - {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Velocidad (km/h) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Distancia de la Tierra (km) - {item.close_approach_data[0].miss_distance.kilometers}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    render(){
        if(Object.keys(this.state.meteoritos).length === 0){
            return(
                <View style={styles.loadingLocation}>
                    <Text>Cargando...</Text>
                </View>
            )
        } else {
            let meteoritoArr = Object.keys(this.state.meteoritos).map(dadosMeteoritos => {
                return this.state.meteoritos[dadosMeteoritos]
            })
            let meteoritos = [].concat.apply([], meteoritoArr);
            meteoritos.forEach(function(elemento){
                let diametro = (elemento.estimated_diameter.kilometers.estimated_diameter_min +
                                elemento.estimated_diameter.kilometers.estimated_diameter_max)/2;
                let amenaza = (diametro/elemento.close_approach_data[0].miss_distance.kilometers)
                              *1000000000;
                elemento.amenazaF = amenaza;
            })
            meteoritos.sort(function(a,b){
                return b.amenazaF - a.amenazaF
            })
            meteoritos = meteoritos.slice(0,5);
        return(
          <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}/>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={meteoritos}
                renderItem={this.renderItem}
                horizontal={true}
            />
          </View> 
        )
    }}
}

const styles = StyleSheet.create({
    loadingLocation: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1
    },
    safeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    meteorContainer: {
        flex: 0.85
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10
    },
   cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white",
        marginLeft: 15
    },
    cardText: {
        color: "white",
        marginLeft: 15,
        marginBottom: 10,
    },
    threatDetector: {
        height: 10,
        marginBottom: 10
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    meteorDataContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
})