import { useEffect, useState } from 'react'
import './SearchInput.css'

type searchHeaders = {
    header: string,
    placeHolder: string
}
type propsTypes = {
    selectedSearchType: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    searchTypes: searchHeaders[],
}

const SearchInput = (props: propsTypes) => {
    const [placeHolder, setPlaceHolder] = useState<string>(props.searchTypes[0].placeHolder)

    useEffect(() => {
        for(let i = 0; i < props.searchTypes.length; i++) {
            if(props.searchTypes[i].header === props.selectedSearchType) {
                setPlaceHolder(props.searchTypes[i].placeHolder)
                break;
            }
        }

    }, [props.selectedSearchType])

    return(
        <div className="search_input_container">
            <span>{props.selectedSearchType}</span>
            <input type="search" placeholder={placeHolder} onChange={(e)=>{props.setSearch(e.target.value)}} autoFocus/>
        </div>
    )
}

export default SearchInput