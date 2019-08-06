import L from 'leaflet';
import axios from 'axios';

const mapNode = document.getElementById('map');
let restaurants = [];
let currentMarkers;
let currentTag;
let map;
if (mapNode) {
  initMap()
}

function initMap() {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  map = L.map('map');

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  if (mapNode.dataset.src) {
    axios
      .get(mapNode.dataset.src)
      .then(result => {
        restaurants = result.data.restaurants;
        setBounds();
      });
  } else {
    restaurants.push(mapNode.dataset);
    setBounds();
  }
}

function setCurrentTag() {
  const { hash } = document.location;
  if (!hash || !hash.match(/\#tag\-/)) {
    currentTag = false;
    return;
  }

  let tmp = hash.split('-');
  tmp.shift();
  currentTag = tmp.join('-')
}

function inCurrentTag(tags) {
  if (!currentTag) {
    return true;
  }
  for (let tag of tags) {
    if (tag.name === currentTag) {
      return true;
    }
  }
  return false;
}

function setBounds() {
  setCurrentTag();
  const bounds = [];
  const markers = [];

  if (currentMarkers) {
    currentMarkers.clearLayers();
  }

  for (let i = 0; i < restaurants.length; i++) {
    const marker = restaurants[i];
    const { latitude, longtitude, tags } = marker;
    if (latitude && longtitude && inCurrentTag(tags)) {

      let m = L.marker([latitude, longtitude])
        .bindPopup(`${marker.name}<br><a href="${marker.permalink}">Bekijk resturant</a>`);

      markers.push(m);
      bounds.push(L.latLng(latitude, longtitude));
    }
  }

  currentMarkers = L.layerGroup(markers).addTo(map);
  if (!bounds.length) {
    bounds.push(L.latLng(52.05928, 4.49498));
  }
  const latLngBounds = L.latLngBounds(bounds).pad(.1);
  map.fitBounds(latLngBounds);
}

window.addEventListener("hashchange", function () {
  setBounds();
});
