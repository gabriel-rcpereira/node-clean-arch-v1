module.exports = class BusinessError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BUSINESS_ERROR';
  }
}