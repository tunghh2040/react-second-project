export default function SearchBox({ searchField, onSearchBoxChange}) {
    return (
        <>
            <label htmlFor={searchField}><b>{searchField}:</b></label>
            <span> </span>
            <input
                id={searchField}
                type="text"
                onChange={(event) => onSearchBoxChange(event.target.value)}
                placeholder={`Search by ${searchField.toLowerCase()}`}
            />
        </>
    );
}
