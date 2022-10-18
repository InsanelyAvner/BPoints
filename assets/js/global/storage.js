function checkVersion(db) {
  if (db.getItem("points") === null ||
      db.getItem("cc-number") === null ||
      db.getItem("next-daily-reward") === null ||
      db.getItem("quiz-completed") === null ||
      db.getItem("gsg-completed") === null ||
      db.getItem("membership") === null ||
      db.getItem("membership-expiry") === null ||
      db.getItem("username") === null) {
    return true;
  } else {
    return false;
  }
}

function applyStorage(db) {
  if (db.getItem("points") === null) { db.setItem("points", 0) }
  if (db.getItem("cc-number") === null) { db.setItem("cc-number", `${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`); }
  if (db.getItem("next-daily-reward") === null) { db.setItem("next-daily-reward", new Date()) }
  if (db.getItem("quiz-completed") === null) { db.setItem("quiz-completed", false) }
  if (db.getItem("gsg-completed") === null) { db.setItem("gsg-completed", false) }
  if (db.getItem("membership") === null) { db.setItem("membership", "free") }
  if (db.getItem("membership-expiry") === null) { db.setItem("membership-expiry", "Friday Jan 21 2101 00:00:00 GMT+0800 (Singapore Standard Time)") }
  if (db.getItem("username") === null) { db.setItem("username", "Unknown") }
}

if (checkVersion(localStorage)) {
  applyStorage(localStorage)
} else {
  console.log("%cVersion is up-to-date!", "color:lightgreen");
}

const today = new Date().toString()
const membershipExpiry = localStorage.getItem("membership-expiry")

if (Date.parse(today) >= Date.parse(membershipExpiry)) {
  localStorage.setItem("membership", "free")
  localStorage.setItem("membership-expiry", "Friday Jan 21 2101 00:00:00 GMT+0800 (Singapore Standard Time)")
}