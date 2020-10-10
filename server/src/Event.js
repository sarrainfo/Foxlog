class Event {
  constructor(event) {
    this.event = event;
  }

  emitEvent(socket, reader) {
    this.formateDataToSend(reader.getInputData());
    socket.emit(this.event, this.data);
  }
}
