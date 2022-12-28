import React, {Component} from "react";
import {Text, View} from "react-native";

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
        return(
            <View style = {{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text>Meteorito.</Text>
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
})