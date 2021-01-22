export default (successFunc, errorFunc) => {
  if (navigator.geolocation) {
    const loc = navigator.geolocation.getCurrentPosition(
      successFunc,
      errorFunc
    );
    return loc;
  } else {
    alert("Your browser does not support geolocation");
  }
};
