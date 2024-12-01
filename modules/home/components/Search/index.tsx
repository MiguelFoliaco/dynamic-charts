import { useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    return (
        <div className="w-full mx-auto mt-10 p-4">
            <input
                style={{ width: '300px' }}
                type="text"
                placeholder="Search..."
                className="block p-1 border border-gray-300 rounded-md focus:outline-none focus:border-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
