class EventCache {

    /**
     * @param {number} lifeTime 
     * @param {number} maxLength 
     */
    constructor(lifeTime=5*60*1000, maxLength=50) {

        this.lifeTime = lifeTime;
        this.maxLength = maxLength;

        this.recipients = {};

    }


    /**
     * @param {number} recipientId 
     */
    check(recipientId) {

        if (this.recipients[ recipientId ] === undefined) {
            this.recipients[ recipientId ] = {};
        }

        if (this.recipients[ recipientId ].listeners === undefined) {
            this.recipients[ recipientId ].listeners = {};
        }

        if (this.recipients[ recipientId ].queue === undefined) {
            this.recipients[ recipientId ].queue = [];
        }

        if (this.recipients[ recipientId ].queue.length > (this.maxLength - 1)) {
            this.recipients[ recipientId ].queue.shift();
        }

    }


    /**
     * @param {number} recipientId 
     * @param {string} type 
     * @param {object} event
     */
    push(recipientId, type, data) {

        this.check(recipientId);

        let eventId = Date.now() + '_' + Math.random(),
            event   = {id: eventId, type, data};

        this.recipients[ recipientId ].queue.push(event);

        if (typeof this.recipients[ recipientId ].timer !== undefined) {
            clearTimeout(this.recipients[ recipientId ].timer);
        }

        this.recipients[ recipientId ].timer = setTimeout(() => {
            delete this.recipients[ recipientId ].queue;
        }, this.lifeTime);

        for (let listenerId in this.recipients[ recipientId ].listeners) {

            let callback = this.recipients[ recipientId ].listeners[ listenerId ];
            callback([event]);

        }

        delete this.recipients[ recipientId ].listeners;

    }


    /**
     * @param {number} recipientId 
     * @param {function} callback 
     * @param {string} lastEventId
     * 
     * @returns {string}
     */
    addEventListener(recipientId, callback, lastEventId) {

        this.check(recipientId);

        if (lastEventId) {

            let idx = this.recipients[ recipientId ].queue.findIndex(event => event.id === lastEventId);

            if (idx !== -1 && idx < this.recipients[ recipientId ].queue.length - 1) {

                let events = this.recipients[ recipientId ].queue.slice(idx + 1);
                return callback(events);

            }

        }

        let listenerId = Date.now() + '_' + Math.random();

        this.recipients[ recipientId ].listeners[ listenerId ] = callback;
        return listenerId;

    }


    /**
     * @param {number} recipientId 
     * @param {string} listenerId 
     */
    removeEventListener(recipientId, listenerId) {

        this.check(recipientId);
        delete this.recipients[ recipientId ].listeners[ listenerId ];

    }

}

const EC = new EventCache();

module.exports = EC;