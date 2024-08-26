import './SearchInput.css'

type searchHeaders = {
    header: string,
    placeHolder: string
}

type propsTypes = {
    searchTypes: searchHeaders[],
    setSelectedSearchType: React.Dispatch<React.SetStateAction<string>>
}

const SearchType = (props: propsTypes) => {
    return(
        <div className="search_input_container">
            <span>Type</span>
            <select onChange={e => props.setSelectedSearchType(e.target.value)} name="searchType">
                {props.searchTypes.map((type: searchHeaders, index: number) => {
                    return <option key={index} value={type.header}>{type.header}</option>})}
            </select>
        </div>
    )
}

export default SearchType