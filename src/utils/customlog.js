let log = console.log;
let DEBUG_MODE = false;

console.log = function () {
  // 1. Convert args to a normal array
  // OR you can use: Array.prototype.slice.call( arguments );
  let args = Array.from(arguments);

  // 2. Prepend log prefix log string
  if (DEBUG_MODE) {
    let LOG_PREFIX = `${new Date().toTimeString().slice(0, 8)}.${new Date()
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;

    args.unshift(LOG_PREFIX + ": ");
  }

  // 3. Pass along arguments to console.log
  log.apply(console, args);
};
