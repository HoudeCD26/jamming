import { useState } from "react";

function SearchBar(props){
    const [term,setTerm]=useState('');

    function handleTermChange(e){
    setTerm(e.target.value);
    }
    return(
        <>
        <div>
          <h1>Jammming</h1>
        <input value={term} onChange={handleTermChange} placeholder='Enter Song to search for'/>
        </div>
        <button
          type="button"
          className="counter"
        onClick={()=>props.onSearch(term)}
        >
        SEARCH
        </button>
        </>
    )
}

export default SearchBar;