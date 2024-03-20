import { format } from "date-fns";
import moment from "moment";

export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1199px)`).matches;
  }
  return false;
}

function currentYPosition() {
  if (!window) {
    return;
  }
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);
  if (!elmID || !elm) {
    return;
  }
  var startY = currentYPosition();
  var stopY = elmYPosition(elm);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function(leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function(leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  let difference =
    moment(new Date(), "DD/MM/YYYY HH:mm:ss").diff(
      moment(date, "DD/MM/YYYY HH:mm:ss")
    ) / 1000;

  if (difference < 60) return `${Math.floor(difference)} seconds`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} minutes`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} hours`;
  else if (difference < 86400 * 30)
    return `${Math.floor(difference / 86400)} days`;
  else if (difference < 86400 * 30 * 12)
    return `${Math.floor(difference / 86400 / 30)} months`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} years`;
}

export function generateRandomId() {
  let tempId = Math.random().toString();
  let uid = tempId.substr(2, tempId.length - 1);
  return uid;
}

export function getQueryParam(prop) {
  var params = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf("?") + 1)
  );
  var definitions = search.split("&");
  definitions.forEach(function(val, key) {
    var parts = val.split("=", 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
  return Object.entries(classes)
    .filter(entry => entry[1])
    .map(entry => entry[0])
    .join(" ");
}
export const searchDataByKeyword = (data, keyword) => {

  return data.filter(item => {
  
    const stringValues = Object.values(item).map(value => {
      return value ? value.toString().toLowerCase() : '';
    });
   
    return stringValues.some(value => value.includes(keyword.toLowerCase()));
  });
};
export function getYearsMonthsDays(input) {
  let ms = input; // Giả sử đây là số milliseconds

  // Nếu input là một chuỗi, chuyển đổi thành số milliseconds
  if (typeof input === 'string') {
    ms = parseInt(input, 10);
  }

  // Nếu input không phải là một số milliseconds hợp lệ, trả về null
  if (isNaN(ms) || ms <= 0) {
    return null;
  }

  const currentDate = moment();
  const inputDate = moment(ms);

  const years = currentDate.diff(inputDate, 'years');
  const months = currentDate.diff(inputDate.add(years, 'years'), 'months');
  const days = currentDate.diff(inputDate.add(months, 'months'), 'days');

  return { years, months: months + 1, days };
}
export function getDayMonthYear(ms) { 
  const date = new Date(ms);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return { day, month, year };
 
}

export function formatDate(date) {
 
    return moment(date).format('DD/MM/YYYY');
  
}

export function convertTimeToDate(millisecondsString) {
  
  const milliseconds = parseInt(millisecondsString);
  
  if (isNaN(milliseconds)) {
    return null; 
  }
  
  
  const date = new Date(milliseconds);
  
  return format(date, 'yyyy-MM-dd');
}

export function convertDateStringtoTime(dateString) {
 
  const dateObject = new Date(dateString);
  
 
  const milliseconds = dateObject.getTime();
  
 
  return milliseconds;
}
export const statusCode={
  SUCCESS:200
}

export function formatCurrency(numberOrString) {

  const number = typeof numberOrString === 'string' ? parseFloat(numberOrString) : numberOrString;
  
  if (!isNaN(number)) {
    
    return number.toLocaleString();
  } else {
   
    return numberOrString;
  }
}