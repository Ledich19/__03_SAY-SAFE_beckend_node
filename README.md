https://warm-brushlands-50186.herokuapp.com/


/api/user 
    GET ()() // get all users 
    GET (/:id)() // get user by id 
        {
          username: String ,
          email: String ,
          avatar: String ,
          lastSeen: Data ,
          name: String ,
          lastName: String ,
          age: String ,
          Country: String ,
          city: String ,
          education: String ,
          gender: String ,
          aboutMe: String ,
          myFavoriteThem: String ,
          Photos: String ,
        }
    GET (/me)(token) // get me
    POST (/registration)() // create new user 
    DeLETE (/:id)(token) // delete user by id 
    
/api/dialogs
    GET ()(token) // get all dialogs fo user


console.log('\x1b[42m', ,'\x1b[0m')

Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"