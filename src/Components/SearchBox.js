export default function SearchBox({ searchLabel, searchField, onSearchBoxChange}) {
    return (
        <>
            <label htmlFor={searchField}><b>{searchLabel}:</b></label>
            <span> </span>
            <input
                id={searchField}
                type="text"
                onChange={(event) => onSearchBoxChange(searchField, event.target.value)}
                placeholder={`Search Users by ${searchLabel}`}
            />
        </>
    );
}
