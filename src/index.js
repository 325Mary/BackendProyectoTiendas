const appBackend = require("./config/server"); 

require("./config/database"); 
appBackend.listen(appBackend.get("port"), ()=> {
    console.log('Server in running on port:', appBackend.get('port'))
});