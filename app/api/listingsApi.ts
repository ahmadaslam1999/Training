import listingInterface from '../utils/listingInterface';
import {instance} from './client';

//Fetch all the Lisitings.
export const getListings = () => instance.get('/listings');

//Posting new Listing.
export const addListing = (listing: listingInterface) => {
  const data = new FormData();

  data.append('title', listing.title);
  data.append('price', listing.price);
  data.append('categoryId', listing.categoryId);
  data.append('description', listing.description);

  listing?.images?.forEach((image, index) => {
    data.append('images', {
      name: 'image' + index,
      type: 'image/jpg',
      uri: image,
    });
  });

  if (listing.location) {
    data.append('location', JSON.stringify(listing.location));
  }

  return instance.post('/listings', data, {
    onUploadProgress: progress => console.log(progress.loaded / progress.total),
  });
};
