//import React, { useState, useEffect } from "react";
//import { useDispatch } from "react-redux";
//import { getDogByName } from "../../../redux/actions";
//
//const SearchName = () => {
//  const [searchTerm, setSearchQuery] = useState("");
//  const dispatch = useDispatch();
//
// useEffect(() => {
//    const delayDebounceFn = setTimeout(() => {
//        dispatch(getDogByName(searchTerm));
//    }, 500);
//
//    return () => clearTimeout(delayDebounceFn);
// }, [searchTerm, dispatch])
//
//  return (
//    <div>
//      <input
//        type="text"
//        placeholder="Buscar por nombre..."
//        value={searchTerm}
//        onChange={(e) => setSearchQuery(e.target.value)}
//      />
//      
//    </div>
//  );
//};
//
//export default SearchName;