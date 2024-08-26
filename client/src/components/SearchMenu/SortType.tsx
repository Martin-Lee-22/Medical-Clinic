import './SearchInput.css'

type propsType = {
    setSort: React.Dispatch<React.SetStateAction<string>>
}

const SortType = (props: propsType) => {
    return(
        <div className="search_input_container">
            <span>Sort</span>
            <select onChange={e => props.setSort(e.target.value)} className='sort_type' name="sort_type">
                <option value="forward">A - Z</option>
                <option value="reverse">Z - A</option>
            </select>
        </div>
    )
}

export default SortType