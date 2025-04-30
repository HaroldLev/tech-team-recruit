
import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router';
import { IOwner } from '../../types';
import { url } from '../../util';


const [deleting, setDeleting] = useState(false);


const removeOwner = (ownerId: number) => {
  setDeleting(true);
  const confirmDelete = window.confirm('Are you sure you want to delete this owner?');
  if (!confirmDelete) {
    setDeleting(false);
    return;
  }
  const fetchUrl = url(`api/owners/${ownerId}`);
  fetch(fetchUrl, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        setDeleting(false);
        window.location.href = '/owners/list';
      } else {
        alert('Failed to remove owner');
      }
    });
}

export default ({owner}: { owner: IOwner }) => (
  <section>
    <h2>Owner Information</h2>

    <table className='table table-striped'>
      <tbody>
        <tr>
          <th>Name</th>
          <td><b>{owner.firstName} {owner.lastName}</b></td>
        </tr>
        <tr>
          <th>Address</th>
          <td>{owner.address}</td>
        </tr>
        <tr>
          <th>City</th>
          <td>{owner.city}</td>
        </tr>
        <tr>
          <th>Telephone</th>
          <td>{owner.telephone}</td>
        </tr>
      </tbody>
    </table>

    <button enabled={!deleting} onClick={() => removeOwner(owner.id)} className='btn btn-default'>Remove Owner</button>
    &nbsp;
    <Link to={`/owners/${owner.id}/edit`} className='btn btn-default'>Edit Owner</Link>
    &nbsp;
    <Link to={`/owners/${owner.id}/pets/new`} className='btn btn-default'>Add New Pet</Link>
  </section>
);
