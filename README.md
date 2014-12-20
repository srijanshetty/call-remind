call-remind
-----------

I'm bad at keeping in touch; so I automated it.

Install
-------

1. Create a ~/call-remind.json file as follows:

```json
{
    "API_KEY": "<add-API-KEY>",
    "device": "<add-device-id>",
    "list": [
        {"name": "Eric", "message": "1203948234"},
        {"name": "Mom", "message": "13409412340"},
        {"name": "Dad", "message": "08736291237"}
    ]
}
```

2. Add call-remind to cron

