import { useCallback } from 'react';
import debounce from 'lodash.debounce';



function SearchBar(props){
    const changeHandler = event => {
        props.setPage(0)
        props.setFilter(event.target.value);
      };
      const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 300)
      , []);

    return (
        <div className="search-box">
            <input type="text" placeholder="Search by name,email or role" onChange={debouncedChangeHandler}  />
        </div>
    )
}

export default SearchBar