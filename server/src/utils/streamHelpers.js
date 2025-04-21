module.exports = {
  handleStreamError: (stream, error) => {
    stream.emit('error', error);
    stream.end();
  }
};