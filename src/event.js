export class Event {

  isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }

  trigger(name, ...args) {
    const events = this._events != null ? this._events[name] : undefined;
    if (events != null) {
      this._triggerEvents(events, ...Array.from(args));
    }
    const allEvents = this._events != null ? this._events.all : undefined;
    if (allEvents != null) {
      this._triggerEvents(allEvents, name, ...Array.from(args));
    }
    return this;
  }

  on(names, callback) {
    if (this._events == null) {
      this._events = {};
    }
    if (!this.isFunction(callback)) {
      throw new Error('Must have a valid function callback');
    }
    if (/\s/g.test(name)) {
      throw new Error('Illegal event name');
    }
    const nameArray = names.split(' ');
    for (var name of Array.from(nameArray)) {
      const events = this._events[name] || (this._events[name] = []);
      events.push({
        callback,
        self: this
      });
    }
    return this;
  }

  off(name, callback) {
    if (this._events == null) {
      this._events = {};
    }
    if ((callback == null)) {
      this._events = {};
      return this;
    }
    for (name of Array.from(name.split(' '))) {
      const events = this._events[name] != null ? this._events[name] : [];
      const names = name ? [name] : (Array.from(this._events));
      for (name of Array.from(names)) {
        const newEvents = [];
        this._events[name] = newEvents;
        for (let event of Array.from(events)) {
          if (callback !== event.callback) {
            newEvents.push(event);
          }
        }
        if (newEvents.length === 0) {
          delete this._events[name];
        }
      }
    }
    return this;
  }

  _triggerEvents(events, ...args) {
    return Array.from(events).map((event) => event.callback(...Array.from(args || [])));
  }
};
