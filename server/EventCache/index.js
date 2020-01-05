const EventCache = {};

EventCache.recipients = {};

EventCache.MAX_QUEUE_LENGTH = 50;
EventCache.MAX_LIFE_TIME = 5*60*1000;

EventCache.push = (recipientId, type, data) => {

    if (this.recipients[ recipientId ] === undefined)
        this.recipients[ recipientId ] = {};

    if (this.recipients[ recipientId ].queue === undefined)
        this.recipients[ recipientId ].queue = [];

    if (this.recipients[ recipientId ].queue.length > (this.MAX_QUEUE_LENGTH - 1))
        this.recipients[ recipientId ].queue.shift(); 
        
    let eventId = +new Date() + '_' + Math.random(),
        event = { eventId, type, data };

    this.recipients[ recipientId ].queue.push(event);

    if (typeof this.recipients[ recipientId ].timer === 'number')
        clearTimeout(this.recipients[ recipientId ].timer);

    let timeoutMs = this.MAX_LIFE_TIME;
    const timeoutExec = (() => {
        delete this.recipients[ recipientId ].queue;
    }).bind(this);

    this.recipients[ recipientId ].timer = setTimeout(timeoutExec, timeoutMs);

}

EventCache.addEventListener = (recipientId, callback) => {

    let listenerId = +new Date() + '_' + Math.random();

    if (this.recipients[ recipientId ] === undefined)
        this.recipients[ recipientId ] = {};

    if (this.recipients[ recipientId ].listeners === undefined)
        this.recipients[ recipientId ].listeners = {};

    this.recipients[ recipientId ].listeners[ listenerId ] = callback;

    return listenerId;

}