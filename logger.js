const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

// Định nghĩa format của log
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Tạo logger
const logger = createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(), // Log ra console
    new transports.File({ filename: "error.log", level: "error" }), // Log lỗi ra file
    new transports.File({ filename: "combined.log" }), // Log tất cả ra file
  ],
});

module.exports = logger;
