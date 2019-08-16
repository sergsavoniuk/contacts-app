import React, { useState } from 'react';
import { func } from 'prop-types';

import { SearchInput } from './ContactsList.components';

function SearchContacts({ onSearch }) {
  const [contact, setContact] = useState('');

  function handleInputChange(event) {
    const searchableContact = event.target.value;
    setContact(searchableContact);
    onSearch(searchableContact);
  }

  return (
    <SearchInput
      value={contact}
      onChange={handleInputChange}
      placeholder='Enter a contact name'
    />
  );
}

SearchContacts.propTypes = {
  onSearch: func.isRequired
};

export default SearchContacts;
