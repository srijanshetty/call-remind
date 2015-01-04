#!/usr/bin/env node
/*
 * Copyright (c) 2014 Srijan R Shetty <srijan.shetty+code@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Required modules
var fs = require('fs');
var path = require('path');
var CronJob = require('cron').CronJob;

// Read the configuration file
var configFile = path.join(process.env.HOME, '.call-remind.json');
var config = JSON.parse(fs.readFileSync(configFile));

// Use a random contact from the list
var contactsList = config.list;
var randomNumber = Math.floor(Math.random() * 1000) % contactsList.length;
var contact = contactsList[randomNumber];

function pushBulletNotification() {
    var PushBullet = require('pushbullet');

    // Create a pushbullet instance
    var pusher = new PushBullet(config.API_KEY);

    // Push the notification to the device
    pusher.note(config.device, 'Call ' + contact.name, contact.message);

}

function laptopNotification() {
    var notifier = require('node-notifier');

    // Push notifications to laptop only if specified
    if (config.notifications && config.notifications.laptop) {
        notifier.notify({
            title: 'Call ' + contact.name,
            message: contact.message,
            icon: path.join(__dirname, 'call.png')
        });
    }
}

if (config.cron) {
    // Setup a cron job for sending the notification
    new CronJob('0 0 * * * *', function(){
        pushBulletNotification();
        laptopNotification();
    }, null, true);
} else {
    // Run the notifications once
    pushBulletNotification();
    laptopNotification();
}

