import React, { createContext, useState, useContext } from "react";

export const FavoritesContext = createContext();
FavoritesContext.displayName = "MyFavorites";

export default function FavoritesProvider({ children }) {
	const [ favorite, setFavorite ]	= useState([]);

	return (
		<FavoritesContext.Provider
			value={{favorite, setFavorite}} >
			{ children }
		</FavoritesContext.Provider>
	);
}

/* Hook personalizado */
export function useFavoriteContext() {
	const { favorite, setFavorite } = useContext(FavoritesContext);
  
	function addFavorite(newFavorite) {
	  setFavorite((prevFavorites) => {
		const repeatedFavorite = prevFavorites.some(
		  (item) => item.id === newFavorite.id
		);
  
		let newList = [...prevFavorites];
  
		if (!repeatedFavorite) {
		  newList.push(newFavorite);
		  console.log("Posto favorito adicionado:", newFavorite);
		} else {
		  newList = prevFavorites.filter((fav) => fav.id !== newFavorite.id);
		  console.log("Posto favorito removido:", newFavorite);
		}
  
		return newList;
	  });
	}
  
	return {
	  favorite,
	  addFavorite,
	};
  }