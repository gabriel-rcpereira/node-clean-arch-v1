module.exports = class ResourceNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RESOURCE_NOT_FOUND_ERROR';
  }
}