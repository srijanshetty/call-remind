call-remind
-----------

Le me bad at keeping touch, le me automate reminder.

What?
-------------

- Sends a pushbullet notification to the listed device (I use my phone for the same) and to my laptop.

How?
-------

1. Install the package.

```shell
git clone https://github.com/srijanshetty/call-remind.git
cd call-remind
npm install
npm link
```

2. Create a ~/call-remind.json file as follows:

```json
{
    "API_KEY": "<add-Pushbullet-API-KEY>",
    "device": "<add-device-id>",
    "list": [
        {"name": "Eric", "message": "1203948234"},
        {"name": "Mom", "message": "13409412340"},
        {"name": "Dad", "message": "08736291237"}
    ],
    "notifications": {
        "laptop": true
    }
}
```

Later
-----

- Windows support. Maybe?

