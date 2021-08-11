import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from "../components/PlacesItem";
import * as placesActions from '../store/places-action'

//PLACES= 
//PlacesList:state.places=> 
//APP:places:placesReducer=>
//PlacesReducer:initialState:places

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places)
  const dispatch = useDispatch()
  //RUNS ONCE ONLY WHEN APP STARTS
  useEffect(() => {
    dispatch(placesActions.loadPlaces())
  }, [dispatch])

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={
        itemData => <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            })
          }}
        />
      }
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places list here',
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add place'
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace')
          }}
        />
      </HeaderButtons>
  }
}

const styles = StyleSheet.create({});

export default PlacesListScreen;
