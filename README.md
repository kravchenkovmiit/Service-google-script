# Service-google-script
**Script to handle [Service App](https://github.com/kravchenkovmiit/Service-app) requests.**

The script handles URL query string of a GET requests with a banch of parametres (`name/value pairs`):

- app version
- function name
- [papameters and values as an option]

Functions allow reading or writing data from specified Google-sheets.

As a result of trigered function, the script sends one of the following reply:

- `Success` or `Error` - in case of write operation
- string of values separated by `#` - in case of read operation
