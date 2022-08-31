function getNow() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var h = String(today.getHours()).padStart(2, "0");
  var m = String(today.getMinutes()).padStart(2, "0"); //January is 0!
  var s = String(today.getSeconds()).padStart(2, "0");

  var now = yyyy + "-" + mm + "-" + dd + " " + h + ":" + m + ":" + s;

  return now;
}
export default getNow;
