import CharacterList from "./characterList.js";

// const getCharacter = async () => {
//   try {
//     const response = await fetch("https://rickandmortyapi.com/api/character");
//     if (!response.ok) {
//       console.log("error");
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

//getCharacter();

const list = new CharacterList("search-results");
