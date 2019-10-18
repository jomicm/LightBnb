$(() => {
  window.propertyListing = {};
  const createListing = (property, isReservation) => {
    return `
    <article class="property-listing">
        <section class="property-listing__preview-image">
          <img src="${property.thumbnail_photo_url}" alt="house">
        </section>
        <section class="property-listing__details">
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
            <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
            <li>parking_spaces: ${property.parking_spaces}</li>
          </ul>
          ${isReservation ? `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>` : ``}
          <footer class="property-listing__footer">
            <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
            ${showMakeReservationButton ? `<button class="btn btn-primary" data-toggle="modal" data-target="#modalLoginForm" onclick='startReservation(${property.id})'>Make Reservation!</button>` : '' }
          </footer>
        </section>
      </article>
    `;
  };
  window.propertyListing.createListing = createListing;
 
});

let $selectedId;

const startReservation = id => {
  $selectedId = id;
  console.log('Start for >', $selectedId);
};

const makeReservation = async () => {
  const startDate = $('#start-date-input').val();
  const endDate = $('#end-date-input').val();
  let dataObj = { propertyId:$selectedId, startDate, endDate, userId: currentUser.id };
  console.log('dataObj', dataObj);
  const data = $(dataObj).serialize();
  console.log('data', data);

  try {
    const result = await book(dataObj);
    console.log('FROM API result', result);
  } catch (err) {
    console.log('Error', err);
  }
  // book(dataObj)
  //   .then(json => {
  //     console.log('Back from reservation!>',json);
  //     // if (!json.user) {
  //     //   views_manager.show('error', 'Failed to login');
  //     //   return;
  //     // }
  //     // console.log(json.user);
  //     // header.update(json.user);
  //     // views_manager.show('listings');
      
  //   });
};