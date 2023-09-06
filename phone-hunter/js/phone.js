const loadData = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  displayPhones(data.data);
  // console.log(data.data);
};
const displayPhones = (phones) => {
  console.table(phones);
  let phoneContainer = document.getElementById("phone-container");
  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";
  // if mobile is above 10 then use show all button
  let button = document.getElementById("show-all-container");
  if (phones.length > 12) {
    button.classList.remove("hidden");
  } else {
    button.classList.add("hidden");
  }
  // display only 10 mobiles
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    let phoneCard = document.createElement("div");
    phoneCard.classList = `card w-auto bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure class="px-10 pt-10">
    <img
      src="${phone.image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  loadingSpinner(false);
};

// search button
const handleSearch = () => {
  // show load spinner
  loadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  let errorContainer = document.getElementById("error-container");
  let p = document.createElement("p");
  p.innerText = "Enter a valid name";
  errorContainer.appendChild(p);
  if (searchText === "") {
    errorContainer.classList.remove("hidden");
  } else {
    errorContainer.classList.add("hidden");
  }
  //

  loadData(searchText);
};

// loading spinner
const loadingSpinner = (isLoading) => {
  const loadBtn = document.getElementById("loading-spinner");

  if (isLoading) {
    loadBtn.classList.remove("hidden");
  } else {
    loadBtn.classList.add("hidden");
  }
};

// show details
const showDetails = async (id) => {
  console.log("clicked", id);
  // load single phone data
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data);
  showPhoneDetails(data.data);
};

// show phone details
const showPhoneDetails = (phone) => {
  console.log(phone);

  // const phoneName = document.getElementById("show-detail-phone-name");
  // phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById("show-detail-container");
  showDetailsContainer.innerHTML = `
  <figure class="px-10 pt-10 flex justify-center">
  <img src="${phone.image}">
  </figure>

  <h3 id="show-detail-phone-name" class="font-bold text-2xl mt-4 text-center">${
    phone.name
  }</h3>

  <p class="text-lg text-gray-500 font-bold mt-4"><span class="text-black">Storage : </span>${
    phone?.mainFeatures?.storage
  }</p>
  
  <p class="text-lg text-gray-500 font-bold mt-4"><span class="text-black">ChipSet : </span>${
    phone?.mainFeatures?.chipSet
  }</p>

  <p class="text-lg text-gray-500 font-bold mt-4"><span class="text-black">Memory : </span>${
    phone?.mainFeatures?.memory
  }</p>

  <p class="text-lg text-gray-500 font-bold mt-4"><span class="text-black">DisplaySize : </span>${
    phone?.mainFeatures?.displaySize
  }</p>

  <p class="text-lg text-gray-500 font-bold mt-4"><span class="text-black">GPS : </span>${
    phone?.others?.GPS || "no gps available"
  }</p>
  `;
  // show modal
  show_details_modal.showModal();
};
